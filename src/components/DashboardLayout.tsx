import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 min-h-screen overflow-y-auto"><Outlet /></main>
  </div>
);

export default DashboardLayout; 