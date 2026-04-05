import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className='flex h-screen w-screen overflow-hidden bg-background'>
      <Sidebar />
      <main className='flex-1 ml-8 md:ml-0 min-w-0 overflow-y-auto p-6 bg-background'>
        <Outlet />
      </main>
    </div>
  );
}
