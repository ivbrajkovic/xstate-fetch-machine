type LayoutProps = { children: React.ReactNode };
const Layout = ({ children }: LayoutProps) => (
  <div className="pt-20">
    <div className="max-w-4xl mx-auto">{children}</div>
  </div>
);

export default Layout;
