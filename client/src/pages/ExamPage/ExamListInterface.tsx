import { BookOutlined, CalendarOutlined, CaretDownOutlined, ClockCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Row, Select, Space, Tag, Typography } from 'antd';
import { useState } from 'react';
import { DatePicker, Form, message } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

function ExamCreationForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const subjects = [
    'Toán học',
    'Văn học',
    'Tiếng Anh',
    'Vật lý',
    'Hóa học',
    'Sinh học',
    'Lịch sử',
    'Địa lý',
    'Tin học',
    'Giáo dục công dân'
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form values:', values);
      message.success('Tạo kì thi thành công!');

      // Reset form after successful submission
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo kì thi!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    message.info('Đã hủy tạo kì thi');
  };

  return (
    <Modal open footer={[]} title={
      <span className="text-lg font-semibold text-gray-800">
        TẠO KÌ THI
      </span>
    }>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
        requiredMark={false}
      >
        {/* Exam Name */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Tên kì thi <span className="text-red-500">*</span>
            </span>
          }
          name="examName"
          rules={[
            { required: true, message: 'Vui lòng nhập tên kì thi!' },
            { min: 3, message: 'Tên kì thi phải có ít nhất 3 ký tự!' }
          ]}
        >
          <Input placeholder="Nhập tên kì thi" className="rounded-lg" />
        </Form.Item>

        {/* Subject */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Môn thi <span className="text-red-500">*</span>
            </span>
          }
          name="subject"
          rules={[
            { required: true, message: 'Vui lòng chọn môn học!' }
          ]}
        >
          <Select placeholder="Chọn môn học" className="rounded-lg" showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            options={subjects.map(i => ({ value: i, label: i }))} />
        </Form.Item>

        {/* Duration */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Thời gian làm bài (phút) <span className="text-red-500">*</span>
            </span>
          }
          name="duration"
          rules={[
            { required: true, message: 'Vui lòng nhập thời gian làm bài!' },
            // { type: 'number', min: 15, message: 'Thời gian phải từ 15 đến 300 phút!' }
          ]}>
          <Input type="number" placeholder="Nhập thời gian làm bài" suffix="phút" />
        </Form.Item>

        {/* Start Time */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Thời gian bắt đầu <span className="text-red-500">*</span>
            </span>
          }
          name="startTime"
          rules={[
            { required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }
          ]}
        >
          <DatePicker

            placeholder="Chọn thời gian bắt đầu"
            className="w-full"
            showTime
            format="DD/MM/YYYY HH:mm"
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>

        {/* End Time */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">
              Thời gian kết thúc <span className="text-red-500">*</span>
            </span>
          }
          name="endTime"
          rules={[
            { required: true, message: 'Vui lòng chọn thời gian kết thúc!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || !getFieldValue('startTime')) {
                  return Promise.resolve();
                }
                if (value.isAfter(getFieldValue('startTime'))) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Thời gian kết thúc phải sau thời gian bắt đầu!'));
              },
            }),
          ]}
        >
          <DatePicker
            placeholder="Chọn thời gian kết thúc"
            className="w-full"
            showTime
            format="DD/MM/YYYY HH:mm"
            suffixIcon={<CalendarOutlined />} />
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item className="mb-0 pt-6">
          <Space className="w-full justify-center" size="large">
            <Button
              size="large"
              onClick={handleCancel}
              className="px-8 py-2 h-auto rounded-lg border-gray-300 text-gray-600 hover:border-gray-400"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="px-8 py-2 h-auto rounded-lg bg-purple-600 hover:bg-purple-700 border-purple-600"
            >
              Thêm
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}


export default function ExamListInterface() {
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('');

  const exams = [
    {
      id: 1,
      title: "Thi giữa kỳ môn Toán rời rạc",
      subject: "Toán rời rạc",
      duration: "90 phút",
      status: "Chưa diễn ra",
      statusColor: "green",
      startDate: "24/06/2025 8:00",
      endDate: "24/06/2025 9:30"
    },
    {
      id: 2,
      title: "Khảo sát Tiếng Nhật N3",
      subject: "Tiếng Nhật",
      duration: "90 phút",
      status: "Chưa diễn ra",
      statusColor: "green",
      startDate: "22/06/2025 14:00",
      endDate: "22/06/2025 15:30"
    },
    {
      id: 3,
      title: "Thi cuối kỳ môn Kỹ thuật số",
      subject: "Kỹ thuật số",
      duration: "60 phút",
      status: "Đã diễn ra",
      statusColor: "orange",
      startDate: "18/06/2025 8:00",
      endDate: "24/06/2025 9:00"
    },
    {
      id: 4,
      title: "Thi cuối kỳ Tiếng Anh chuyên ngành",
      subject: "Tiếng Anh chuyên ngành",
      duration: "90 phút",
      status: "Đã diễn ra",
      statusColor: "orange",
      startDate: "15/06/2025 14:00",
      endDate: "15/06/2025 15:30"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chưa diễn ra': return 'green';
      case 'Đã diễn ra': return 'orange';
      case 'Đang diễn ra': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search and Actions */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow-sm">
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Input
              placeholder="Tìm kiếm kì thi"
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full"
              size="large"
            />
          </Col>
          <Col span={8}>
            <Select placeholder="Sắp xếp..." size="large" suffixIcon={<CaretDownOutlined />}
              className="w-full"
              onChange={(value) => setSortBy(value)}
              options={[
                { label: "Mới nhất", value: "newest" },
                { label: "Cũ nhất", value: "oldest" },
                { label: "Theo tên", value: "name" },
                { label: "Theo môn học", value: "subject" },
              ]} />
          </Col>
          <Col span={8}>
            <div className="flex justify-end">
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Tạo kì thi
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Title */}
      <Title level={3} className="!mb-6 text-purple-700 font-bold">
        DANH SÁCH KÌ THI
      </Title>

      {/* Exams Grid */}
      <Row gutter={[16, 16]}>
        {exams.map((exam) => (
          <Col span={12} key={exam.id}>
            <Card
              className="hover:shadow-lg transition-all duration-300 border-gray-200 h-full"
              bodyStyle={{ padding: '20px' }}
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <Title level={5} className="!mb-0 text-gray-800 flex-1 pr-4">
                    {exam.title}
                  </Title>
                  <Tag
                    color={getStatusColor(exam.status)}
                    className="shrink-0 px-3 py-1 text-sm font-medium">
                    {exam.status}
                  </Tag>
                </div>
              </div>

              <Space direction="vertical" className="w-full" size="middle">
                <div className="flex items-center text-gray-600">
                  <BookOutlined className="mr-3 text-blue-500" />
                  <Text className="text-base">{exam.subject}</Text>
                  <div className="ml-auto flex items-center">
                    <ClockCircleOutlined className="mr-2 text-red-500" />
                    <Text className="text-base font-medium">{exam.duration}</Text>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <CalendarOutlined className="mr-3 text-green-500" />
                  <Text className="text-base">{exam.startDate}</Text>
                  <div className="ml-auto flex items-center">
                    <CalendarOutlined className="mr-2 text-purple-500" />
                    <Text className="text-base">{exam.endDate}</Text>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Load More or Pagination could be added here */}
      <div className="text-center mt-8">
        <Text className="text-gray-500">
          Hiển thị {exams.length} kì thi
        </Text>
      </div>
      <ExamCreationForm />
    </div>
  );
}