import { Book, CheckCircle, Clock, Lock, MapPin, Search } from 'lucide-react';

function IllustrationContainer() {
  return (
    <div className="lg:w-1/2 bg-gradient-to-br from-purple-100 to-indigo-200 p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-indigo-800 mb-4">
          CHÀO MỪNG BẠN ĐẾN VỚI ONLINE EXAM!
        </h1>
      </div>

      {/* Illustration Container */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Background Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full opacity-80 transform rotate-6"></div>

        {/* Main Laptop */}
        <div className="relative z-10 bg-indigo-900 rounded-lg p-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="bg-white rounded p-4 relative">
            {/* Browser Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-gray-100 rounded px-2 py-1 text-xs flex items-center gap-1">
                <Search className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500">online-exam.edu.vn</span>
              </div>
            </div>

            {/* Exam Interface */}
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div key={item} className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`w-3 h-3 ${index < 3 ? 'text-green-500' : 'text-gray-300'}`} />
                  <div className={`flex-1 h-1 rounded ${index < 3 ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                  <div className="w-3 h-3 bg-purple-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 bg-purple-500 p-2 rounded-lg transform rotate-12 animate-bounce">
          <Book className="w-4 h-4 text-white" />
        </div>

        <div className="absolute -top-2 -right-6 bg-indigo-500 p-2 rounded-full animate-pulse">
          <Clock className="w-4 h-4 text-white" />
        </div>

        <div className="absolute -bottom-4 -left-6 bg-blue-500 p-2 rounded-lg transform -rotate-12">
          <MapPin className="w-4 h-4 text-white" />
        </div>

        <div className="absolute -bottom-2 -right-4 bg-purple-600 p-2 rounded-full animate-bounce delay-300">
          <Lock className="w-4 h-4 text-white" />
        </div>

        {/* Student Character */}
        <div className="absolute bottom-0 left-1/4 transform translate-y-4">
          <div className="w-12 h-16 bg-red-500 rounded-t-full relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-300 rounded-full"></div>
            <div className="absolute top-2 left-1 w-2 h-1 bg-red-600 rounded"></div>
            <div className="absolute top-2 right-1 w-2 h-1 bg-red-600 rounded"></div>
          </div>
        </div>

        {/* Books Stack */}
        <div className="absolute bottom-0 right-1/4 transform translate-y-2">
          <div className="space-y-1">
            <div className="w-8 h-2 bg-purple-500 rounded"></div>
            <div className="w-8 h-2 bg-blue-500 rounded"></div>
            <div className="w-8 h-2 bg-indigo-500 rounded"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-purple-300 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-indigo-300 rounded-full opacity-50"></div>
    </div>

  )
}
export default IllustrationContainer;