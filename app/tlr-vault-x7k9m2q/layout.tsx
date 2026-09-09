export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-shell">
      <style>{`
        html, body, a, button { cursor: auto !important; }
        header, footer, .noise-overlay::after { display: none !important; }
        body { overflow: auto !important; }
      `}</style>
      <div className="fixed inset-0 z-[20000] overflow-auto bg-[#111] cursor-auto">
        {children}
      </div>
    </div>
  )
}
