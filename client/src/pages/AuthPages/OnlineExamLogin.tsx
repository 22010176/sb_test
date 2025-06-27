import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';

import GoogleIcon from '@/components/GoogleIcon';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <>

      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        HỆ THỐNG THI TRẮC NGHIỆM TRỰC TUYẾN
      </h1>

      <div className="space-y-6">
        {/* Account Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-0.5">
            Chọn vai trò của bạn
          </label>
          <div className="relative">
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700">
              <option value="">Chọn vai trò</option>
              <option value="student">Học sinh</option>
              <option value="teacher">Giáo viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-0.5">
            Email*
          </label>
          <div className="relative">
            <input type="email" placeholder="e.g: username@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-11" />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-0.5">
            Mật khẩu*
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}

              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-11 pr-11"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Remember Password Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Nhớ mật khẩu</span>
          </label>
          <Link to="/quen-mat-khau" className="text-sm text-blue-600 hover:underline">
            Bạn quên mật khẩu?
          </Link>
        </div>

        {/* Login Button */}
        <button type="button"
          className="w-full bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-800 transition-colors duration-200"
          onClick={handleSubmit}>
          Đăng nhập
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <GoogleIcon className="w-5 h-5 mr-2" />
          <span className="text-gray-700">Tiếp tục với Google</span>
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Chưa có tài khoản? </span>
          <Link to="/dang-ki" className="text-sm text-blue-600 hover:underline font-medium">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </>
  );
}