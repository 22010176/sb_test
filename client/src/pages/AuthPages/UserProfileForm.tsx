import { EditOutlined, SaveOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, DatePicker, Form, Input, Select, Space, Upload, message } from 'antd';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';

import { CapNhatNguoiDung, type CapNhatInput } from '@/api/TaiKhoan';
import type { PageContextData, UserData } from '@/App.types';
import { PageContext } from '@/contexts/PageContext';
import { withAccount } from '@/hoc/auth';

function Element() {
  const [{ user }, dispatch]: PageContextData = useContext(PageContext) as PageContextData

  const _user = user as UserData

  const [form] = Form.useForm();
  form.setFieldsValue({
    hoTen: _user.hoTen,
    gioiTinh: _user.gioiTinh,
    ngaySinh: dayjs(_user.ngaySinh),
    soDienThoai: _user.soDienThoai,
    email: _user.email
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleSave = () => {
    form.validateFields().then(async values => {
      const input: CapNhatInput = {
        ...values,
        ngaySinh: values.ngaySinh.toDate()
      }

      await CapNhatNguoiDung(input).then(async result => {
        dispatch({ type: 'SET_USER', payload: result.data })
        form.setFieldsValue(result.data)
        message.success('Cập nhật thông tin thành công!');
      }).catch(() => {
        message.error('Cập nhật thông tin không thành công. Vui lòng thử lại sau!');
      });

      setIsEditing(false);
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue(_user);
    setIsEditing(false);
  };

  // const handleAvatarChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Simulate avatar upload success
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => setAvatarUrl(reader.result));
  //     reader.readAsDataURL(info.file.originFileObj);
  //     message.success('Tải ảnh đại diện thành công!');
  //   }
  // };

  // const beforeUpload = (file) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('Chỉ có thể tải lên file JPG/PNG!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Ảnh phải nhỏ hơn 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  return (
    <div className="bg-gray-50 py-8 xl:px-100 px-20">
      {/* <div className="max-w-2xl mx-auto"> */}
      <Card className=" shadow-lg rounded-xl border-0">
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            HỒ SƠ CỦA TÔI
          </h1>

          {/* Avatar Section */}
          <div className="relative inline-block">
            <Avatar size={120} src={avatarUrl} icon={<UserOutlined />}
              className="border-4 border-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            {isEditing && (
              <Upload name="avatar" showUploadList={false}>
                <Button icon={<UploadOutlined />} shape="circle" size="small" />
              </Upload>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="px-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            THÔNG TIN TÀI KHOẢN
          </h2>

          <Form form={form} layout="vertical" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Họ và tên */}
              <Form.Item name="hoTen"
                label={<span className="font-medium text-gray-700">Họ và tên</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên!' },
                  { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự!' }
                ]}>
                <Input placeholder="Nhập họ và tên" disabled={!isEditing} size="large" />
              </Form.Item>

              {/* Giới tính */}
              <Form.Item name="gioiTinh"
                label={<span className="font-medium text-gray-700">Giới tính</span>}
                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                <Select placeholder="Chọn giới tính" disabled={!isEditing} className={`rounded-lg ${!isEditing ? 'pointer-events-none' : ''}`} size="large"
                  options={[
                    { value: 0, label: 'Nam' },
                    { value: 1, label: 'Nữ' },
                    { value: 2, label: 'Khác' },
                  ]} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ngày sinh */}
              <Form.Item name="ngaySinh"
                label={<span className="font-medium text-gray-700">Ngày sinh</span>}
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
                <DatePicker placeholder="Chọn ngày sinh" format="DD/MM/YYYY" size="large"
                  disabled={!isEditing}
                  className="w-full rounded-lg transition-all duration-200" />
              </Form.Item>

              {/* Email */}
              <Form.Item name="email"
                label={<span className="font-medium text-gray-700">Email</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}>
                <Input placeholder="Nhập email" disabled={!isEditing} size="large" />
              </Form.Item>
            </div>

            {/* SĐT */}
            <Form.Item name="soDienThoai"
              label={<span className="font-medium text-gray-700">SĐT*</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
              ]}            >
              <Input placeholder="Nhập số điện thoại" disabled={!isEditing} size="large" />
            </Form.Item>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              {!isEditing ? (
                <Button type="primary" size="large" icon={<EditOutlined />}
                  onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              ) : (
                <Space>
                  <Button size="large" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button size="large" type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                    Lưu
                  </Button>
                </Space>
              )}
            </div>
          </Form>
        </div>
      </Card>

      {/* </div> */}
    </div>
  );
}

const UserProfileForm = withAccount(Element)

export default UserProfileForm