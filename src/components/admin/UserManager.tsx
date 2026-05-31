"use client";

import { useEffect, useState } from "react";
import type { AdminRole, AdminUser } from "@/lib/blog/types";
import { ROLE_LABELS } from "@/lib/admin/permissions";

export function UserManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("author");
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (res.ok) setUsers(data.users ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password, role })
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Oluşturulamadı");
      return;
    }
    setEmail("");
    setName("");
    setPassword("");
    setMessage("Kullanıcı eklendi.");
    await load();
  }

  async function removeUser(id: string) {
    if (!confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Silinemedi");
      return;
    }
    await load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">Kullanıcı Yönetimi</h1>

      <form onSubmit={createUser} className="grid gap-3 rounded-sm border border-border bg-white p-5 shadow-card sm:grid-cols-2">
        <input
          type="email"
          required
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm border border-border px-3 py-2 text-sm"
        />
        <input
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm border border-border px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Şifre (min 8 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-sm border border-border px-3 py-2 text-sm"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as AdminRole)}
          className="rounded-sm border border-border px-3 py-2 text-sm"
        >
          <option value="author">Yazar</option>
          <option value="editor">Editör</option>
          <option value="super_admin">Süper Admin</option>
        </select>
        <button type="submit" className="sm:col-span-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#c90510]">
          Kullanıcı Ekle
        </button>
      </form>

      {message && <p className="text-sm text-gray-700">{message}</p>}

      <ul className="divide-y divide-border rounded-sm border border-border bg-white shadow-card">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">
                {user.email} · {ROLE_LABELS[user.role]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeUser(user.id)}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
