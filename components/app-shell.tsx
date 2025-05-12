import Footer from "./footer";
import Navbar from "./navbar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="pt-10">{/* Space for the fixed navbar */}</div>
      {/* Main content area */}
      {children}
      <Footer />
    </main>
  );
};

export default AppShell;
