import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Checkbox, Form, Input, InputNumber, message, Modal, Result, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { GetBoCauHoi } from '@/api/GiangVien/BoCauHoi';
import { GetCauHoi } from '@/api/GiangVien/CauHoi';
import { LayKiThiChiTiet, ThemCauHoiKiThi } from '@/api/GiangVien/KiThi';

const { Text } = Typography;
const { Option } = Select;

function ChiTietKiThiCauHoi() {
  const { idKiThi } = useParams()
  console.log({ idKiThi })
  const [kiThi, setKiThi] = useState({})
  const [boCauHoi, setBoCauHoi] = useState([])
  const [bch, setBCH] = useState()
  const [cauHoi, setCauHoi] = useState([])

  const [cauHoiForm, setCauHoiForm] = useState([])

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
      setBoCauHoi(result.data)
    })
  }, [kiThi])

  useEffect(function () {
    if (bch == null) return
    GetCauHoi(bch).then(result => {
      console.log(result)
      setCauHoi(result.data)
    })
  }, [bch])

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
            onClick={() => { }}>
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
                  <Button variant='text' color='blue' icon={<EyeOutlined />} onClick={() => { }} />
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

      <Modal open={addQuestionModal} width={1000} footer={[]}
        onCancel={() => setAddQuestionModal(false)}
        title={<p className='text-lg font-bold uppercase'>Thêm câu hỏi</p>}>
        <div className="mb-6">
          <Text strong className="block mb-2">
            Chọn bộ câu hỏi <span className="text-red-500">*</span>
          </Text>
          <Select placeholder="Chọn bộ câu hỏi" className="w-full"
            value={bch}
            onChange={value => setBCH(value)}
            options={boCauHoi.map((i: any) => ({ value: i.id, label: i.tenBoCauHoi }))} />
        </div>
        <hr className="my-6 border-gray-200" />
        <div className='flex flex-col gap-5'>
          {/* Câu hỏi 1 */}
          <div className='flex gap-5 items-center'>
            <div className='flex gap-2'>
              <p>Chọn tất cả</p>
              <Checkbox checked={cauHoiForm.length === cauHoi.length} value={true}
                onChange={(e: any) => {
                  setCauHoiForm(e.target.value ? cauHoi.map(i => i.id) : [])
                }} />
            </div>
            <Button variant='solid' color='blue' icon={<FontAwesomeIcon icon={faSave} />}
              onClick={async e => {
                const result = await ThemCauHoiKiThi(idKiThi, { danhSachCauHoi: cauHoiForm })
                  .then(e => {
                    setAddQuestionModal(false)
                  })
                console.log(result.data)

              }}>
              Lưu
            </Button>
          </div>
          {cauHoi.map((i: any, j: number) => (
            <Card >
              <div className='grid grid-cols-[auto_1fr] gap-5'>
                <Checkbox checked={cauHoiForm.includes(i.id)} value={i.id} onChange={e => {
                  const value = e.target.value as number
                  setCauHoiForm(e => {
                    if (e.includes(value)) return e.filter(i => i != value)
                    return [...e, value];
                  })
                  console.log(value)
                }} />
                <div>
                  <div className="flex items-center mb-4 gap-3">
                    <Text strong className="text-lg">{boCauHoi.find(i => i.id === bch)?.tenBoCauHoi}</Text>
                    <span className={[
                      "px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700",
                      i.doKho === 0 ? "bg-green-100 text-green-700" : i.doKho === 1 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                    ].join(' ')}>
                      {i.doKho === 0 ? "DỄ" : i.doKho === 1 ? "TRUNG BÌNH" : "KHÓ"}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                      {i.loaiCauHoi === 0 ? "CHỌN ĐÁP ÁN ĐÚNG NHẤT" : "CHỌN NHIỀU ĐÁP ÁN"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <Text strong className="text-base">
                      Câu {j + 1}: {i.noiDung}
                    </Text>
                  </div>

                  <div className="space-y-2">
                    {i.dapAn.map((_i: any, _j: any) => (
                      <div className={[
                        "w-full text-left p-3 rounded border",
                        _i.dungSai ? "bg-green-100 border-green-500 text-green-700" : "bg-gray-50 border-gray-300"
                      ].join(' ')}>
                        <div className="flex items-center gap-2">
                          <Text strong>{"ABCDEF"[_j]}.</Text>
                          <Text>{_i.noiDung}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Modal >
    </div >
  );
};

export default ChiTietKiThiCauHoi;