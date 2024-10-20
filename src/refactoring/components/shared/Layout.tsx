type LayoutProps = {
  children: React.ReactNode;
};

const LayoutContainer = ({ children }: LayoutProps) => {
  return <div className="container mx-auto p-4">{children}</div>;
};

const LayoutTitle = ({ children }: LayoutProps) => {
  return <h1 className="text-3xl font-bold mb-6">{children}</h1>;
};

const Layout = {
  Container: LayoutContainer,
  Title: LayoutTitle,
};

export default Layout;
