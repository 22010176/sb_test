import '@ant-design/v5-patch-for-react-19';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import TeacherLayout from '@/layouts/TeacherLayout';

import OnlineExamChangePassword from "@/pages/AuthPages/OnlineExamChangePassword";
import OnlineExamForgetPassword from "@/pages/AuthPages/OnlineExamForgetPassword";
import OnlineExamLogin from "@/pages/AuthPages/OnlineExamLogin";
import Element from "@/pages/AuthPages/OnlineExamRegister";

import ClassDetailsLayout from '@/layouts/ClassDetailsLayout';
import UserProfileForm from '@/pages/AuthPages/UserProfileForm';
import QuanLyLopHoc from '@/pages/TeacherPages/QuanLyLopHoc';
import QuanLyMonHoc from '@/pages/TeacherPages/QuanLyMonHoc';

import { GetNguoiDung } from '@/api/TaiKhoan';
import PageContext, { PageReducer } from '@/contexts/PageContext';
import type { UserData } from './App.types';

import CreateExamInterface from './pages/ExamPage/CreateExamInterface';
import ExamListInterface from './pages/ExamPage/ExamListInterface';

import QuanLyBoCauHoi from './pages/TeacherPages/QuanLyBoCauHoi';
import ChiTietBoCauHoi from './pages/TeacherPages/ChiTietBoCauHoi';


function App() {
  const [state, dispatch] = useReducer(PageReducer, { user: 'loading' })

  useEffect(function () {
    GetNguoiDung().then(res => {
      dispatch({ type: 'SET_USER', payload: res.data as UserData })
    }).catch(err => {
      console.log(err)
      dispatch({ type: 'SET_USER', payload: null })
    })
  }, [])

  return (
    <PageContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<OnlineExamLogin />} />
            <Route path="/dang-ky" element={<Element />} />
            <Route path="/quen-mat-khau" element={<OnlineExamForgetPassword />} />
            <Route path="/doi-mat-khau" element={<OnlineExamChangePassword />} />
          </Route>

          <Route element={<TeacherLayout />}>
            <Route path='/giang-vien' element={<Navigate to="/giang-vien/lop-hoc" />} />
            <Route path='/giang-vien/thong-tin-tai-khoan' element={<UserProfileForm />} />
            <Route path='/giang-vien/lop-hoc' element={<QuanLyLopHoc />} />
            <Route path='/giang-vien/lop-hoc' element={<ClassDetailsLayout />}>
              <Route path='/giang-vien/lop-hoc/:lopId' element={""} />
            </Route>

            <Route path='/giang-vien/mon-hoc' element={<QuanLyMonHoc />} />
            <Route path='/giang-vien/mon-hoc/:monHocId/:boCauHoiId' element={<ChiTietBoCauHoi />} />
            <Route path='/giang-vien/mon-hoc/:monHocId' element={<QuanLyBoCauHoi />} />

            <Route path='/giang-vien/ki-thi' element={<ExamListInterface />} />
            <Route path='/giang-vien/ki-thi/:kiThiId' element={<CreateExamInterface />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PageContext.Provider>
  )
}

export default App
