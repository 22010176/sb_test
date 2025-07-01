import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Select, Statistic, Tag, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

export default function QuestionDetailInterface() {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const questions = [
    {
      id: 1,
      title: "I. Lý thuyết tổ hợp",
      difficulty: "DỄ",
      difficultyColor: "green",
      type: "CHỌN ĐÁP ÁN ĐÚNG NHẤT",
      question: "Cho 2 tập A, B với |A|=13;|B|=16;|A∩B|=1. |A∪B| là:",
      options: [
        { key: "A", text: "12", isCorrect: false },
        { key: "B", text: "32", isCorrect: false },
        { key: "C", text: "31", isCorrect: true },
        { key: "D", text: "18", isCorrect: false }
      ]
    },
    {
      id: 2,
      title: "I. Lý thuyết tổ hợp",
      difficulty: "TRUNG BÌNH",
      difficultyColor: "orange",
      type: "CHỌN NHIỀU ĐÁP ÁN",
      question: "Một nhóm có 5 bạn: An, Bình, Cường, Duyên và Hoa. Người ta cần chọn ra 2 bạn để tham gia một trò chơi. Trong các phương án sau, đâu là phát biểu đúng về cách chọn?",
      options: [
        { key: "A", text: "Nếu chọn An thì Bình là một cách; chọn Bình rồi An là một cách khác.", isCorrect: false },
        { key: "B", text: "Nếu chọn An rồi Bình là một cách; chọn Bình rồi An là một cách khác.", isCorrect: false },
        { key: "C", text: "Việc chọn 2 bạn để tham gia trò chơi là tổ hợp, không quan tâm đến thứ tự.", isCorrect: true },
        { key: "D", text: "Có 20 cách để chọn 2 bạn từ nhóm trên.", isCorrect: false }
      ]
    },
    {
      id: 3,
      title: "I. Lý thuyết tổ hợp",
      difficulty: "KHÓ",
      difficultyColor: "red",
      type: "CHỌN ĐÁP ÁN ĐÚNG NHẤT",
      question: "Cho biết số phần tử của tập A∪B∪C nếu mỗi tập có 100 phần tử và các tập hợp đôi một rời nhau:",
      options: [
        { key: "A", text: "12", isCorrect: false },
        { key: "B", text: "32", isCorrect: false },
        { key: "C", text: "31", isCorrect: true },
        { key: "D", text: "18", isCorrect: false }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'DỄ': return 'green';
      case 'TRUNG BÌNH': return 'orange';
      case 'KHÓ': return 'red';
      default: return 'blue';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <Title level={4} className="!mb-1 text-purple-800">
            Môn học - Toán rời rạc - I. Lý thuyết tổ hợp
          </Title>
          <Text className="text-gray-600">
            Cập nhật lần cuối: 21/06/2025
          </Text>
        </div>

        {/* Statistics */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center bg-blue-50 border-blue-200">
              <Statistic title="Tổng số câu hỏi" value={70} valueStyle={{ color: '#1890ff', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-green-50 border-green-200">
              <Statistic title="Câu hỏi dễ" value={30} valueStyle={{ color: '#52c41a', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-orange-50 border-orange-200">
              <Statistic title="Câu hỏi trung bình" value={30} valueStyle={{ color: '#fa8c16', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-red-50 border-red-200">
              <Statistic title="Câu hỏi khó" value={10} valueStyle={{ color: '#f5222d', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow-sm">
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            <Input
              placeholder="Tìm kiếm câu hỏi"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full"
            />
          </Col>
          <Col span={8}>
            <Select
              defaultValue="all"
              className="w-full"
              placeholder="Tất cả loại câu hỏi"
              onChange={(value) => setFilterType(value)}>
              <Option value="all">Tất cả loại câu hỏi</Option>
              <Option value="single">Chọn đáp án đúng nhất</Option>
              <Option value="multiple">Chọn nhiều đáp án</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select
              defaultValue="newest"
              className="w-full"
              placeholder="Tất cả mức độ"
              onChange={(value) => setSortBy(value)}>
              <Option value="newest">Tất cả mức độ</Option>
              <Option value="easy">Dễ</Option>
              <Option value="medium">Trung bình</Option>
              <Option value="hard">Khó</Option>
            </Select>
          </Col>
        </Row>

        <div className="flex justify-end space-x-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-red-500 hover:bg-red-600 border-red-500">
            Thêm câu hỏi
          </Button>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className="bg-blue-500 hover:bg-blue-600 border-blue-500">
            Nhập từ file
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4 flex flex-col gap-3">
        {questions.map((question, index) => (
          <Card
            key={question.id}
            className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <Text strong className="text-blue-600">{question.title}</Text>
                  <Tag color={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Tag>
                  <Tag color="blue">{question.type}</Tag>
                </div>
                <div className="flex space-x-1">
                  <Button type="text" icon={<CopyOutlined />} size="small" />
                  <Button type="text" icon={<EditOutlined />} size="small" />
                  <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                </div>
              </div>

              <p className="block mb-3 font-bold">
                Câu {index + 1}: {question.question}
              </p>
            </div>

            <div className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={option.key}
                  className={`p-3 rounded-lg border ${option.isCorrect
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                    }`}>
                  <p>
                    <span className="font-medium mr-2">{option.key}.</span>
                    {option.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}