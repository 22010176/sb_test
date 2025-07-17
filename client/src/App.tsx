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
import ExamDetailsLayout from './layouts/ExamDetailsLayout';
import StudentLayout from './layouts/StudentLayout';

import { GetNguoiDung } from '@/api/GiangVien/TaiKhoan';
import { PageContext, PageReducer } from '@/contexts/PageContext';
import type { UserData } from './App.types';


import HocSinh_QuanLiKiThi from './pages/StudentPages/QuanLyKiThi';
import HocSinh_QuanLyLopHoc from './pages/StudentPages/QuanLyLopHoc';
import GiangVien_ChiTietBoCauHoi from './pages/TeacherPages/ChiTietBoCauHoi';
import ChiTietChoDuyet from './pages/TeacherPages/ChiTietChoDuyet';
import ChiTietDanhSachLop from './pages/TeacherPages/ChiTietDanhSachLop';
import ChiTietKiThiCauHoi from './pages/TeacherPages/ChiTietKiThiCauHoi';
import ChiTietKiThiDanhSachThiSinh from './pages/TeacherPages/ChiTietKiThiDanhSachThiSinh';
import ChiTietKiThiForm from './pages/TeacherPages/ChiTietKiThiForm';
import ChiTietKiThiKetQua from './pages/TeacherPages/ChiTietKiThiKetQua';
import GiangVien_QuanLyBoCauHoi from './pages/TeacherPages/QuanLyBoCauHoi';
import QuanLyKiThi from './pages/TeacherPages/QuanLyKiThi';
import { ChiTietKiThi, ChiTietLop } from './pages/TeacherPages/ThongTinChiTiet';
import LamBaiThi from './pages/StudentPages/LamBaiThi';

const role = import.meta.env.VITE_ROLE;

function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(PageReducer, { user: 'loading' })

  useEffect(function () {
    if (localStorage.getItem('token')) GetNguoiDung()
      .then(res => {
        const user = res.data as UserData
        dispatch({ type: 'SET_USER', payload: user })

        // if (user.loaiNguoiDung === 0) { }
        // else if (user.loaiNguoiDung === 1) navigate('/hoc-sinh')
      }).catch(err => {
        localStorage.removeItem('token')
        dispatch({ type: 'SET_USER', payload: null })
      })
    else dispatch({ type: 'SET_USER', payload: null })

    document.title = role
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
        {role === "TEACHER" && <>
          <Route path='/giang-vien' element={<TeacherLayout />}>
            {/* <Route path='/thong-tin-tai-khoan' element={<UserProfileForm />} /> */}

            <Route path='/giang-vien' element={<Navigate to="/giang-vien/lop-hoc" />} />
            <Route path='/giang-vien/thong-tin-tai-khoan' element={<UserProfileForm />} />
            <Route path='/giang-vien/lop-hoc' element={<GiangVien_QuanLyLopHoc />} />

            <Route path='/giang-vien/mon-hoc' element={<GiangVien_QuanLyMonHoc />} />
            <Route path='/giang-vien/mon-hoc/:monHocId/:boCauHoiId' element={<GiangVien_ChiTietBoCauHoi />} />
            <Route path='/giang-vien/mon-hoc/:monHocId' element={<GiangVien_QuanLyBoCauHoi />} />

            <Route path='/giang-vien/ki-thi' element={<QuanLyKiThi />} />
          </Route>

          <Route path='/giang-vien/ki-thi' element={<ExamDetailsLayout />}>
            <Route path='/giang-vien/ki-thi/:idKiThi' element={<ChiTietKiThi />} />
            <Route path='/giang-vien/ki-thi/:idKiThi/chi-tiet' element={<ChiTietKiThiForm />} />
            <Route path='/giang-vien/ki-thi/:idKiThi/danh-sach-thi-sinh' element={<ChiTietKiThiDanhSachThiSinh />} />
            <Route path='/giang-vien/ki-thi/:idKiThi/cau-hinh-cau-hoi' element={<ChiTietKiThiCauHoi />} />
            <Route path='/giang-vien/ki-thi/:idKiThi/thanh-tich' element={<ChiTietKiThiKetQua />} />
          </Route>

          <Route path='/giang-vien/lop-hoc' element={<ClassDetailsLayout />}>
            <Route path='/giang-vien/lop-hoc/:lopId' element={<ChiTietLop />} />
            <Route path='/giang-vien/lop-hoc/:lopId/danh-sach-lop' element={<ChiTietDanhSachLop />} />
            <Route path='/giang-vien/lop-hoc/:lopId/cho-duyet' element={<ChiTietChoDuyet />} />
            <Route path='/giang-vien/lop-hoc/:lopId/thanh-tich' element={<ChiTietDanhSachLop />} />
          </Route>
        </>}

        {/* HocSinh Route */}
        {role === 'STUDENT' && <Route element={<StudentLayout />}>
          <Route path='/thong-tin-tai-khoan' element={<UserProfileForm />} />
          <Route path='/hoc-sinh' element={<Navigate to="/hoc-sinh/lop-hoc" />} />
          <Route path='/hoc-sinh/lop-hoc' element={<HocSinh_QuanLyLopHoc />} />
          {/* <Route path='/hoc-sinh/ki-thi' element={<HocSinh_QuanLiKiThi />} /> */}
          <Route path='/hoc-sinh/ki-thi' element={<HocSinh_QuanLiKiThi />} />
          <Route path='/hoc-sinh/lam-bai' element={<LamBaiThi />} />
          {/* <Route path='/hoc-sinh/ki-thi' element={<StudentLayout />}>
          </Route> */}
        </Route>}
      </Routes>
    </PageContext.Provider>
  )
}

export default App
