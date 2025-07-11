import { faChartColumn, faFileLines, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';

function Sidebar() {
  const { pathname } = useLocation()
  const { lopId } = useParams()

  const [lopHoc, setLopHoc] = useState({})

  useEffect(function () {
    // GetLopHocChiTiet(+(lopId ?? 0)).then(result => {
    //   console.log(result)
    //   setLopHoc(result.data)
    // })
  }, [lopId])

  return (
    <div className="w-80 h-full bg-white shadow-xl flex flex-col border-r-1">
      {/* Header Section */}
      <div className=" px-4 py-3">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">dddd</h2>
        </div>
        <p className="">Môn học: ddd</p>
      </div>

      {/* Navigation Menu */}
      <nav className=" flex flex-col flex-1 px-4 py-2 gap-2">
        {/* Main Menu Items */}
        <Link to={`/giang-vien/ki-thi/${lopId}`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("chi-tiet") ? "bg-purple-50 text-purple-800" : "hover:bg-purple-50 hover:text-purple-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-purple-200 p-2 rounded-lg">
            <FontAwesomeIcon className="size-6 text-purple-700" icon={faFileLines} />
          </div>
          <span className="font-medium">Thông tin kì thi</span>
        </Link>

        <Link to={`/giang-vien/ki-thi/${lopId}/danh-sach-thi-sinh`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("cho-duyet") ? 'bg-green-50 text-green-800' : "hover:bg-green-50 hover:text-green-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-green-200 p-2 rounded-lg">
            <FontAwesomeIcon className="size-6 text-green-700" icon={faUser} />
          </div>
          <span className="font-medium">Danh sách thí sinh</span>
        </Link>

        <Link to={`/giang-vien/ki-thi/${lopId}/cau-hinh-cau-hoi`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("cau-hinh-cau-hoi") ? 'bg-blue-50 text-blue-800' : "hover:bg-blue-50 hover:text-blue-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-blue-200 p-2 rounded-lg">
            <FontAwesomeIcon className="size-6 text-blue-700" icon={faGear} />
          </div>
          <span className="font-medium">Cấu hình câu hỏi</span>
        </Link>

        <Link to={`/giang-vien/ki-thi/${lopId}/thanh-tich`}
          className={[
            "flex items-center gap-3 p-2 rounded-xl group",
            pathname.includes("thanh-tich") ? 'bg-red-50 text-red-800' : "hover:bg-red-50 hover:text-red-700 text-gray-700"
          ].join(' ')}>
          <div className="bg-red-200 p-2 rounded-lg">
            <FontAwesomeIcon className="size-6 text-red-700" icon={faChartColumn} />
          </div>
          <span className="font-medium">Thống kê kết quả</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar