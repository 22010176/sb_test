import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import TeacherLayout from '@/layouts/TeacherLayout';

import OnlineExamForgetPassword from "@/pages/AuthPages/OnlineExamForgetPassword";
import OnlineExamLogin from "@/pages/AuthPages/OnlineExamLogin";
import OnlineExamRegister from "@/pages/AuthPages/OnlineExamRegister";
import OnlineExamChangePassword from "@/pages/AuthPages/OnlineExamChangePassword";

import QuanLyMonHoc from '@/pages/TeacherPages/QuanLyMonHoc';
import QuanLyLopHoc from '@/pages/TeacherPages/QuanLyLopHoc';
import UserProfileForm from '@/pages/AuthPages/UserProfileForm';
import ClassDetailsLayout from './layouts/ClassDetailsLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<OnlineExamLogin />} />
          <Route path="/dang-ki" element={<OnlineExamRegister />} />
          <Route path="/quen-mat-khau" element={<OnlineExamForgetPassword />} />
          <Route path="/doi-mat-khau" element={<OnlineExamChangePassword />} />
        </Route>

        <Route element={<TeacherLayout />}>
          <Route path='/giang-vien' element={<Navigate to="/giang-vien/lop-hoc" />} />
          <Route path='/giang-vien/thong-tin-tai-khoan' element={<UserProfileForm />} />
          <Route path='/giang-vien/lop-hoc' element={<QuanLyLopHoc />} />
          <Route path='/giang-vien/lop-hoc' element={<ClassDetailsLayout />}>
            <Route path='/giang-vien/lop-hoc/danh-sach-lop' element={""} />
          </Route>
          <Route path='/giang-vien/mon-hoc' element={<QuanLyMonHoc />} />
          <Route path='/giang-vien/ki-thi' element={<QuanLyMonHoc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
