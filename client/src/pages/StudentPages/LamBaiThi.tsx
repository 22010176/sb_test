import { Book, ChevronLeft, ChevronRight, Clock, FileText, Flag, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const LamBaiThi = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('A');
  const [timeLeft, setTimeLeft] = useState(3910); // 1:05:10 in seconds
  const [answers, setAnswers] = useState({});

  // Timer countdown
  useEffect(() => {
    // const timer = setInterval(() => {
    //   setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    // }, 1000);

    // return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const examData = {
    title: 'THI CUỐI KÌ MÔN XÁC SUẤT THỐNG KÊ',
    subject: 'Xác suất thống kê',
    student: 'Nguyễn Văn An',
    totalQuestions: 20,
    answered: 4,
    notAnswered: 16,
    marked: 0
  };

  const questions = [
    {
      id: 4,
      question: 'Trong hộp có 10 viên bi cùng kích cỡ, được đánh số từ 1 đến 10. Lấy ngẫu nhiên trong hộp ra 1 viên bi. Xác suất để số viết trên viên bi lấy ra không vượt quá 10.',
      options: [
        { label: 'A', value: '0.2' },
        { label: 'B', value: '0.1' },
        { label: 'C', value: '0.25' },
        { label: 'D', value: '0.3' }
      ]
    }
  ];

  const handleAnswerSelect = (answer) => {
    // setSelectedAnswer(answer);
    // setAnswers(prev => ({
    //   ...prev,
    //   [currentQuestion]: answer
    // }));
  };

  const handleNext = () => {
    // if (currentQuestion < examData.totalQuestions - 1) {
    //   setCurrentQuestion(prev => prev + 1);
    //   setSelectedAnswer(answers[currentQuestion + 1] || null);
    // }
  };

  const handlePrevious = () => {
    // if (currentQuestion > 0) {
    //   setCurrentQuestion(prev => prev - 1);
    //   setSelectedAnswer(answers[currentQuestion - 1] || null);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{examData.title}</h1>
              <p className="text-sm text-gray-600">Học phần: {examData.subject}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-mono">{formatTime(timeLeft)}</span>
            </div>

            <div className="flex items-center gap-2 text-green-600">
              <FileText className="w-5 h-5" />
              <span>Nộp bài</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <span>{examData.student}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Question Progress */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Câu {questions[0].id} / {examData.totalQuestions}</span>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Danh sách câu</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600">Đã trả lời: {examData.answered}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600">Chưa trả lời: {examData.notAnswered}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-orange-600">Đánh dấu: {examData.marked}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Câu {questions[0].id}:</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Flag className="w-4 h-4" />
              <span>Đánh dấu</span>
            </button>
          </div>

          <p className="text-gray-800 mb-6 leading-relaxed">
            {questions[0].question}
          </p>

          <div className="space-y-3">
            {questions[0].options.map((option, index) => {
              const isSelected = selectedAnswer === option.label;
              const isCorrect = option.label === 'A'; // Assuming A is correct for demo

              return (
                <div
                  key={option.label}
                  className={`relative p-4 rounded-lg border cursor-pointer transition-all ${isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  onClick={() => handleAnswerSelect(option.label)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                      }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700">{option.label}.</span>
                    <span className="text-gray-800">{option.value}</span>
                  </div>

                  {/* Left border for selected answer */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${currentQuestion === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Câu trước
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestion === examData.totalQuestions - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${currentQuestion === examData.totalQuestions - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Câu tiếp
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LamBaiThi;