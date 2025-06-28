import { Outlet } from "react-router";
import Header from './Header';

function TeacherLayout() {
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col'>
      <Header />

      <div className='grow overflow-auto'>
        <Outlet />
      </div>
    </div>
  );

}

export default TeacherLayout