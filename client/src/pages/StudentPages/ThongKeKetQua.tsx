import thongKeKetQua from '@/assets/img.png';

const StudentDashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Top Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white rounded-lg p-6 text-center">
          <div className="text-lg font-medium mb-2">Tổng số kì thi</div>
          <div className="text-4xl font-bold">10</div>
        </div>

        <div className="bg-orange-400 text-white rounded-lg p-6 text-center">
          <div className="text-lg font-medium mb-2">Vắng mặt</div>
          <div className="text-4xl font-bold">0 (0%)</div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 text-center">
          <div className="text-lg font-medium mb-2">Điểm trung bình</div>
          <div className="text-4xl font-bold">7.7/10</div>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-6 text-center">
          <div className="text-lg font-medium mb-2">Xếp hạng lớp cao nhất</div>
          <div className="text-4xl font-bold">#2</div>
        </div>
      </div>

      {/* Subject Performance Section */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">📖</span>
          <h2 className="text-xl font-bold text-gray-800">THÀNH TÍCH THEO MÔN HỌC</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Statistics Section */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-blue-600 font-semibold text-xl mb-6 text-center">Xác suất thống kê</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Tổng số bài thi:</span>
                <span className="text-orange-500 font-bold text-2xl">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Điểm trung bình:</span>
                <span className="text-green-500 font-bold text-2xl">8.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Điểm cao nhất:</span>
                <span className="text-purple-500 font-bold text-2xl">9</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="text-gray-700 hover:text-blue-600 font-medium">Xem chi tiết</button>
            </div>
          </div>

          {/* Discrete Math Section */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-blue-600 font-semibold text-xl mb-6 text-center">Toán rời rạc</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Tổng số bài thi:</span>
                <span className="text-orange-500 font-bold text-2xl">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Điểm trung bình:</span>
                <span className="text-green-500 font-bold text-2xl">8.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Điểm cao nhất:</span>
                <span className="text-purple-500 font-bold text-2xl">9</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="text-gray-700 hover:text-blue-600 font-medium">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>

      {/* Class Ranking Section */}
      <div>
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">👥</span>
          <h2 className="text-xl font-bold text-gray-800">XẾP HẠNG TRONG LỚP</h2>
        </div>

        <div className="grid grid-cols-[4fr_1fr]">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
            {/* Table Header */}
            <div className="bg-orange-400 text-white grid grid-cols-12 py-4 px-4 font-semibold">
              <div className="col-span-3 text-center">LỚP</div>
              <div className="col-span-2 text-center">BÀI THI</div>
              <div className="col-span-2 text-center">ĐTB CÁ NHÂN</div>
              <div className="col-span-2 text-center">ĐTB LỚP</div>
              <div className="col-span-2 text-center">XẾP HẠNG</div>
              <div className="col-span-1 text-center"></div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                <div className="col-span-3 text-left font-medium">Toán rời rạc N01</div>
                <div className="col-span-2 text-center">5</div>
                <div className="col-span-2 text-center font-semibold">7.8</div>
                <div className="col-span-2 text-center">5.55</div>
                <div className="col-span-2 text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">#10</span>
                </div>
                <div className="col-span-1 text-center">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 flex items-center justify-center">
                      🏆
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                <div className="col-span-3 text-left font-medium">Tiếng Nhật 6</div>
                <div className="col-span-2 text-center">10</div>
                <div className="col-span-2 text-center font-semibold">9.1</div>
                <div className="col-span-2 text-center">6.02</div>
                <div className="col-span-2 text-center">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">#2</span>
                </div>
              </div>

              <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                <div className="col-span-3 text-left font-medium">Cơ sở dữ liệu N02</div>
                <div className="col-span-2 text-center">7</div>
                <div className="col-span-2 text-center font-semibold">7.8</div>
                <div className="col-span-2 text-center">8.21</div>
                <div className="col-span-2 text-center">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">#34</span>
                </div>
                <div className="col-span-1"></div>
              </div>

              <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                <div className="col-span-3 text-left font-medium">Xác suất thống kê</div>
                <div className="col-span-2 text-center">8</div>
                <div className="col-span-2 text-center font-semibold">9.1</div>
                <div className="col-span-2 text-center">8.1</div>
                <div className="col-span-2 text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">#8</span>
                </div>
                <div className="col-span-1"></div>
              </div>
            </div>

          </div>
          <img src={thongKeKetQua} alt="thong-ke-ket-qua" />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;