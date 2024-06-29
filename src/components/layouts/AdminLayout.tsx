import { AdminSideNav } from "@/components/Sidenav";
import { AdminNavbar } from "@/components/navbar/Navbar";
import LoadingProgress from "../LoadingProgress";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoadingProgress />
      <AdminNavbar />
      <div className="w-full flex relative h-full">
        <AdminSideNav />
        <main className="max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full px-4">
          <div className="w-full my-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
