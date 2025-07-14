import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';

import { CheckCircleOutlined } from '@ant-design/icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from 'antd';
import { useParams } from 'react-router';
import { LayKiThiChiTiet } from '@/api/GiangVien/KiThi';
import { GetBoCauHoi } from '@/api/GiangVien/BoCauHoi';

const { Text } = Typography;
const { Option } = Select;

function ChiTietKiThiCauHoi() {
  const { idKiThi } = useParams()
  console.log({ idKiThi })
  const [kiThi, setKiThi] = useState({})

  const [addQuestionModal, setAddQuestionModal] = useState(false)

  const [questionSets, setQuestionSets] = useState([
    { id: 1, title: 'I. Lý thuyết tổ hợp', easy: 15, medium: 10, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
    { id: 2, title: 'II. Lý thuyết đồ thị', easy: 15, medium: 5, hard: 5 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSet, setEditingSet] = useState(null);
  const [form] = Form.useForm();

  const totalQuestions = questionSets.reduce((sum, set) => sum + set.easy + set.medium + set.hard, 0);

  useEffect(function () {
    LayKiThiChiTiet(+(idKiThi ?? 0)).then(async function (result) {
      setKiThi(result.data)
    })
  }, [idKiThi])

  useEffect(function () {
    if (!kiThi.idMonHoc) return;
    GetBoCauHoi(+(kiThi as any).idMonHoc).then(function (result) {
      console.log(result)
    })
  }, [kiThi])
  console.log(kiThi)
  const handleEditSet = (set: any) => {
    setEditingSet(set);
    form.setFieldsValue(set);
    setIsModalVisible(true);
  };

  const handleDeleteSet = (id: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bộ đề này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setQuestionSets(questionSets.filter(set => set.id !== id));
        message.success('Đã xóa bộ đề thành công');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingSet) {
        setQuestionSets(questionSets.map(set =>
          set.id === editingSet.id ? { ...set, ...values } : set
        ));
        message.success('Đã cập nhật bộ đề thành công');
      } else {
        const newSet = {
          id: Math.max(...questionSets.map(s => s.id)) + 1,
          ...values
        };
        setQuestionSets([...questionSets, newSet]);
        message.success('Đã thêm bộ đề thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-10 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tổng số lượng câu hỏi: {totalQuestions}
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='solid' color='blue' icon={<PlusOutlined />}
            onClick={() => setAddQuestionModal(true)}>
            Thêm câu hỏi
          </Button>
          <Button variant='solid' color='green' icon={<FontAwesomeIcon icon={faPen} />}
            onClick={() => setAddQuestionModal(true)}>
            Sửa cấu hình
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 space-y-4">
        {questionSets.map((set) => (
          <Card key={set.id} className="shadow-sm">
            <div className="flex flex-col justify-between items-start">

              <div className='flex justify-between w-full items-center'>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {set.title}
                </h3>
                <div className="flex gap-2 ml-4">
                  <Button variant='text' color='blue' icon={<EyeOutlined />} onClick={() => {

                  }} />
                  <Button variant='text' color='green' icon={<EditOutlined />} onClick={() => handleEditSet(set)} />
                  <Button variant='text' color='red' icon={<DeleteOutlined />} onClick={() => handleDeleteSet(set.id)} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <div className="text-sm text-green-600 font-medium">Dễ</div>
                  <div className="text-lg font-bold text-green-700">{set.easy} Câu</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <div className="text-sm text-yellow-600 font-medium">Trung bình</div>
                  <div className="text-lg font-bold text-yellow-700">{set.medium} câu</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <div className="text-sm text-red-600 font-medium">Khó</div>
                  <div className="text-lg font-bold text-red-700">{set.hard} câu</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal cancelText="Hủy" className="top-20"
        title={editingSet ? 'Chỉnh sửa bộ đề' : 'Thêm bộ đề mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingSet ? 'Cập nhật' : 'Thêm'}>
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item label="Tiêu đề bộ đề" name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bộ đề!' }]}>
            <Input placeholder="Nhập tiêu đề bộ đề" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Số câu dễ" name="easy"
              rules={[{ required: true, message: 'Vui lòng nhập số câu dễ!' }]}>
              <InputNumber min={0} placeholder="0" className="w-full" />
            </Form.Item>

            <Form.Item label="Số câu trung bình" name="medium"
              rules={[{ required: true, message: 'Vui lòng nhập số câu trung bình!' }]}>
              <InputNumber min={0} placeholder="0" className="w-full" />
            </Form.Item>

            <Form.Item label="Số câu khó" name="hard"
              rules={[{ required: true, message: 'Vui lòng nhập số câu khó!' }]}>
              <InputNumber min={0} placeholder="0" className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal open={addQuestionModal} width={1000}
        onCancel={() => setAddQuestionModal(false)}
        title={<p className='text-lg font-bold uppercase'>Thêm câu hỏi</p>}>
        <div className="mb-6">
          <Text strong className="block mb-2">
            Chọn bộ câu hỏi <span className="text-red-500">*</span>
          </Text>
          <Select placeholder="Chọn bộ câu hỏi" className="w-full">
            <Option value="set1">Bộ câu hỏi 1</Option>
            <Option value="set2">Bộ câu hỏi 2</Option>
            <Option value="set3">Bộ câu hỏi 3</Option>
          </Select>
        </div>
        <hr className="my-6 border-gray-200" />
        <div className='flex flex-col gap-5'>
          {/* Câu hỏi 1 */}
          <Card>
            <div className="flex items-center mb-4 gap-3">
              <Text strong className="text-lg">I. Lý thuyết tổ hợp</Text>
              <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                DỄ
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                CHỌN ĐÁP ÁN ĐÚNG NHẤT
              </span>
            </div>

            <div className="mb-4">
              <Text strong className="text-base">
                Câu 1: Cho 2 tập A, B với |A|=13,|B|=19,|A∩B|=1. |A∪B| là:
              </Text>
            </div>

            <div className="space-y-2">
              <div className="w-full text-left p-3 rounded border bg-gray-50 border-gray-300 hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Text strong>A.</Text>
                  <Text>12</Text>
                </div>
              </div>

              <div className="w-full text-left p-3 rounded border bg-gray-50 border-gray-300 hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Text strong>B.</Text>
                  <Text>32</Text>
                </div>
              </div>

              <div className="w-full text-left p-3 rounded border bg-green-100 border-green-500 text-green-700">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text strong>C.</Text>
                  <Text>31</Text>
                </div>
              </div>

              <div className="w-full text-left p-3 rounded border bg-gray-50 border-gray-300 hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Text strong>D.</Text>
                  <Text>18</Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Câu hỏi 2 */}
          {/* <Card>
            <div className="flex items-center mb-4 gap-3">
              <Text strong className="text-lg">I. Lý thuyết tổ hợp</Text>
              <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                TRUNG BÌNH
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                CHỌN NHIỀU ĐÁP ÁN
              </span>
            </div>

            <div className="mb-4">
              <Text strong className="text-base">
                Câu 2: Một nhóm có 5 bạn: An, Bình, Cường, Duyên và Hoa. Người ta cần chọn ra 2 bạn để tham gia một trò chơi. Trong các phương án sau, đâu là phát biểu đúng về cách chọn?
              </Text>
            </div>

            <div className="space-y-2">
              <div className="w-full text-left p-3 rounded border bg-green-100 border-green-500 text-green-700">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text strong>A.</Text>
                  <Text>Nếu chọn An rồi Bình là một cách, chọn Bình rồi An là một cách khác.</Text>
                </div>
              </div>

              <div className="w-full text-left p-3 rounded border bg-gray-50 border-gray-300 hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Text strong>B.</Text>
                  <Text>Nếu chọn An rồi Bình là một cách, chọn Bình rồi An là một cách khác.</Text>
                </div>
              </div>

              <div className="w-full text-left p-3 rounded border bg-green-100 border-green-500 text-green-700">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text strong>C.</Text>
                  <Text>Việc chọn 2 bạn để tham gia trò chơi là tổ hợp, không quan tâm đến thứ tự.</Text>
                </div>
              </div>

              <div className="w-full text-left p-3 rounded border bg-gray-50 border-gray-300 hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Text strong>D.</Text>
                  <Text>Có 20 cách để chọn 2 bạn từ nhóm trên.</Text>
                </div>
              </div>
            </div>
          </Card> */}
        </div>
      </Modal >
    </div >
  );
};

export default ChiTietKiThiCauHoi;