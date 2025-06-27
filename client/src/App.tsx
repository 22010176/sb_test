import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Route, Routes } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import OnlineExamForgetPassword from "@/pages/AuthPages/OnlineExamForgetPassword";
import OnlineExamLogin from "@/pages/AuthPages/OnlineExamLogin";
import OnlineExamRegister from "@/pages/AuthPages/OnlineExamRegister";
import OnlineExamChangePassword from "./pages/AuthPages/OnlineExamChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<OnlineExamLogin />} />
          <Route path="/dang-ki" element={<OnlineExamRegister />} />
          <Route path="/quen-mat-khau" element={<OnlineExamForgetPassword />} />
          <Route path="/doi-mat-khau" element={<OnlineExamChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
