import { GetLopHocChiTiet } from '@/api/GiangVien/LopHoc';
import { CheckCircle, Edit, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';

function Sidebar() {
  const { pathname } = useLocation()
  const { lopId } = useParams()

  const [lopHoc, setLopHoc] = useState({})

  useEffect(function () {
    GetLopHocChiTiet(+(lopId ?? 0)).then(result => {
      console.log(result)
      setLopHoc(result.data)
    })
  }, [lopId])
  return (
    <div className="w-80 h-full bg-white shadow-xl flex flex-col border-r-1">
      {/* Header Section */}
      <div className=" px-4 py-3">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">{lopHoc.tenLop}</h2>
        </div>
        <p className="text-sm">Mã lớp: {lopHoc.maLop}</p>
      </div>

      {/* Description Section */}
      <div className="px-4 pb-5  border-b border-gray-200">
        <div className="flex  items-center gap-2 text-sm font-bold pb-1">
          <span>Mô tả cho lớp học:</span>
          <Edit className="w-4 h-4 cursor-pointer transition-colors" />
        </div>
        <p className='text-sm text-gray-500'>
          {lopHoc.moTa}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className=" flex flex-col flex-1 px-4 py-2 gap-2">
        {/* Main Menu Items */}
        <Link to={`/giang-vien/lop-hoc/${lopId}/danh-sach-lop`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("danh-sach-lop") ? "bg-purple-50 text-purple-800" : "hover:bg-purple-50 hover:text-purple-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-purple-200 p-2 rounded-lg">
            <Users className="size-6 text-purple-700" />
          </div>
          <span className="font-medium">Danh sách lớp</span>
        </Link>

        <Link to={`/giang-vien/lop-hoc/${lopId}/cho-duyet`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("cho-duyet") ? 'bg-green-50 text-green-800' : "hover:bg-green-50 hover:text-green-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-green-200 p-2 rounded-lg">
            <CheckCircle className="size-6 text-green-700" />
          </div>
          <span className="font-medium">Chờ duyệt</span>
        </Link>

        {/* <Link to={`/giang-vien/lop-hoc/${lopId}/thanh-tich`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("thanh-tich") ? 'bg-blue-50 text-blue-800' : "hover:bg-blue-50 hover:text-blue-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-blue-200 p-2 rounded-lg">
            <UserCheck className="size-6 text-blue-700" />
          </div>
          <span className="font-medium">Thành tích của lớp</span>
        </Link> */}
      </nav>
    </div>
  )
}

export default Sidebar