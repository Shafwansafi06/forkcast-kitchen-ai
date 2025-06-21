import Sidebar from './Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 min-h-screen overflow-y-auto">{children}</main>
  </div>
);

export default DashboardLayout; 