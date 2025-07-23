import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Checkbox, Form, InputNumber, message, Modal, Select, Slider, Typography, type SliderSingleProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { GetBoCauHoi } from '@/api/GiangVien/BoCauHoi';
import { GetCauHoi } from '@/api/GiangVien/CauHoi';
import { LayCauHinhCauHoi, LayDanhSachCauHoi, LayKiThiChiTiet, TaoCauHinhDethi, ThemCauHoiKiThi } from '@/api/GiangVien/KiThi';

const { Text } = Typography;

const marks: SliderSingleProps['marks'] = { 0: '0.0', 1: '1.0', 2: '2.0', 3: '3.0', 4: '4.0', 5: '5.0', 6: '6.0', 7: '7.0', 8: '8.0', 9: '9.0', 10: '10.0' };


function ChiTietKiThiCauHoi() {
  const { idKiThi } = useParams()

  const [kiThi, setKiThi] = useState({})

  const [boCauHoi, setBoCauHoi] = useState([])
  const [bch, setBCH] = useState()

  const [cauHoi, setCauHoi] = useState([])
  const [cauHoiForm, setCauHoiForm] = useState([])

  const [addQuestionModal, setAddQuestionModal] = useState(false)
  const [cauHinhModal, setCauHinhModal] = useState(false);
  const [questionSets, setQuestionSets] = useState([]);

  const [cauHinh, setCauHinh] = useState({ soCauDe: 0, soCauTB: 0, soCauKho: 0, pointDe: 0, pointTB: 0, pointKho: 0 })
  const [phoDiem, setPhoDiem] = useState({ pointDe: 0, pointTB: 0, pointKho: 0 });

  const tongSoCau = useMemo(function () {
    const result = { soCauDe: 0, soCauTB: 0, soCauKho: 0 }
    for (const i of questionSets as any) {
      result.soCauDe += i.cauHoi?.reduce((acc: number, j: any) => acc + (j.doKho === 0 ? 1 : 0), 0)
      result.soCauTB += i.cauHoi?.reduce((acc: number, j: any) => acc + (j.doKho === 1 ? 1 : 0), 0)
      result.soCauKho += i.cauHoi?.reduce((acc: number, j: any) => acc + (j.doKho === 2 ? 1 : 0), 0)
    }
    return result
  }, [questionSets])

  const [form] = Form.useForm();

  useEffect(function () {
    LayKiThiChiTiet(+(idKiThi ?? 0)).then(async function (result) {
      setKiThi(result.data)
    })

    LayCauHinhCauHoi(+(idKiThi ?? 0)).then(function (result) {
      setCauHinh({
        soCauDe: result.data[0].soCauHoiTrongDe,
        soCauTB: result.data[1].soCauHoiTrongDe,
        soCauKho: result.data[2].soCauHoiTrongDe,
        pointDe: result.data[0].tongDiem,
        pointTB: result.data[1].tongDiem,
        pointKho: result.data[2].tongDiem
      })
    })
  }, [idKiThi])

  useEffect(function () {
    if (!kiThi.idMonHoc) return;
    GetBoCauHoi(+(kiThi as any).idMonHoc).then(function (result) {
      setBoCauHoi(result.data)
    })

    LayDanhSachCauHoi(+(kiThi as any).id).then(function (result) {
      console.log(result.data[0])
      setQuestionSets(result.data[0].boCauHoi)
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
    // setEditingSet(set);
    form.setFieldsValue(set);
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
      console.log(values, phoDiem);
      const soCauHoi = Object.values(values)
      const _phoDiem = Object.values(phoDiem)
      console.log(soCauHoi, _phoDiem)

      let input = []
      for (let i = 0; i < soCauHoi.length; i++) {
        input.push({
          doKho: i,
          soCauHoiTrongDe: soCauHoi[i],
          tongDiem: _phoDiem[i]
        })
      }
      TaoCauHinhDethi(+(idKiThi ?? 0), input).then(function (result) {
        console.log(result)
        message.success('Đã cập nhật cấu hình đề thi thành công');
        setCauHinhModal(false)

        LayCauHinhCauHoi(+(idKiThi ?? 0)).then(function (result) {
          setCauHinh({
            soCauDe: result.data[0].soCauHoiTrongDe,
            soCauTB: result.data[1].soCauHoiTrongDe,
            soCauKho: result.data[2].soCauHoiTrongDe,
            pointDe: result.data[0].tongDiem,
            pointTB: result.data[1].tongDiem,
            pointKho: result.data[2].tongDiem
          })
        })
      })
      console.log(input)
      // if (editingSet) {
      //   setQuestionSets(questionSets?.map((set: any) => set.id === editingSet.id ? { ...set, ...values } : set));
      //   message.success('Đã cập nhật bộ đề thành công');
      // } else {
      //   const newSet = {
      //     id: Math.max(...questionSets.map(s => s.id)) + 1,
      //     ...values
      //   };
      //   setQuestionSets([...questionSets, newSet]);
      //   message.success('Đã thêm bộ đề thành công');
      // }
      form.resetFields();
    });
  };

  return (
    <div className="p-10 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tổng số lượng câu hỏi: {tongSoCau.soCauDe + tongSoCau.soCauTB + tongSoCau.soCauKho} câu
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='solid' color='blue' icon={<PlusOutlined />}
            onClick={() => setAddQuestionModal(true)}>
            Thêm câu hỏi
          </Button>
          <Button variant='solid' color='green' icon={<FontAwesomeIcon icon={faPen} />}
            onClick={() => {
              setCauHinhModal(true)
              setPhoDiem({
                pointDe: cauHinh.pointDe,
                pointTB: cauHinh.pointTB,
                pointKho: cauHinh.pointKho
              })
              form.setFieldsValue({
                soCauDe: Math.min(cauHinh.soCauDe, tongSoCau.soCauDe),
                soCauTB: Math.min(cauHinh.soCauTB, tongSoCau.soCauTB),
                soCauKho: Math.min(cauHinh.soCauKho, tongSoCau.soCauKho)
              })
            }}>
            Sửa cấu hình
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 space-y-4">
        {questionSets.map((set: any, j: number) => (
          <Card key={set.id} className="shadow-sm">
            <div className="flex flex-col justify-between items-start">

              <div className='flex justify-between w-full items-center'>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {set.tenBoCauHoi}
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
                  <div className="text-lg font-bold text-green-700">{set.cauHoi.reduce((acc, i) => acc + (i.doKho === 0 ? 1 : 0), 0)} Câu</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <div className="text-sm text-yellow-600 font-medium">Trung bình</div>
                  <div className="text-lg font-bold text-yellow-700">{set.cauHoi.reduce((acc, i) => acc + (i.doKho === 1 ? 1 : 0), 0)} câu</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <div className="text-sm text-red-600 font-medium">Khó</div>
                  <div className="text-lg font-bold text-red-700">{set.cauHoi.reduce((acc, i) => acc + (i.doKho === 2 ? 1 : 0), 0)} câu</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal cancelText="Hủy" width={800}
        okText='Cập nhật'
        title="Cập nhật cấu hình đề thi"
        open={cauHinhModal}
        onOk={handleModalOk}
        onCancel={() => {
          setCauHinhModal(false)
          form.resetFields()
          setPhoDiem({ pointDe: 0, pointTB: 0, pointKho: 0 })
        }}>
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label={`Số câu dễ (${tongSoCau.soCauDe} câu)`} name="soCauDe"
              rules={[{ required: true, message: 'Vui lòng nhập số câu dễ!' }]}>
              <InputNumber min={tongSoCau.soCauDe == 0 ? 0 : 1} max={tongSoCau.soCauDe} placeholder={tongSoCau.soCauDe + ""} className="w-full" />
            </Form.Item>

            <Form.Item label={`Số câu trung bình (${tongSoCau.soCauTB} câu)`} name="soCauTB"
              rules={[{ required: true, message: 'Vui lòng nhập số câu trung bình!' }]}>
              <InputNumber min={tongSoCau.soCauTB == 0 ? 0 : 1} max={tongSoCau.soCauTB} placeholder={tongSoCau.soCauTB + ""} className="w-full" />
            </Form.Item>

            <Form.Item label={`Số câu khó (${tongSoCau.soCauKho} câu)`} name="soCauKho"
              rules={[{ required: true, message: 'Vui lòng nhập số câu khó!' }]}>
              <InputNumber min={tongSoCau.soCauKho == 0 ? 0 : 1} max={tongSoCau.soCauKho} placeholder={tongSoCau.soCauKho + ""} className="w-full" />
            </Form.Item>

            <Form.Item label="Phổ điểm dễ" className='col-span-3'>
              <Slider step={1} marks={marks} min={0} max={10}
                value={phoDiem.pointDe}
                onChange={value => {
                  if (value + phoDiem.pointTB + phoDiem.pointKho == 10)
                    return setPhoDiem(val => ({ ...val, pointDe: value }))

                  let _pointKho = 10 - value - phoDiem.pointTB
                  if (_pointKho < 0) _pointKho = 0

                  let _pointTB = _pointKho == 0 ? 10 - value - _pointKho : phoDiem.pointTB
                  if (_pointTB < 0) {
                    _pointTB = 0
                    value = 10
                  }

                  setPhoDiem({
                    pointDe: value,
                    pointTB: _pointTB,
                    pointKho: _pointKho
                  })
                }} />
            </Form.Item>
            <Form.Item label="Phổ điểm trung bình" className='col-span-3'>
              <Slider step={1} marks={marks} min={0} max={10}
                value={phoDiem.pointTB}
                onChange={value => {
                  if (value + phoDiem.pointDe + phoDiem.pointKho == 10)
                    return setPhoDiem(val => ({ ...val, pointTB: value }))

                  let _pointKho = 10 - value - phoDiem.pointDe
                  if (_pointKho < 0) _pointKho = 0

                  let _pointDe = _pointKho == 0 ? 10 - value - _pointKho : phoDiem.pointDe
                  if (_pointDe < 0) {
                    _pointDe = 0
                    value = 10
                  }

                  setPhoDiem({
                    pointDe: _pointDe,
                    pointTB: value,
                    pointKho: _pointKho
                  })
                }} />
            </Form.Item>
            <Form.Item label="Phổ điểm khó" className='col-span-3'>
              <Slider step={1} marks={marks} min={0} max={10}
                value={phoDiem.pointKho}
                onChange={value => {
                  if (value + phoDiem.pointDe + phoDiem.pointTB == 10)
                    return setPhoDiem(val => ({ ...val, pointKho: value }))

                  let _pointDe = 10 - value - phoDiem.pointTB
                  if (_pointDe < 0) _pointDe = 0

                  let _pointTB = _pointDe == 0 ? 10 - value - _pointDe : phoDiem.pointTB
                  if (_pointTB < 0) {
                    _pointTB = 0
                    value = 10
                  }

                  setPhoDiem({
                    pointDe: _pointDe,
                    pointTB: _pointTB,
                    pointKho: value
                  })
                }} />
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
                  setCauHoiForm(e.target?.value ? cauHoi.map((i: any) => i.id) : [])
                }} />
            </div>
            <Button variant='solid' color='blue' icon={<FontAwesomeIcon icon={faSave} />}
              onClick={async e => {
                const result = await ThemCauHoiKiThi(idKiThi, { danhSachCauHoi: cauHoiForm })
                  .then(e => setAddQuestionModal(false))
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
                  setCauHoiForm((e: any) => {
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