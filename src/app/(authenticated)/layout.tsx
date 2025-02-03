import Navbar from "@/components/Navbar";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0">
        <Navbar />
      </div>
      <div className="flex-1 md:ml-64">
        {children}
      </div>
    </div>
  );
} 