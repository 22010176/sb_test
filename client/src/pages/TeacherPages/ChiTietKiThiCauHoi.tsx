import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { useState } from 'react';

const ChiTietKiThiCauHoi = () => {
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

  const handleAddSet = () => {
    setEditingSet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditSet = (set) => {
    setEditingSet(set);
    form.setFieldsValue(set);
    setIsModalVisible(true);
  };

  const handleDeleteSet = (id) => {
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSet}>
          Thêm bộ đề
        </Button>
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

      {/* Modal for Add/Edit */}
      <Modal
        title={editingSet ? 'Chỉnh sửa bộ đề' : 'Thêm bộ đề mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingSet ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
        className="top-20"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            label="Tiêu đề bộ đề"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bộ đề!' }]}
          >
            <Input placeholder="Nhập tiêu đề bộ đề" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label="Số câu dễ"
              name="easy"
              rules={[{ required: true, message: 'Vui lòng nhập số câu dễ!' }]}
            >
              <InputNumber
                min={0}
                placeholder="0"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Số câu trung bình"
              name="medium"
              rules={[{ required: true, message: 'Vui lòng nhập số câu trung bình!' }]}
            >
              <InputNumber
                min={0}
                placeholder="0"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Số câu khó"
              name="hard"
              rules={[{ required: true, message: 'Vui lòng nhập số câu khó!' }]}
            >
              <InputNumber
                min={0}
                placeholder="0"
                className="w-full"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ChiTietKiThiCauHoi;