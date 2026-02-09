"use client";

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold transition disabled:cursor-not-allowed";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-400",
  outline:
    "border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-zinc-900",
  ghost: "text-zinc-400 hover:text-zinc-600",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2 text-sm",
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
