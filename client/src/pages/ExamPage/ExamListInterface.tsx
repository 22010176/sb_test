import React, { useState } from 'react';
import { Card, Button, Input, Select, Row, Col, Typography, Space, Tag } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CaretDownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

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
            <Select
              placeholder="Sắp xếp..."
              className="w-full"
              size="large"
              suffixIcon={<CaretDownOutlined />}
              onChange={(value) => setSortBy(value)}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="oldest">Cũ nhất</Option>
              <Option value="name">Theo tên</Option>
              <Option value="subject">Theo môn học</Option>
            </Select>
          </Col>
          <Col span={8}>
            <div className="flex justify-end">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                className="bg-purple-600 hover:bg-purple-700 border-purple-600 px-6"
              >
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
                    className="shrink-0 px-3 py-1 text-sm font-medium"
                  >
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
    </div>
  );
}