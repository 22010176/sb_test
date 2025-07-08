import { DangKyNguoiDung } from '@/api/GiangVien/TaiKhoan';
import { withNoAccount } from '@/hoc/auth';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router';

interface RegisterForm {
  loaiNguoiDung: number,
  hoTen: string,
  gioiTinh: number,
  ngaySinh: string,
  email: string,
  soDienThoai: string,
  matKhau: string,
  confirmMatKhau: string
}

function Element() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterForm) => {
    if (values.matKhau !== values.confirmMatKhau) return message.error('Mật khẩu xác nhận không khớp!');
    try {
      setLoading(true);
      await DangKyNguoiDung({
        loaiNguoiDung: values.loaiNguoiDung,
        hoTen: values.hoTen,
        gioiTinh: values.gioiTinh,
        email: values.email,
        soDienThoai: values.soDienThoai,
        matKhau: values.matKhau,
        ngaySinh: values.ngaySinh
      });
      setLoading(false);
      message.success('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
      form.resetFields();
    } catch {
      setLoading(false);
      message.error('Đăng ký không thành công. Vui lòng thử lại sau!');
      return;
    }
  };

  return (
    <>
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">ĐĂNG KÝ TÀI KHOẢN</h2>
      </div>

      <Form form={form} name="login" onFinish={onFinish} layout="vertical" >
        <Form.Item label="Chọn vai trò của bạn" name="loaiNguoiDung" rules={[
          { required: true, message: 'Vui lòng chọn vai trò!' }
        ]}>
          <Select placeholder="Chọn vai trò" suffixIcon={<UserOutlined />} options={[
            { value: 1, label: 'Học sinh' },
            { value: 0, label: 'Giáo viên' }]} />
        </Form.Item>

        <Form.Item label="Họ và tên" name="hoTen"
          rules={[
            { required: true, message: 'Vui lòng nhập họ và tên!' },
            { min: 3, message: 'Họ và tên phải có ít nhất 3 ký tự!' }
          ]}>
          <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Nhập họ và tên của bạn" />
        </Form.Item>

        <Form.Item label="Giới tính" name="gioiTinh" rules={[
          { required: true, message: 'Vui lòng chọn giới tính!' }
        ]}>
          <Radio.Group options={[
            { value: 0, label: 'Nam' },
            { value: 1, label: 'Nữ' },
            { value: 2, label: 'Khác' }]} />
        </Form.Item>

        <Form.Item label="Ngày sinh" name="ngaySinh"
          rules={[
            { required: true, message: 'Vui lòng nhập ngày sinh!' },
            { type: 'date', message: 'Ngày sinh không hợp lệ!' }
          ]}>
          <DatePicker className='w-full' prefix={<MailOutlined className="text-gray-400" />} placeholder="Nhập ngày sinh của bạn" />
        </Form.Item>

        <Form.Item label="Email" name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}>
          <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Nhập email của bạn" />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="soDienThoai"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^\+?[0-9]{1,4}?[-. (]?[0-9]{2,4}?[-. )]?[0-9]{3,4}?[-. ]?[0-9]{3,4}$/, message: 'Số điện thoại không hợp lệ!' }
          ]}>
          <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Nhập số điện thoại của bạn" />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="matKhau"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' }
          ]}>
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item label="Xác nhận mật khẩu" name="confirmMatKhau" rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          ({ getFieldValue }) => ({
            warningOnly: true,
            validator(_, value) {
              if (!value || getFieldValue('matKhau') === value) return Promise.resolve();
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}>
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="w-full border-0 text-lg font-semibold rounded-lg">
            Đăng ký
          </Button>
        </Form.Item>

        <Form.Item className="text-left">
          <Link to="/" className='font-semibold flex items-center gap-2'>
            <FontAwesomeIcon icon={faArrowLeft} />
            Quay lại đăng nhập
          </Link>
        </Form.Item>

        <Button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Tiếp tục với Google
        </Button>
      </Form>

    </>
  );
}

const OnlineExamRegister = withNoAccount(Element)

export default OnlineExamRegister