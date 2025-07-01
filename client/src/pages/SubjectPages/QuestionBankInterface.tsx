import { CalendarOutlined, ClockCircleOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, FileTextOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Dropdown, Menu, Row, Space, Statistic, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function QuestionBankInterface() {
  const [questionSets, setQuestionSets] = useState([
    {
      id: 1,
      title: "I. Lý thuyết tổ hợp",
      questionCount: 70,
      details: "30 Dễ, 30 Trung bình, 10 Khó",
      lastUpdated: "21/06/2025"
    },
    {
      id: 2,
      title: "II. Lý thuyết đồ thị",
      questionCount: 86,
      details: "34 Dễ, 38 Trung bình, 14 Khó",
      lastUpdated: "21/06/2025"
    },
    {
      id: 3,
      title: "III. Suy luận toán học",
      questionCount: 40,
      details: "20 Dễ, 10 Trung bình, 10 Khó",
      lastUpdated: "21/06/2025"
    }
  ]);

  const getActionMenu = (item) => (
    <Menu>
      <Menu.Item key="view" icon={<EyeOutlined />}>
        Xem chi tiết
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Chỉnh sửa
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Xóa
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <Title level={3} className="!mb-2 text-purple-800">
            Môn học - Toán rời rạc
          </Title>
          <Text className="text-gray-600">
            Cập nhật lần cuối: 17/06/2025
          </Text>
        </div>

        {/* Statistics */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center bg-blue-50 border-blue-200">
              <Statistic title="Tổng số câu hỏi" value={196} valueStyle={{ color: '#1890ff', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-green-50 border-green-200">
              <Statistic title="Câu hỏi dễ" value={72} valueStyle={{ color: '#52c41a', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-orange-50 border-orange-200">
              <Statistic title="Câu hỏi trung bình" value={78} valueStyle={{ color: '#fa8c16', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-red-50 border-red-200">
              <Statistic title="Câu hỏi khó" value={46} valueStyle={{ color: '#f5222d', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!mb-0">
          CÁC BỘ CÂU HỎI:
        </Title>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} className="bg-purple-600 hover:bg-purple-700 border-purple-600">
            Thêm bộ câu hỏi
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} className="bg-green-600 hover:bg-green-700 border-green-600">
            Xuất danh sách
          </Button>
        </Space>
      </div>

      {/* Question Sets */}
      <Row gutter={[16, 16]}>
        {questionSets.map((item) => (
          <Col span={12} key={item.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <Title level={5} className="!mb-0 text-gray-800">
                  {item.title}
                </Title>
                <Dropdown
                  overlay={getActionMenu(item)}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </Dropdown>
              </div>

              <Space direction="vertical" className="w-full" size="small">
                <div className="flex items-center text-gray-600">
                  <FileTextOutlined className="mr-2" />
                  <Text>{item.questionCount} Câu hỏi</Text>
                </div>

                <div className="flex items-center text-gray-600">
                  <ClockCircleOutlined className="mr-2" />
                  <Text>{item.details}</Text>
                </div>

                <div className="flex items-center text-gray-600">
                  <CalendarOutlined className="mr-2" />
                  <Text>Cập nhật lần cuối: {item.lastUpdated}</Text>
                </div>
              </Space>

              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                </Button>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                </Button>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}