import { DeleteOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Collapse, Input, Modal, Select, Table, Typography } from 'antd';
import { useState } from 'react';

const { Text, Title } = Typography;


const ExamInterface = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: 'C',
    question2: 'A',
    question3: 'B'
  });

  const handleAnswerChange = (questionId, value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const studentInfo = {
    name: "Nguyễn Văn Bình",
    gender: "Nam",
    birthDate: "15/01/2004",
    phoneNumber: "0872837290",
    correctAnswers: "35/50",
    score: "7.0/10"
  };

  const examStats = {
    totalQuestions: 50,
    difficulty: {
      easy: 0.2,
      medium: 0.25,
      hard: 0.4
    }
  };

  const questions = [
    {
      id: 'question1',
      text: 'Cho 2 tập A, B với |A|=13,|B|=10,|A∩B|=1. |A∪B| là:',
      options: [
        { value: 'A', text: '12' },
        { value: 'B', text: '31' },
        { value: 'C', text: '32' },
        { value: 'D', text: '18' }
      ],
      difficulty: 'DỄ',
      mostChosen: 'CHỌN ĐÁP ÁN ĐÚNG NHẤT',
      correctAnswer: 'B'
    },
    {
      id: 'question1',
      text: 'Cho 2 tập A, B với |A|=13,|B|=10,|A∩B|=1. |A∪B| là:',
      options: [
        { value: 'A', text: '12' },
        { value: 'B', text: '31' },
        { value: 'C', text: '32' },
        { value: 'D', text: '18' }
      ],
      difficulty: 'DỄ',
      mostChosen: 'CHỌN ĐÁP ÁN ĐÚNG NHẤT',
      correctAnswer: 'B'
    },
    {
      id: 'question1',
      text: 'Cho 2 tập A, B với |A|=13,|B|=10,|A∩B|=1. |A∪B| là:',
      options: [
        { value: 'A', text: '12' },
        { value: 'B', text: '31' },
        { value: 'C', text: '32' },
        { value: 'D', text: '18' }
      ],
      difficulty: 'DỄ',
      mostChosen: 'CHỌN ĐÁP ÁN ĐÚNG NHẤT',
      correctAnswer: 'B'
    },
    {
      id: 'question1',
      text: 'Cho 2 tập A, B với |A|=13,|B|=10,|A∩B|=1. |A∪B| là:',
      options: [
        { value: 'A', text: '12' },
        { value: 'B', text: '31' },
        { value: 'C', text: '32' },
        { value: 'D', text: '18' }
      ],
      difficulty: 'DỄ',
      mostChosen: 'CHỌN ĐÁP ÁN ĐÚNG NHẤT',
      correctAnswer: 'B'
    },
    {
      id: 'question1',
      text: 'Cho 2 tập A, B với |A|=13,|B|=10,|A∩B|=1. |A∪B| là:',
      options: [
        { value: 'A', text: '12' },
        { value: 'B', text: '31' },
        { value: 'C', text: '32' },
        { value: 'D', text: '18' }
      ],
      difficulty: 'DỄ',
      mostChosen: 'CHỌN ĐÁP ÁN ĐÚNG NHẤT',
      correctAnswer: 'B'
    },
    {
      id: 'question2',
      text: 'Một nhóm có 5 bạn: An, Bình, Cường, Duyên và Hoa. Người ta cần chọn ra 2 bạn để tham gia một trò chơi. Trong các phương án sau, đâu là phát biểu đúng về cách chọn?',
      options: [
        { value: 'A', text: 'Nếu chọn An rồi Bình là một cách, chọn Bình rồi An là một cách khác.' },
        { value: 'B', text: 'Nếu chọn An rồi Bình là một cách, chọn Bình rồi An là một cách khác.' },
        { value: 'C', text: 'Việc chọn 2 bạn để tham gia trò chơi là tổ hợp, không quan tâm đến thứ tự.' },
        { value: 'D', text: 'Có 20 cách để chọn 2 bạn từ nhóm trên.' }
      ],
      difficulty: 'TRUNG BÌNH',
      mostChosen: 'CHỌN NHIỀU ĐÁP ÁN',
      correctAnswer: 'C'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="flex items-center mb-4 gap-2">
        <Avatar size={24} icon={<UserOutlined />} className="mr-3" />
        <span className="font-semibold text-base">Thông tin thí sinh</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Họ và tên:</span> {studentInfo.name}</p>
          <p><span className="font-medium">Ngày sinh:</span> {studentInfo.birthDate}</p>
          <p><span className="font-medium">Số câu trả lời đúng:</span> {studentInfo.correctAnswers}</p>
        </div>
        <div className="space-y-1">
          <p><span className="font-medium">Giới tính:</span> {studentInfo.gender}</p>
          <p><span className="font-medium">SĐT:</span> {studentInfo.phoneNumber}</p>
          <p><span className="font-medium">Điểm bài thi:</span> {studentInfo.score}</p>
        </div>
      </div>
      {/* </Card> */}

      {/* Exam Statistics */}
      <div className="my-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">{examStats.totalQuestions} câu hỏi</h2>
        <div className="flex space-x-8">
          <span>Dễ: {examStats.difficulty.easy}/ câu</span>
          <span>Trung bình: {examStats.difficulty.medium}/ câu</span>
          <span>Khó: {examStats.difficulty.hard}/ câu</span>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
            {/* Left curved bracket */}
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg"></div>

            <div className="mb-4">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${question.difficulty === 'DỄ' ? 'bg-green-100 text-green-800' :
                  question.difficulty === 'TRUNG BÌNH' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {question.difficulty}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${question.mostChosen === 'CHỌN ĐÁP ÁN ĐÚNG NHẤT' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                  {question.mostChosen}
                </span>
              </div>
              <h3 className="font-medium text-base mb-4">
                <span className="font-bold">Câu {index + 1}:</span> {question.text}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`relative p-3 rounded-lg border-2 transition-all cursor-pointer ${selectedAnswers[question.id] === option.value
                    ? option.value === question.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                    : option.value === question.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                    }`}
                  onClick={() => handleAnswerChange(question.id, option.value)}>
                  {/* Left curved bracket for option */}
                  <div className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${selectedAnswers[question.id] === option.value
                    ? option.value === question.correctAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : option.value === question.correctAnswer
                      ? 'bg-green-500'
                      : 'bg-gray-400'
                    }`}></div>

                  <div className="flex items-center pl-2">
                    <span className="font-medium mr-2">{option.value}.</span>
                    <span className="text-sm">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function ChiTietKiThiDanhSachThiSinh() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: 'A',
    question2: 'A',
    question3: 'B'
  });

  const handleAnswerChange = (questionId, value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const studentInfo = {
    name: "Nguyễn Văn Bình",
    gender: "Nam",
    birthDate: "15/01/2004",
    phoneNumber: "0872837290",
    correctAnswers: "35/50",
    score: "7.0/10"
  };

  const examStats = {
    totalQuestions: 50,
    difficulty: {
      easy: 0.2,
      medium: 0.25,
      hard: 0.4
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [themLopModal, setThemLop] = useState(false)

  const [danhSachLopGV, setDanhLopGV] = useState([])

  const classData = [
    { id: 1, name: 'Toán rời rạc N01', students: 25 },
    { id: 2, name: 'Toán rời rạc N02', students: 20 },
    { id: 3, name: 'Toán rời rạc N03', students: 15 },
    { id: 4, name: 'Toán rời rạc N04', students: 20 },
    { id: 5, name: 'Toán rời rạc N05', students: 25 },
  ];

  const columns = [
    {
      title: <p className='text-center'>STT</p>, width: 60, className: 'text-center',
      render: (_: any, __: any, i: number) => i + 1
    },
    {
      title: <p className='text-center'>Họ và tên</p>, dataIndex: 'hoTen', key: 'hoTen', width: 180,
      onFilter: (value: any, record: any) => record.name.toLowerCase().includes(value.toLowerCase())
    },
    { title: <p className='text-center'>Giới tính</p>, dataIndex: 'gioiTinh', key: 'gioiTinh', width: 100, className: 'text-center' },
    {
      title: <p className='text-center'>Ngày sinh</p>, dataIndex: 'ngaySinh', key: 'ngaySinh', width: 120, className: 'text-center',
      render: (_: string) => new Date(_).toLocaleDateString("vi-VN")
    },
    { title: <p className='text-center'>SĐT</p>, dataIndex: 'soDienThoai', key: 'soDienThoai', width: 130 },
    { title: <p className='text-center'>Email</p>, dataIndex: 'email', key: 'email', width: 200, },
    {
      title: <p className='text-center'>Thao tác</p>, key: 'action', width: 120, className: 'text-center',
      render: (_: any, record: any) => <Button variant='solid' color='red' icon={<DeleteOutlined />} />
    }
  ];

  const filteredClasses = classData.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-10">
      {/* Header */}
      <div className='flex justify-between mb-5'>
        <div className="flex items-center space-x-4">
          <Input placeholder="Tìm kiếm tên lớp" className="w-64" prefix={<SearchOutlined className="text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <Select className='w-80' />
        </div>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setThemLop(true)}>
          Thêm lớp
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-5">
        <Text>Tổng số lớp: <span className="font-semibold text-gray-800">5</span></Text>
        <Text>Tổng số học sinh: <span className="font-semibold text-gray-800">105</span></Text>
      </div>

      {/* Class List */}
      <div className="space-y-4">
        <Collapse
          accordion
          bordered={false}
          items={filteredClasses.map((i, j) => ({
            key: j,
            label: <p className='font-bold'>{i.name}</p>,
            children: (
              <Table columns={columns} />
            )
          }))} />
      </div>

      {/* No results message */}
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <SearchOutlined />
          </div>
          <Title level={4} className="text-gray-500">
            Không tìm thấy lớp học nào
          </Title>
          <Text type="secondary">
            Thử tìm kiếm với từ khóa khác hoặc thêm lớp học mới
          </Text>
        </div>
      )}
      <Modal open={themLopModal} title="THÊM LỚP" okText="Xác nhận" cancelText="Hủy"
        onCancel={() => {
          setThemLop(false)
        }}>
        <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select"
          options={[]} />
      </Modal>

      <Modal open={false} title="XEM CHI TIẾT BÀI LÀM" okText="Xác nhận" cancelText="Hủy" width={1000} footer={[]}
        onCancel={() => {
          setThemLop(false)
        }}>
        <ExamInterface />
      </Modal>
    </div>
  );
};

export default ChiTietKiThiDanhSachThiSinh;