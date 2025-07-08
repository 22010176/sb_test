import TextArea from 'antd/es/input/TextArea';
import { CheckCircle, Edit, UserCheck, Users } from 'lucide-react';
import { Link } from 'react-router';

function Sidebar() {
  const description = "Lớp tiếng Nhật cơ bản cung cấp cho học viên những kiến thức nền tảng về ngôn ngữ và văn hóa Nhật Bản, bao gồm các kiến thức cơ bản về ngữ pháp, từ vựng và giao tiếp hàng ngày."
  return (
    <div className="w-80 h-full bg-white shadow-xl flex flex-col border-r-1">
      {/* Header Section */}
      <div className=" px-4 py-3">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">Lớp Tiếng Nhật cơ bản</h2>
        </div>
        <p className="text-sm">Mã lớp: NHTA1</p>
      </div>

      {/* Description Section */}
      <div className="px-4 pb-5  border-b border-gray-200">
        <div className="flex  items-center gap-2 text-sm font-bold pb-1">
          <span>Mô tả cho lớp học:</span>
          <Edit className="w-4 h-4 cursor-pointer transition-colors" />
        </div>
        <p className='text-sm text-gray-500'>
          {description}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        {/* Main Menu Items */}
        <Link to="#" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors group">
          <div className="bg-purple-100 group-hover:bg-purple-200 p-2 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <span className="font-medium">Danh sách lớp</span>
        </Link>

        <Link to="#" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors group">
          <div className="bg-green-100 group-hover:bg-green-200 p-2 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-medium">Chờ duyệt</span>
        </Link>

        <Link to="#" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group">
          <div className="bg-blue-100 group-hover:bg-blue-200 p-2 rounded-lg">
            <UserCheck className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-medium">Thành tích của lớp</span>
        </Link>
      </nav>
    </div>

  )
}

export default Sidebar