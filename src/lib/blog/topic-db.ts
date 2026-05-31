import type { GeneratedTopicPlan, SeoKeyword, TopicPoolItem } from "@/lib/blog/types";
import { getSupabaseAdmin, isBlogDbConfigured } from "@/lib/blog/db";
import { getDefaultSeoKeywords } from "@/lib/blog/seo-keywords";
import { getIsoWeekKey, TOPICS_PER_WEEK } from "@/lib/blog/week";

type DbKeywordRow = {
  id: string;
  keyword: string;
  priority: number;
  source: SeoKeyword["source"];
  active: boolean;
  created_at: string;
};

type DbTopicRow = {
  id: string;
  week_key: string;
  topic: string;
  target_keyword: string;
  slot_order: number;
  status: TopicPoolItem["status"];
  source: TopicPoolItem["source"];
  seo_rationale: string;
  used_at: string | null;
  post_id: string | null;
  created_at: string;
  updated_at: string;
};

function mapKeyword(row: DbKeywordRow): SeoKeyword {
  return {
    id: row.id,
    keyword: row.keyword,
    priority: row.priority,
    source: row.source,
    active: row.active,
    createdAt: row.created_at
  };
}

function mapTopic(row: DbTopicRow): TopicPoolItem {
  return {
    id: row.id,
    weekKey: row.week_key,
    topic: row.topic,
    targetKeyword: row.target_keyword,
    slotOrder: row.slot_order,
    status: row.status,
    source: row.source,
    seoRationale: row.seo_rationale,
    usedAt: row.used_at,
    postId: row.post_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function listSeoKeywords(activeOnly = true): Promise<SeoKeyword[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase.from("blog_seo_keywords").select("*").order("priority", { ascending: false });
  if (activeOnly) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) throw error;
  return (data as DbKeywordRow[]).map(mapKeyword);
}

export async function seedDefaultSeoKeywordsIfEmpty(): Promise<number> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return 0;

  const { count } = await supabase.from("blog_seo_keywords").select("*", { count: "exact", head: true });
  if ((count ?? 0) > 0) return 0;

  const defaults = getDefaultSeoKeywords();
  const rows = defaults.map((keyword, i) => ({
    keyword,
    priority: Math.max(1, 10 - Math.floor(i / 2)),
    source: "site" as const,
    active: true
  }));

  const { error } = await supabase.from("blog_seo_keywords").insert(rows);
  if (error) throw error;
  return rows.length;
}

export async function createSeoKeyword(input: {
  keyword: string;
  priority?: number;
  source?: SeoKeyword["source"];
}): Promise<SeoKeyword> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase
    .from("blog_seo_keywords")
    .insert({
      keyword: input.keyword.trim(),
      priority: input.priority ?? 5,
      source: input.source ?? "manual",
      active: true
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapKeyword(data as DbKeywordRow);
}

export async function updateSeoKeyword(
  id: string,
  patch: Partial<{ keyword: string; priority: number; active: boolean }>
): Promise<SeoKeyword> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase.from("blog_seo_keywords").update(patch).eq("id", id).select("*").single();
  if (error) throw error;
  return mapKeyword(data as DbKeywordRow);
}

export async function deleteSeoKeyword(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");
  const { error } = await supabase.from("blog_seo_keywords").delete().eq("id", id);
  if (error) throw error;
}

export async function listTopicPool(weekKey?: string): Promise<TopicPoolItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const week = weekKey ?? getIsoWeekKey();
  const { data, error } = await supabase
    .from("blog_topic_pool")
    .select("*")
    .eq("week_key", week)
    .order("slot_order", { ascending: true });

  if (error) throw error;
  return (data as DbTopicRow[]).map(mapTopic);
}

export async function listRecentTopicTexts(limit = 50): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_topic_pool")
    .select("topic")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((r) => String((r as { topic: string }).topic));
}

export async function replaceWeeklyTopicPool(
  weekKey: string,
  items: GeneratedTopicPlan[],
  source: TopicPoolItem["source"] = "ai"
): Promise<TopicPoolItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const existing = await listTopicPool(weekKey);
  const lockedSlots = new Set(existing.filter((t) => t.status !== "pending").map((t) => t.slotOrder));

  const { error: delError } = await supabase
    .from("blog_topic_pool")
    .delete()
    .eq("week_key", weekKey)
    .eq("status", "pending");

  if (delError) throw delError;

  const rows = items
    .filter((item) => !lockedSlots.has(item.slotOrder))
    .map((item) => ({
      week_key: weekKey,
      topic: item.topic,
      target_keyword: item.targetKeyword,
      slot_order: item.slotOrder,
      status: "pending" as const,
      source,
      seo_rationale: item.seoRationale,
      updated_at: new Date().toISOString()
    }));

  if (rows.length === 0) return existing;

  const { data, error } = await supabase.from("blog_topic_pool").upsert(rows, {
    onConflict: "week_key,slot_order"
  }).select("*");

  if (error) throw error;
  const merged = [...existing.filter((t) => t.status !== "pending"), ...(data as DbTopicRow[]).map(mapTopic)];
  return merged.sort((a, b) => a.slotOrder - b.slotOrder);
}

export async function createTopicPoolItem(input: {
  weekKey: string;
  topic: string;
  targetKeyword: string;
  slotOrder: number;
  seoRationale?: string;
}): Promise<TopicPoolItem> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase
    .from("blog_topic_pool")
    .insert({
      week_key: input.weekKey,
      topic: input.topic,
      target_keyword: input.targetKeyword,
      slot_order: input.slotOrder,
      status: "pending",
      source: "manual",
      seo_rationale: input.seoRationale ?? "",
      updated_at: new Date().toISOString()
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapTopic(data as DbTopicRow);
}

export async function updateTopicPoolItem(
  id: string,
  patch: Partial<{
    topic: string;
    targetKeyword: string;
    slotOrder: number;
    status: TopicPoolItem["status"];
    seoRationale: string;
  }>
): Promise<TopicPoolItem> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const dbPatch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.topic !== undefined) dbPatch.topic = patch.topic;
  if (patch.targetKeyword !== undefined) dbPatch.target_keyword = patch.targetKeyword;
  if (patch.slotOrder !== undefined) dbPatch.slot_order = patch.slotOrder;
  if (patch.status !== undefined) dbPatch.status = patch.status;
  if (patch.seoRationale !== undefined) dbPatch.seo_rationale = patch.seoRationale;

  const { data, error } = await supabase.from("blog_topic_pool").update(dbPatch).eq("id", id).select("*").single();
  if (error) throw error;
  return mapTopic(data as DbTopicRow);
}

export async function deleteTopicPoolItem(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");
  const { error } = await supabase.from("blog_topic_pool").delete().eq("id", id);
  if (error) throw error;
}

export async function pickTopicForSlot(slot: 0 | 1): Promise<TopicPoolItem | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const weekKey = getIsoWeekKey();
  const { getSlotOrder } = await import("@/lib/blog/week");
  const slotOrder = getSlotOrder(slot);

  const { data: exact, error: exactError } = await supabase
    .from("blog_topic_pool")
    .select("*")
    .eq("week_key", weekKey)
    .eq("slot_order", slotOrder)
    .eq("status", "pending")
    .maybeSingle();

  if (exactError) throw exactError;
  if (exact) return mapTopic(exact as DbTopicRow);

  // Slot kaçırıldıysa sıradaki bekleyen konuyu al
  const { data: next, error: nextError } = await supabase
    .from("blog_topic_pool")
    .select("*")
    .eq("week_key", weekKey)
    .eq("status", "pending")
    .gte("slot_order", slotOrder)
    .order("slot_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (nextError) throw nextError;
  return next ? mapTopic(next as DbTopicRow) : null;
}

export async function markTopicUsed(id: string, postId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { error } = await supabase
    .from("blog_topic_pool")
    .update({
      status: "used",
      post_id: postId,
      used_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) throw error;
}

export async function ensureWeeklyTopicPool(weekKey?: string): Promise<{ created: boolean; count: number }> {
  if (!isBlogDbConfigured()) return { created: false, count: 0 };

  const week = weekKey ?? getIsoWeekKey();
  const existing = await listTopicPool(week);
  const pending = existing.filter((t) => t.status === "pending");
  if (pending.length >= TOPICS_PER_WEEK) return { created: false, count: existing.length };

  const { buildWeeklyTopicPool } = await import("@/lib/blog/topic-service");
  const items = await buildWeeklyTopicPool(week);
  await replaceWeeklyTopicPool(week, items, "ai");
  return { created: true, count: items.length };
}
