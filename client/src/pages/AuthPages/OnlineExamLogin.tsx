import { GoogleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { DangNhapNguoiDung, type DangNhapInput } from '@/api/GiangVien/TaiKhoan';
import { withNoAccount } from '@/hoc/auth';


const role = import.meta.env.VITE_ROLE;
const link = role === "STUDENT" ? import.meta.env.VITE_HOCSINH_PAGE : import.meta.env.VITE_GIANGVIEN_PAGE

function Element() {

  const [form] = Form.useForm();
  const [rememberPassword, setRememberPassword] = useState(false);

  const onFinish = async (values: { loaiNguoiDung: number, email: string, matKhau: string }) => {
    const input: DangNhapInput = {
      loaiNguoiDung: values.loaiNguoiDung,
      email: values.email,
      soDienThoai: values.email, // Assuming email is used as phone number
      matKhau: values.matKhau,
    }
    await DangNhapNguoiDung(input).then(res => {
      message.success('Đăng nhập thành công!');
      localStorage.setItem('token', res.data);
      form.resetFields();
      console.log(role)
      console.log(res)
      if (role == "TEACHER") {
        console.log("DDDD")
        // return
        window.location.replace('/giang-vien');
      }
      else if (role == "STUDENT") {
        console.log("DDDD")
        window.location.replace('/hoc-sinh');
        return
      }
    }).catch(() => {
      message.error('Đăng nhập không thành công. Vui lòng thử lại sau!');
      return;
    });
  };

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 mb-5 text-center">
        HỆ THỐNG THI TRẮC NGHIỆM TRỰC TUYẾN
      </h1>

      <Form form={form} className="space-y-2" name="login" onFinish={onFinish} layout="vertical" >
        <Form.Item label="Chọn vai trò của bạn" name="loaiNguoiDung" rules={[
          { required: true, message: 'Vui lòng chọn vai trò!' }
        ]}>
          <Select placeholder="Chọn vai trò" suffixIcon={<UserOutlined />} options={[
            { value: 1, label: 'Học sinh' },
            { value: 0, label: 'Giáo viên' }]} />
        </Form.Item>

        <Form.Item label="SĐT hoặc Gmail đăng nhập" name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            // { type: 'email', message: 'Email không hợp lệ!' }
          ]}>
          <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Nhập email của bạn" />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="matKhau" rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' }
        ]}>
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập mật khẩu" />
        </Form.Item>

        <div className="flex items-center justify-between mb-6">
          <Checkbox checked={rememberPassword} onChange={(e) => setRememberPassword(e.target.checked)}>
            Nhớ mật khẩu
          </Checkbox>
          <Link to="/quen-mat-khau" className="text-blue-600 hover:text-blue-800 text-sm">
            Bạn quên mật khẩu?
          </Link>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full border-0 text-lg font-semibold rounded-lg">
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item className="text-center">
          <span className="text-gray-500">Hoặc</span>
        </Form.Item>

        <Button className='w-full' icon={<GoogleOutlined />}>
          Tiếp tục với Google
        </Button>

        <div className="text-center mt-6">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link to="/dang-ky" className="text-blue-600 hover:text-blue-800 font-semibold">
            Đăng ký ngay
          </Link>
        </div>
      </Form>
    </>
  );
}

const OnlineExamLogin = withNoAccount(Element)

export default OnlineExamLogin