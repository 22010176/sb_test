
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import TeacherHeader from '@/components/Header';

export default function ExamDetailsLayout() {
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col'>
      <TeacherHeader />

      <div className='flex flex-col grow overflow-auto'>
        <div className='w-screen h-full grid grid-cols-[auto_1fr]'>
          <Sidebar />

          <Outlet />
        </div>
      </div>
    </div>
  );
}