import { BarChartOutlined, BellOutlined, CalendarOutlined, EditOutlined, ExperimentOutlined, SaveOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Layout, Menu, Select, Typography } from 'antd';
import { useState } from 'react';
// Note: dayjs would be imported in a real app

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function CreateExamInterface() {
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const menuItems = [
    { key: '1', icon: <CalendarOutlined />, label: 'Thông tin kỳ thi', },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: 'Danh sách thí sinh',
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'Cấu hình câu hỏi',
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: 'Thống kê kết quả',
    },
  ];

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="bg-purple-700 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <ExperimentOutlined className="text-white text-xl" />
            <Text className="text-white text-lg font-semibold">Online Exam</Text>
          </div>
          <div className="flex space-x-6">
            <Text className="text-purple-200 hover:text-white cursor-pointer">LỚP HỌC</Text>
            <Text className="text-purple-200 hover:text-white cursor-pointer">MÔN HỌC</Text>
            <div className="bg-purple-600 px-3 py-1 rounded">
              <Text className="text-white">KÌ THI</Text>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserOutlined className="text-white text-lg cursor-pointer hover:text-purple-200" />
          <BellOutlined className="text-white text-lg cursor-pointer hover:text-purple-200" />
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider
          width={250}
          className="bg-white shadow-sm"
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          {/* Exam Title */}
          <div className="p-4 border-b border-gray-200">
            <Text strong className="text-gray-800 block">
              Thi giữa kỳ môn
            </Text>
            <Text strong className="text-gray-800 block">
              Toán rời rạc
            </Text>
          </div>

          {/* Menu */}
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
            className="border-r-0"
          />
        </Sider>

        {/* Main Content */}
        <Content className="bg-gray-50 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                examName: 'Thi giữa kỳ môn Toán rời rạc',
                subject: 'Toán rời rạc',
                duration: '90',
              }}
            >
              {/* Exam Name */}
              <Form.Item
                label={<Text strong>Tên kì thi *</Text>}
                name="examName"
                rules={[{ required: true, message: 'Vui lòng nhập tên kì thi!' }]}
              >
                <Input
                  size="large"
                  placeholder="Nhập tên kì thi"
                />
              </Form.Item>

              {/* Subject */}
              <Form.Item
                label={<Text strong>Môn thi *</Text>}
                name="subject"
                rules={[{ required: true, message: 'Vui lòng chọn môn thi!' }]}
              >
                <Select
                  size="large"
                  placeholder="Chọn môn thi"
                  suffixIcon={<div className="text-gray-400">▼</div>}
                >
                  <Option value="Toán rời rạc">Toán rời rạc</Option>
                  <Option value="Kỹ thuật số">Kỹ thuật số</Option>
                  <Option value="Tiếng Nhật">Tiếng Nhật</Option>
                  <Option value="Tiếng Anh chuyên ngành">Tiếng Anh chuyên ngành</Option>
                </Select>
              </Form.Item>

              {/* Duration */}
              <Form.Item
                label={<Text strong>Thời gian làm bài thi (phút) *</Text>}
                name="duration"
                rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
              >
                <Input
                  size="large"
                  placeholder="Nhập thời gian (phút)"
                  type="number"
                />
              </Form.Item>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label={<Text strong>Thời gian bắt đầu *</Text>}
                  name="startTime"
                  rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
                >
                  <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    size="large"
                    className="w-full"
                    placeholder="Chọn thời gian bắt đầu"
                  />
                </Form.Item>

                <Form.Item
                  label={<Text strong>Thời gian kết thúc *</Text>}
                  name="endTime"
                  rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
                >
                  <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    size="large"
                    className="w-full"
                    placeholder="Chọn thời gian kết thúc"
                  />
                </Form.Item>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8">
                <Button
                  size="large"
                  icon={<EditOutlined />}
                  className="px-6"
                >
                  Chỉnh sửa
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600 px-6"
                >
                  Lưu
                </Button>
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}