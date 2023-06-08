export default async function FeatureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en">
      <div className="pt-16">{children} </div>
    </div>
  )
}
