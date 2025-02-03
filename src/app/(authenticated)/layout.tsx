import Navbar from "@/components/Navbar";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen md:pl-64">
        {children}
      </main>
    </>
  );
} 