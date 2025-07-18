import { LayDanhSachKiThi } from '@/api/HocSinh/KiThi';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { Calendar, Clock, FileText, Trophy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';


const ExamResultDetail = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const examInfo = {
    studentName: 'Nguyễn Văn A',
    className: 'Xác suất thống kê 1',
    examDate: '24/06/2025 8:00',
    duration: '80 phút',
    score: '8.5/10',
    correctAnswers: '34/40',
    classRank: '15/60',
    totalRank: '21/88'
  };

  const questions = [
    {
      id: 1,
      question: 'Cho 2 tập A, B với |A|=13,|B|=19,|A∩B|=1. |A∪B| là:',
      options: [
        { label: 'A', text: '12', isCorrect: false },
        { label: 'B', text: '31', isCorrect: true },
        { label: 'C', text: '32', isCorrect: false },
        { label: 'D', text: '18', isCorrect: false }
      ],
      userAnswer: 'B',
      isCorrect: true,
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Một nhóm có 5 bạn: An, Bình, Cường, Duyên và Hoa. Người ta cần chọn ra 2 bạn để tham gia một trò chơi. Trong các phương án sau, đâu là phát biểu đúng về cách chọn?',
      options: [
        { label: 'A', text: 'Nếu chọn An rồi Bình là một cách, chọn Bình rồi An là một cách khác.', isCorrect: false },
        { label: 'B', text: 'Nếu chọn An rồi Bình là một cách, chọn Bình rồi An là một cách khác.', isCorrect: false },
        { label: 'C', text: 'Việc chọn 2 bạn để tham gia trò chơi là tổ hợp, không quan tâm đến thứ tự.', isCorrect: true },
        { label: 'D', text: 'Có 20 cách để chọn 2 bạn từ nhóm trên.', isCorrect: false }
      ],
      userAnswer: 'C',
      isCorrect: true,
      difficulty: 'medium'
    }
  ];
  const getFilteredQuestions = () => {
    if (selectedFilter === 'correct') {
      return questions.filter(q => q.isCorrect);
    } else if (selectedFilter === 'incorrect') {
      return questions.filter(q => !q.isCorrect);
    }
    return questions;
  };

  const getQuestionStats = () => {
    const total = questions.length;
    const correct = questions.filter(q => q.isCorrect).length;
    const incorrect = total - correct;
    const easy = questions.filter(q => q.difficulty === 'easy').length;
    const medium = questions.filter(q => q.difficulty === 'medium').length;
    const hard = questions.filter(q => q.difficulty === 'hard').length;

    return { total, correct, incorrect, easy, medium, hard };
  };

  const stats = getQuestionStats();

  const QuestionCard = ({ question, index }) => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-start gap-3">
        <div className="w-1 bg-blue-500 rounded-full flex-shrink-0 mt-1 mb-1 self-stretch"></div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-600">Câu {question.id}:</span>
            {question.difficulty === 'easy' && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">DỄ</span>
            )}
            {question.difficulty === 'medium' && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">TRUNG BÌNH</span>
            )}
            {question.difficulty === 'hard' && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">KHÓ</span>
            )}
            {question.isCorrect && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">CHỌN ĐÁP ÁN ĐÚNG NHẤT</span>
            )}
            {!question.isCorrect && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">CHỌN NHIỀU ĐÁP ÁN</span>
            )}
          </div>

          <p className="text-gray-800 mb-4">{question.question}</p>

          <div className="grid grid-cols-1 gap-1">
            {question.options.map((option, optionIndex) => {
              const isUserAnswer = option.label === question.userAnswer;
              const isCorrectAnswer = option.isCorrect;

              let bgColor = 'bg-gray-50';
              let textColor = 'text-gray-700';
              let borderColor = 'border-gray-200';

              if (isCorrectAnswer) {
                bgColor = 'bg-green-100';
                textColor = 'text-green-800';
                borderColor = 'border-green-300';
              } else if (isUserAnswer && !isCorrectAnswer) {
                bgColor = 'bg-red-100';
                textColor = 'text-red-800';
                borderColor = 'border-red-300';
              }

              return (
                <div key={optionIndex} className={`p-3 rounded-lg border ${bgColor} ${borderColor}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${textColor}`}>{option.label}.</span>
                    <span className={textColor}>{option.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* Student Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Họ tên:</span>
              <span className="text-gray-900">{examInfo.studentName}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Ngày thi:</span>
              <span className="text-gray-900">{examInfo.examDate}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Điểm số:</span>
              <span className="text-gray-900">{examInfo.score}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Xếp hạng trong lớp:</span>
              <span className="text-gray-900">{examInfo.classRank}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Lớp:</span>
              <span className="text-gray-900">{examInfo.className}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Thời gian làm bài:</span>
              <span className="text-gray-900">{examInfo.duration}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Số câu đúng:</span>
              <span className="text-gray-900">{examInfo.correctAnswers}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-gray-700">Xếp hạng toàn kì thi:</span>
              <span className="text-gray-900">{examInfo.totalRank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Stats and Filters */}
      <div className="bg-white rounded-lg mb-4">
        <h2 className="text-lg font-bold">CHI TIẾT BÀI LÀM</h2>

        <div className="flex flex-wrap items-center gap-4 font-medium text-lg justify-between">
          <span className="text-gray-700">{stats.total} câu hỏi</span>
          <div className='flex gap-5'>

            <span className="text-green-600">Dễ: 0.2/ câu</span>
            <span className="text-yellow-600">Trung bình: 0.25/ câu</span>
            <span className="text-red-600">Khó: 0.4/ câu</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {getFilteredQuestions().map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))}
      </div>
    </div>
  );
};

const ExamCard = ({ exam, isCompleted = false }) => (
  <div className={`flex justify-between items-center p-6 rounded-lg border-l-4 ${isCompleted ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{exam.tenKiThi}</h3>
      <p className="text-gray-600 mb-4">Môn: {exam.tenMon}</p>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-green-600" />
          <span>{dayjs(exam.thoiGianVaoLamBai).format("DD/MM/YYYY HH:mm")}</span>
        </div>

        {!isCompleted && (
          <>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>{exam.thoiGianLamBaiThi} phút</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{10} câu</span>
            </div>
          </>
        )}

        {isCompleted && (
          <>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span>{exam.score}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-blue-600">{exam.rank}</span>
            </div>
          </>
        )}
      </div>
    </div>
    {isCompleted && (
      <Button icon={<FontAwesomeIcon icon={faEye} />}>
        Xem kết quả
      </Button>
    )}

    {!isCompleted && (
      <Button variant='solid' color='purple'>
        Vào thi
      </Button>
    )}
  </div>
);

const HocSinh_QuanLiKiThi = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('');
  const [kiThi, setKiThi] = useState<any>([])

  const kiThiDaDienRa = useMemo(function () {
    return kiThi.filter(i => dayjs(i.thoiGianVaoLamBai).isBefore(dayjs()))
  }, [kiThi])

  const kiThiSapDienRa = useMemo(function () {
    return kiThi.filter(i => dayjs(i.thoiGianVaoLamBai).add(i.thoiGianLamBaiThi, 'minutes').isAfter(dayjs(new Date())))
  }, [kiThi])

  console.log(kiThi)
  useEffect(function () {
    LayDanhSachKiThi().then(data => {
      console.log(data)
      setKiThi(data.data)
    })
  }, [location])


  const upcomingExams = [
    {
      id: 1,
      title: 'Thi giữa kỳ môn Toán rời rạc',
      subject: 'Toán rời rạc',
      date: '24/06/2025',
      time: '8:00',
      duration: '90 phút',
      questions: '60 câu'
    },
    {
      id: 2,
      title: 'Thi giữa kỳ Tiếng Nhật JLPT N3',
      subject: 'Tiếng Nhật',
      date: '24/06/2025',
      time: '10:00',
      duration: '90 phút',
      questions: '60 câu'
    }
  ];

  const completedExams = [
    {
      id: 1,
      title: 'Kiểm tra chương 4 Lý thuyết xác suất thống kê',
      subject: 'Lý thuyết xác suất thống kê',
      date: '24/06/2025',
      time: '8:00',
      score: '8.5/10 điểm',
      rank: 'Hạng: 15/60'
    },
    {
      id: 2,
      title: 'Kiểm tra lập trình cơ bản',
      subject: 'Nhập môn Công nghệ thông tin',
      date: '24/06/2025',
      time: '8:00',
      score: '9.0/10 điểm',
      rank: 'Hạng: 12/60'
    }
  ];

  return (
    <div className='p-10'>
      {/* Search Bar */}
      <Input.Search className="mb-8" />

      {/* Upcoming Exams Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Kỳ thi sắp diễn ra</h2>
        </div>

        <div className="flex flex-col gap-4">
          {kiThiSapDienRa.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>

      {/* Completed Exams Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Kỳ thi đã hoàn thành</h2>
        </div>

        <div className="space-y-4">
          {kiThiDaDienRa.map((exam) => (
            <ExamCard key={exam.id} exam={exam} isCompleted={true} />
          ))}
        </div>
      </div>

      <Modal width={1000} footer={[]}
        title="KIỂM TRA CHƯƠNG 4 LÝ THUYẾT XÁC SUẤT THỐNG KÊ ">
        <ExamResultDetail />
      </Modal>
    </div>
  );
};

export default HocSinh_QuanLiKiThi; 