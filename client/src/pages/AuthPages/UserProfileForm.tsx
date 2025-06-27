import { EditOutlined, SaveOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, DatePicker, Form, Input, Select, Space, Upload, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Option } = Select;

export default function UserProfileForm() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const initialValues = {
    fullName: 'Nguyễn Văn A',
    birthDate: dayjs('15/04/1987'),
    phoneNumber: '0653879000',
    gender: 'Nam',
    email: 'nguyenvana@gmail.com'
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
    setIsEditing(false);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Simulate avatar upload success
      const reader = new FileReader();
      reader.addEventListener('load', () => setAvatarUrl(reader.result));
      reader.readAsDataURL(info.file.originFileObj);
      message.success('Tải ảnh đại diện thành công!');
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg rounded-xl border-0">
          {/* Header */}
          <div className="text-center border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              HỒ SƠ CỦA TÔI
            </h1>

            {/* Avatar Section */}
            <div className="relative inline-block">
              <Avatar
                size={120}
                src={avatarUrl}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              />
              {isEditing && (
                <Upload
                  name="avatar"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleAvatarChange}
                  className="absolute -bottom-2 -right-2"
                >
                  <Button
                    icon={<UploadOutlined />}
                    shape="circle"
                    size="small"
                    className="bg-blue-500 hover:bg-blue-600 border-blue-500 text-white shadow-md"
                  />
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

            <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <Form.Item
                  name="fullName"
                  label={<span className="font-medium text-gray-700">Họ và tên</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập họ và tên!' },
                    { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự!' }
                  ]}
                >
                  <Input
                    placeholder="Nhập họ và tên"
                    disabled={!isEditing}
                    className={`rounded-lg transition-all duration-200 ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50'
                      }`}
                    size="large"
                  />
                </Form.Item>

                {/* Giới tính */}
                <Form.Item
                  label={<span className="font-medium text-gray-700">Giới tính</span>}
                  name="gender"
                  rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                  <Select placeholder="Chọn giới tính" disabled={!isEditing} className={`rounded-lg ${!isEditing ? 'pointer-events-none' : ''}`} size="large"
                    options={[
                      { value: 'Nam', label: 'Nam' },
                      { value: 'Nữ', label: 'Nữ' },
                      { value: 'Khác', label: 'Khác' },
                    ]} />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ngày sinh */}
                <Form.Item
                  label={<span className="font-medium text-gray-700">Ngày sinh</span>}
                  name="birthDate"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                >
                  <DatePicker
                    placeholder="Chọn ngày sinh"
                    format="DD/MM/YYYY"
                    disabled={!isEditing}
                    size="large"
                    className={`w-full rounded-lg transition-all duration-200 ${isEditing
                      ? 'border-gray-300 focus:border-blue-500'
                      : 'border-gray-200 bg-gray-50'}`} />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  label={<span className="font-medium text-gray-700">Email</span>}
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input
                    placeholder="Nhập email"
                    disabled={!isEditing}
                    className={`rounded-lg transition-all duration-200 ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50'
                      }`}
                    size="large"
                  />
                </Form.Item>
              </div>

              {/* SĐT */}
              <Form.Item
                label={<span className="font-medium text-gray-700">SĐT*</span>}
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  disabled={!isEditing}
                  className={`rounded-lg transition-all duration-200 ${isEditing
                    ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    : 'border-gray-200 bg-gray-50'
                    }`}
                  size="large"
                />
              </Form.Item>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                {!isEditing ? (
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 rounded-lg px-6 py-2 h-auto font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    size="large"
                  >
                    Chỉnh sửa
                  </Button>
                ) : (
                  <Space>
                    <Button
                      onClick={handleCancel}
                      className="rounded-lg px-6 py-2 h-auto font-medium border-gray-300 hover:border-gray-400 transition-all duration-200"
                      size="large"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSave}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 rounded-lg px-6 py-2 h-auto font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      size="large"
                    >
                      Lưu
                    </Button>
                  </Space>
                )}
              </div>
            </Form>
          </div>
        </Card>

      </div>
    </div>
  );
}