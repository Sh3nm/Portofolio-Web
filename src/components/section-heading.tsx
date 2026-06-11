interface SectionHeadingProps {
  index: string
  label: string
  title: string
  align?: "left" | "center"
}

export default function SectionHeading({ index, label, title, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "flex flex-col items-center text-center" : ""}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-teal-400">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl">{title}</h2>
    </div>
  )
}
