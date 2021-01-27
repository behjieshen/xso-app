import Nav from "../nav";
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-oneboxGray font-body text-gray-900 pb-20">
      <Nav />
      {children}
    </div>
  );
}
