import type { ComponentProps } from "react";

type Props = ComponentProps<"div">;

export function Container({ className, ...props }: Props) {
  return <div className={["mx-auto w-full max-w-6xl px-4", className].filter(Boolean).join(" ")} {...props} />;
}

