import React from 'react';
import { ChevronDown, Trophy, Medal, Award, Users } from 'lucide-react';
import { Select } from 'antd';

export default function ChiTietKiThiKetQua() {
  const topStudents = [
    { name: "Vũ Mai Quỳnh", class: "Lớp: Toán rời rạc N03", score: 9.8, rank: 1 },
    { name: "Lê Bình An", class: "Lớp: Toán rời rạc N01", score: 9.4, rank: 2 },
    { name: "Phạm Văn Mạnh", class: "Lớp: Toán rời rạc N01", score: 9.4, rank: 3 },
    { name: "Đỗ Thành Lê", class: "Lớp: Toán rời rạc N01", score: 9.2, rank: 4 },
    { name: "Hà Văn Đạt", class: "Lớp: Toán rời rạc N01", score: 9.0, rank: 5 }
  ];

  const classData = [
    { rank: 1, code: "LH003", name: "Toán rời rạc N03", students: 15, avgScore: 8.42, highScore: 9.8, lowScore: 6.2 },
    { rank: 2, code: "LH001", name: "Toán rời rạc N01", students: 25, avgScore: 8.00, highScore: 9.4, lowScore: 6.4 },
    { rank: 3, code: "LH002", name: "Toán rời rạc N02", students: 20, avgScore: 7.92, highScore: 9.0, lowScore: 5.8 },
    { rank: 4, code: "LH005", name: "Toán rời rạc N05", students: 25, avgScore: 7.57, highScore: 9.0, lowScore: 5.0 },
    { rank: 5, code: "LH004", name: "Toán rời rạc N04", students: 20, avgScore: 7.01, highScore: 8.8, lowScore: 5.4 }
  ];

  const scoreDistribution = [
    { range: "0-2", count: 0, color: "bg-gray-300" },
    { range: "2-4", count: 0, color: "bg-gray-300" },
    { range: "4-5", count: 0, color: "bg-gray-300" },
    { range: "5-6.5", count: 2, color: "bg-gray-400" },
    { range: "6.5-8", count: 7, color: "bg-blue-400" },
    { range: "8-10", count: 11, color: "bg-blue-600" }
  ];

  const maxCount = Math.max(...scoreDistribution.map(item => item.count));

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{rank}</div>;
    }
  };

  return (
    <div className="p-10 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <Select placeholder="Tất cả các lớp" className='w-100' />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <div className="text-sm opacity-90">Số học sinh dự thi</div>
            <div className="text-2xl font-bold">120</div>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg">
            <div className="text-sm opacity-90">Số học sinh vắng mặt</div>
            <div className="text-2xl font-bold">120</div>
          </div>
          <div className="bg-green-600 text-white p-4 rounded-lg">
            <div className="text-sm opacity-90">Điểm trung bình</div>
            <div className="text-2xl font-bold">7.7/10</div>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <div className="text-sm opacity-90">Điểm cao nhất</div>
            <div className="text-2xl font-bold">9.8</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Students */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Top 5 học sinh có điểm cao nhất</span>
            </div>
            <div className="p-4 space-y-3">
              {topStudents.map((student) => (
                <div key={student.rank} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  {getRankIcon(student.rank)}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.class}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{student.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Distribution Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg">
              <span className="font-semibold">Phổ Điểm Số</span>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Khoảng điểm: 5-6.5</div>
                <div className="text-sm text-blue-600">Số học sinh: 5</div>
              </div>
              <div className="flex items-end gap-2 h-64">
                {scoreDistribution.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full ${item.color} rounded-t`}
                      style={{ height: `${(item.count / maxCount) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      <div>{item.range}</div>
                      <div className="font-semibold">{item.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Class Rankings Table */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Thứ hạng các lớp</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xếp hạng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã lớp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên lớp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sĩ số</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm trung bình</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm cao nhất</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm thấp nhất</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classData.map((row) => (
                <tr key={row.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRankIcon(row.rank)}
                      <span className="ml-2 text-sm font-medium text-gray-900">{row.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.avgScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.highScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.lowScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}