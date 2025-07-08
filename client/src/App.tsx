import '@ant-design/v5-patch-for-react-19';
import { useEffect, useReducer } from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import TeacherLayout from '@/layouts/TeacherLayout';

import OnlineExamChangePassword from "@/pages/AuthPages/OnlineExamChangePassword";
import OnlineExamForgetPassword from "@/pages/AuthPages/OnlineExamForgetPassword";
import OnlineExamLogin from "@/pages/AuthPages/OnlineExamLogin";
import Element from "@/pages/AuthPages/OnlineExamRegister";

import ClassDetailsLayout from '@/layouts/ClassDetailsLayout';
import UserProfileForm from '@/pages/AuthPages/UserProfileForm';
import GiangVien_QuanLyLopHoc from '@/pages/TeacherPages/QuanLyLopHoc';
import GiangVien_QuanLyMonHoc from '@/pages/TeacherPages/QuanLyMonHoc';

import { GetNguoiDung } from '@/api/GiangVien/TaiKhoan';
import { PageContext, PageReducer } from '@/contexts/PageContext';
import type { UserData } from './App.types';

import CreateExamInterface from './pages/ExamPage/CreateExamInterface';
import ExamListInterface from './pages/ExamPage/ExamListInterface';

import StudentLayout from './layouts/StudentLayout';
import HocSinh_QuanLyLopHoc from './pages/StudentPages/QuanLyLopHoc';
import GiangVien_ChiTietBoCauHoi from './pages/TeacherPages/ChiTietBoCauHoi';
import GiangVien_QuanLyBoCauHoi from './pages/TeacherPages/QuanLyBoCauHoi';


function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(PageReducer, { user: 'loading' })

  useEffect(function () {
    console.log(import.meta.env)
    if (localStorage.getItem('token')) GetNguoiDung()
      .then(res => {
        const user = res.data as UserData
        dispatch({ type: 'SET_USER', payload: user })
        console.log(user)

        if (user.loaiNguoiDung === 0) { }
        else if (user.loaiNguoiDung === 1) navigate('/hoc-sinh')
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        dispatch({ type: 'SET_USER', payload: null })
      })
    else {
      dispatch({ type: 'SET_USER', payload: null })
    }
    document.title = import.meta.env.VITE_ROLE
  }, [])

  return (
    <PageContext.Provider value={[state, dispatch]}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<OnlineExamLogin />} />
          <Route path="/dang-ky" element={<Element />} />
          <Route path="/quen-mat-khau" element={<OnlineExamForgetPassword />} />
          <Route path="/doi-mat-khau" element={<OnlineExamChangePassword />} />
        </Route>

        {/* GiangVien Route */}
        {import.meta.env.VITE_ROLE === "TEACHER" && <Route path='/giang-vien' element={<TeacherLayout />}>
          <Route path='/giang-vien' element={<Navigate to="/giang-vien/lop-hoc" />} />
          <Route path='/giang-vien/thong-tin-tai-khoan' element={<UserProfileForm />} />
          <Route path='/giang-vien/lop-hoc' element={<GiangVien_QuanLyLopHoc />} />

          <Route path='/giang-vien/lop-hoc' element={<ClassDetailsLayout />}>
            <Route path='/giang-vien/lop-hoc/:lopId' element={""} />
          </Route>

          <Route path='/giang-vien/mon-hoc' element={<GiangVien_QuanLyMonHoc />} />
          <Route path='/giang-vien/mon-hoc/:monHocId/:boCauHoiId' element={<GiangVien_ChiTietBoCauHoi />} />
          <Route path='/giang-vien/mon-hoc/:monHocId' element={<GiangVien_QuanLyBoCauHoi />} />

          <Route path='/giang-vien/ki-thi' element={<ExamListInterface />} />
          <Route path='/giang-vien/ki-thi/:kiThiId' element={<CreateExamInterface />} />
        </Route>}

        {/* HocSinh Route */}
        {import.meta.env.VITE_ROLE === 'STUDENT' && <Route element={<StudentLayout />}>
          <Route path='/hoc-sinh' element={<Navigate to="/hoc-sinh/lop-hoc" />} />
          <Route path='/hoc-sinh/lop-hoc' element={<HocSinh_QuanLyLopHoc />} />
        </Route>}
      </Routes>
    </PageContext.Provider>
  )
}

export default App
