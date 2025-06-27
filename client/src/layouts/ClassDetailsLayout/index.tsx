
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

export default function ClassDetailsLayout() {
  return (
    <div className='w-screen  h-full grid-cols-[auto_1fr]'>
      <Sidebar />
      <Outlet />
    </div>
  );
}