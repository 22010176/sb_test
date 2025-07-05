import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Checkbox, Col, Input, Modal, Row, Select, Statistic, Tag, Typography } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import TextArea from 'antd/es/input/TextArea';

const { Text } = Typography;

type PageParam = {
  monHocId: string,
  boCauHoiId: string
}
function ChiTietBoCauHoi() {
  const { monHocId, boCauHoiId }: PageParam = useParams() as PageParam

  const [modal, setModal] = useState(false)
  const [formValue, setFormValue] = useState({})

  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const questions = [
    {
      id: 1, title: "I. Lý thuyết tổ hợp", difficulty: "DỄ", difficultyColor: "green", type: "CHỌN ĐÁP ÁN ĐÚNG NHẤT", question: "Cho 2 tập A, B với |A|=13;|B|=16;|A∩B|=1. |A∪B| là:",
      options: [
        { key: "A", text: "12", isCorrect: false },
        { key: "B", text: "32", isCorrect: false },
        { key: "C", text: "31", isCorrect: true },
        { key: "D", text: "18", isCorrect: false }
      ]
    },
    {
      id: 2, title: "I. Lý thuyết tổ hợp", difficulty: "TRUNG BÌNH", difficultyColor: "orange", type: "CHỌN NHIỀU ĐÁP ÁN",
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
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-purple-100 rounded-lg p-4 mb-4">
            <Breadcrumb className='text-lg font-bold'
              separator={<p className='text-xl'>&gt;</p>}
              items={[
                { title: <Link className='text-xl' to="/giang-vien/mon-hoc">Môn học</Link>, },
                { title: <Link to={"/giang-vien/mon-hoc/" + monHocId} className='text-xl'>{"ddd"}</Link>, },
                { title: <p className='text-xl'>{"dddd"}</p>, },
              ]} />
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
              <Input className="w-full" placeholder="Tìm kiếm câu hỏi" prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
            </Col>
            <Col span={8}>
              <Select defaultValue="single" className="w-full" placeholder="Tất cả loại câu hỏi"
                onChange={(value) => setFilterType(value)}
                options={[
                  { value: 'multiple', label: 'Chọn nhiều đáp án' },
                  { value: 'single', label: 'Chọn đáp án đúng nhất' },
                ]} />
            </Col>
            <Col span={8}>
              <Select className="w-full" placeholder="Tất cả mức độ"
                onChange={(value) => setSortBy(value)}
                options={[
                  { value: 'easy', label: 'Dễ' },
                  { value: 'medium', label: 'Trung bình' },
                  { value: 'hard', label: 'Khó' }
                ]} />
            </Col>
          </Row>

          <div className="flex justify-end space-x-2">
            <Button type="primary" icon={<PlusOutlined />}
              className="bg-red-500 hover:bg-red-600 border-red-500"
              onClick={() => setModal(true)}>
              Thêm câu hỏi
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}
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
                  <div key={option.key}
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

      <Modal open={modal} footer={null} width={600}
        title={<span className="text-lg font-medium text-gray-700">THÊM CÂU HỎI</span>}>
        <div className="space-y-4">
          {/* Bộ câu hỏi */}
          <div>
            <Text className="block mb-2 text-sm font-medium text-gray-700">
              Bộ câu hỏi <span className="text-red-500">*</span>
            </Text>
            <div className="bg-gray-100 px-3 py-2 rounded text-sm text-gray-600">
              I. Lý thuyết tổ hợp
            </div>
          </div>

          {/* Chọn mức độ và loại câu hỏi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text className="block mb-2 text-sm font-medium text-gray-700">
                Chọn mức độ câu hỏi <span className="text-red-500">*</span>
              </Text>
              <Select placeholder="Dễ" className="w-full"
                options={[
                  { value: 'easy', label: 'Dễ' },
                  { value: 'medium', label: 'Trung bình' },
                  { value: 'hard', label: 'Khó' }
                ]} />
            </div>
            <div>
              <Text className="block mb-2 text-sm font-medium text-gray-700">
                Chọn loại câu hỏi <span className="text-red-500">*</span>
              </Text>
              <Select placeholder="Chọn đáp án đúng nhất" className="w-full"
                options={[
                  { value: 'single', label: 'Chọn đáp án đúng nhất' },
                  { value: 'multiple', label: 'Chọn nhiều đáp án' },
                ]}
              />
            </div>
          </div>

          {/* Nội dung câu hỏi */}
          <div>
            <Text className="block mb-2 text-sm font-medium text-gray-700">
              Nội dung câu hỏi <span className="text-red-500">*</span>
            </Text>
            <TextArea placeholder="Nhập nội dung câu hỏi..." rows={4} className="w-full" />
          </div>

          {/* Đáp án */}
          <div className="flex items-center justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Đáp án <span className="text-red-500">*</span>
            </Text>
            <Button variant='solid' color='green' icon={<PlusOutlined />}>
              Thêm đáp án
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2].map((answer, index) => (
              <div key={index} className="flex items-center space-x-3 gap-5">
                {/* <Radio value={index} /> */}
                <Checkbox value={index} />
                <Input placeholder={`Đáp án ${index + 1}`} value={answer} />
              </div>
            ))}
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button size="large" >
              Hủy
            </Button>
            <Button variant='solid' color='purple' size="large" >
              Thêm
            </Button>
          </div>
        </div>
      </Modal >
    </>
  );
}

export default ChiTietBoCauHoi