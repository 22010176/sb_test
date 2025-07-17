import { faBell, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, type MenuProps } from "antd";
import { Link, useLocation } from "react-router";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to="/thong-tin-tai-khoan" className='font-medium ' style={{ color: "#6B406B" }}>
        Thông tin tài khoản
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/doi-mat-khau" className='font-medium ' style={{ color: "#6B406B" }}>
        Đổi mật khẩu
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to="#" className='font-medium ' style={{ color: "#6B406B" }}>
        Đăng xuất
      </Link>
    ),
  },
];

function Header() {
  const { pathname } = useLocation()
  const path = pathname.split('/giang-vien')[1]
  return (
    <header className="bg-[#6B406B] text-white px-10 py-3 flex justify-between items-center">
      <Link to="/giang-vien" className="flex items-baseline">
        <span className="text-2xl font-bold">A+</span>
        <h1 className="ml-2 text-xl">Online Exam</h1>
      </Link>
      <div className="flex gap-20">
        <Link to="/giang-vien/lop-hoc" className={["font-medium px-5 py-1", path.includes('/lop-hoc') && 'border-white border-2 rounded-xl'].join(' ')}>LỚP HỌC</Link>
        <Link to="/giang-vien/mon-hoc" className={["font-medium px-5 py-1", path.includes('/mon-hoc') && 'border-white border-2 rounded-xl'].join(' ')}>MÔN HỌC</Link>
        <Link to="/giang-vien/ki-thi" className={["font-medium px-5 py-1", path.includes('/ki-thi') && 'border-white border-2 rounded-xl'].join(' ')}>KỲ THI</Link>
      </div>
      <div className="flex gap-10 items-center">
        <Dropdown menu={{ items }}>
          <FontAwesomeIcon icon={faCircleUser} size='2xl' />
        </Dropdown>

        <Link to="#">
          <FontAwesomeIcon icon={faBell} size='2xl' />
        </Link>
      </div>
    </header>
  )
}
export default Header