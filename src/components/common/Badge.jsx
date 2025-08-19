import clsx from "clsx";

const variants = {
  neutral: "bg-gray-100 text-gray-700",
  success: "bg-green-200 text-green-700",
  warning: "bg-amber-200 text-amber-800",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  primary: "bg-[#A40000]/10 text-[#A40000]",
  outline: "bg-transparent text-gray-700",
};

const sizes = {
  sm: "text-[12px] px-2 py-0.5 rounded-xl",
  md: "text-sm px-2.5 py-1 rounded-xl",
  lg: "text-base px-3 py-1.5 rounded",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  icon = null,
  className = "",
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-medium select-none whitespace-nowrap",
        variants[variant] || variants.neutral,
        sizes[size] || sizes.md,
        className
      )}
    >
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
      {dot ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current inline-block" />
      ) : null}
      <span>{children}</span>
    </span>
  );
}
