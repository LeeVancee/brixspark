interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="bg-neutral-900 text-white py-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span
                  className={crumb.isActive ? "text-gray-300" : "text-gray-300"}
                >
                  {crumb.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-gray-500">/</span>
              )}
            </div>
          ))}
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white">{title}</h1>
      </div>
    </section>
  );
}
