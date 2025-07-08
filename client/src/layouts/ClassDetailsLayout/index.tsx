
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ClassDetailsLayout() {
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col'>
      <Header />

      <div className='flex flex-col grow overflow-auto'>
        <div className='w-screen h-full grid grid-cols-[auto_1fr]'>
          <Sidebar />

          <Outlet />
        </div>
      </div>
    </div>

  );
}