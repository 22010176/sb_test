import { ChevronLeft, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import GoogleIcon from '@/components/GoogleIcon';

function OnlineExamChangePassword() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Register form states
  const [registerData, setRegisterData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ĐỔI MẬT KHẨU</h2>
      </div>

      <div className="space-y-3">
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-0.5">
            Nhập mật khẩu mới*
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-11 pr-11"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-0.5">
            Xác nhận mật khẩu mới*
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-11 pr-11"
              type={showConfirmPassword ? "text" : "password"}
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Register Button */}
        <button
          type="button"
          onClick={() => alert('Đăng ký thành công!')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform ${isHovered
            ? 'bg-gradient-to-r from-purple-600 to-indigo-700 scale-105 shadow-lg'
            : 'bg-gradient-to-r from-purple-500 to-indigo-600'
            }`}>
          Xác nhận
        </button>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200">
            <ChevronLeft className="w-4 h-4" />
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OnlineExamChangePassword