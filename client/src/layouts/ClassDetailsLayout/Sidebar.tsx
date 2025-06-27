import { CheckCircle, Edit, UserCheck, Users } from 'lucide-react';
import { Link } from 'react-router';

function Sidebar() {
  return (
    <div className="w-80 h-full bg-white shadow-xl flex flex-col">
      {/* Header Section */}
      <div className=" p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold">Lớp Tiếng Nhật cơ bản</h2>

        </div>
        <p className="text-sm  mb-2">Mã lớp: NHTA1</p>
      </div>

      {/* Description Section */}
      <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span>Mô tả cho lớp học:</span>
          <Edit className="w-4 h-4 cursor-pointer transition-colors" />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Lớp tiếng Nhật cơ bản cung cấp cho học viên những kiến thức nền tảng về ngôn ngữ và văn hóa Nhật Bản, bao gồm các kiến thức cơ bản về ngữ pháp, từ vựng và giao tiếp hàng ngày.
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <div className="px-4 mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quản lý lớp học
          </h3>

          {/* Main Menu Items */}
          <div className="space-y-1">
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
          </div>
        </div>

      </nav>
    </div>

  )
}

export default Sidebar