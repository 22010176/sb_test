import { Outlet } from "react-router";
import Header from './Header';

function StudentLayout() {
  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col'>
      <Header />

      <div className='flex flex-col grow overflow-auto'>
        <Outlet />
      </div>
    </div>
  );

}

export default StudentLayout