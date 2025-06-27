import React, { useState } from 'react';
import { ChevronLeft, Mail, Clock, Search, MapPin, Lock, CheckCircle, Book, User } from 'lucide-react';
import { Link } from 'react-router';

export default function OnlineExamForgetPassword() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">QUÊN MẬT KHẨU</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhập gmail bạn đã đăng ký
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g: username@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-11"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('Email đã được gửi!')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform ${isHovered
            ? 'bg-gradient-to-r from-purple-600 to-indigo-700 scale-105 shadow-lg'
            : 'bg-gradient-to-r from-purple-500 to-indigo-600'
            }`}>
          Gửi email
        </button>

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