import { GetBoCauHoiById } from '@/api/GiangVien/BoCauHoi';
import { CapNhatCauHoi, GetCauHoi, ThemCauHoi, XoaCauHoi } from '@/api/GiangVien/CauHoi';
import { GetMonHocById } from '@/api/GiangVien/MonHoc';
import { withGiangVienRole } from '@/hoc/auth';

import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Checkbox, Col, Input, message, Modal, Radio, Row, Select, Statistic, Tag, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const { Text } = Typography;

type PageParam = {
  monHocId: string,
  boCauHoiId: string
}
type DapAn = {
  id: number | null,
  noiDung: string,
  dungSai: boolean,
  xoa: boolean
}
type CauHoi = {
  id: number | null,
  noiDung: string,
  loaiCauHoi: number,
  doKho: number,
  dapAn: DapAn[]
}
type MonHoc = {
  id: number | null,
  maMon: string | null,
  tenMon: string | null,
  thoiGianCapNhatCuoi: string | null,
  idGiangVien: number | null,
  nguoiTao: unknown | null,
  boCauHoi: unknown | null
}
type BoCauHoi = {
  id: number | null,
  tenBoCauHoi: string | null,
  thoiGianCapNhatCuoi: string | null,
  idMonHoc: number | null,
  tenMon: string | null,
  maMon: string | null,
}

const defaultFormValue: CauHoi = {
  id: null,
  noiDung: '',
  doKho: 0,
  loaiCauHoi: 0,
  dapAn: [
    // id < 0 = câu hỏi không trong csdl, id > 0 = câu hỏi trong csdl, 
    { id: -1, noiDung: '', dungSai: false, xoa: false },
    { id: -1, noiDung: '', dungSai: false, xoa: false }
  ]
}

type CauHoiFormProps = {
  tenBoCauHoi: string | undefined,
  formValue: CauHoi | undefined,
  setFormValue: (input: CauHoi | ((prevState: CauHoi) => CauHoi)) => unknown | undefined,
  onSubmit: (input: unknown | undefined) => void | Promise<void> | undefined,
  onCancel: () => void | undefined
}
function CauHoiForm({ tenBoCauHoi, formValue, setFormValue, onSubmit, onCancel }: CauHoiFormProps) {
  // const [questionType, setQuestionType] = useState<'multiple' | 'single'>('single')

  // useEffect(function () {
  //   if (formValue == null) return;

  //   if (formValue?.dapAn.reduce((acc, i) => i.dungSai ? acc + 1 : acc, 0) > 1) setQuestionType('multiple')
  //   else setQuestionType('single')
  // }, [formValue])

  return (
    <div className="space-y-4">
      {/* Bộ câu hỏi */}
      <div>
        <Text className="block mb-2 text-sm font-medium text-gray-700">
          Bộ câu hỏi <span className="text-red-500">*</span>
        </Text>
        <div className="bg-gray-100 px-3 py-2 rounded text-sm text-gray-600">
          {tenBoCauHoi}
        </div>
      </div>

      {/* Chọn mức độ và loại câu hỏi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text className="block mb-2 text-sm font-medium text-gray-700">
            Chọn mức độ câu hỏi <span className="text-red-500">*</span>
          </Text>
          <Select placeholder="Dễ" className="w-full"
            value={formValue?.doKho}
            onChange={(value) => setFormValue(val => ({ ...val, doKho: value }))}
            options={[
              { value: 0, label: 'Dễ' },
              { value: 1, label: 'Trung bình' },
              { value: 2, label: 'Khó' }
            ]} />
        </div>
        <div>
          <Text className="block mb-2 text-sm font-medium text-gray-700">
            Chọn loại câu hỏi <span className="text-red-500">*</span>
          </Text>
          <Select placeholder="Chọn đáp án đúng nhất" className="w-full"
            value={formValue?.loaiCauHoi}
            onChange={value => {
              setFormValue(val => ({
                ...val,
                loaiCauHoi: value,
                dapAn: val.dapAn.map(item => ({ ...item, dungSai: false }))
              }))
            }}
            options={[
              { value: 0, label: 'Chọn đáp án đúng nhất' },
              { value: 1, label: 'Chọn nhiều đáp án' },
            ]} />
        </div>
      </div>

      {/* Nội dung câu hỏi */}
      <div>
        <Text className="block mb-2 text-sm font-medium text-gray-700">
          Nội dung câu hỏi <span className="text-red-500">*</span>
        </Text>
        <TextArea placeholder="Nhập nội dung câu hỏi..." rows={4} className="w-full"
          value={formValue?.noiDung}
          onChange={(e) => setFormValue(val => ({ ...val, noiDung: e.target.value }))} />
      </div>

      {/* Đáp án */}
      <div className="flex items-center justify-between mb-2">
        <Text className="text-sm font-medium text-gray-700">
          Đáp án <span className="text-red-500">*</span>
        </Text>
        <Button variant='solid' color='green' icon={<PlusOutlined />}
          disabled={formValue != null && formValue?.dapAn?.length >= 5}
          onClick={() => setFormValue(val => ({
            ...val,
            dapAn: [
              ...val.dapAn,
              { id: -1, noiDung: '', dungSai: false, xoa: false }
            ]
          }))}>
          Thêm đáp án
        </Button>
      </div>

      <div className="space-y-3">
        {formValue?.dapAn?.map((answer, index) => (
          (!answer.xoa) && <div key={index} className="flex items-center gap-5">
            {formValue.loaiCauHoi === 0
              ? <Radio
                checked={answer.dungSai}
                onChange={() => {
                  setFormValue(val => ({
                    ...val,
                    dapAn: val.dapAn.map((item, idx) => ({ ...item, dungSai: idx === index ? true : false }))
                  }))
                }} />
              : <Checkbox checked={answer.dungSai}
                onChange={() => {
                  setFormValue(val => ({
                    ...val,
                    dapAn: val.dapAn.map((item, idx) => ({ ...item, dungSai: idx === index ? !item.dungSai : item.dungSai }))
                  }))
                }} />}
            <Input placeholder={`Đáp án ${index + 1}`} value={answer.noiDung}
              onChange={(e) => setFormValue(val => ({
                ...val,
                dapAn: val.dapAn.map((item, idx) => idx === index ? { ...item, noiDung: e.target.value } : item)
              }))} />

            <Button variant='text' color='red' icon={<DeleteOutlined />}
              disabled={formValue.dapAn.length === 2}
              onClick={() => setFormValue(val => ({
                ...val,
                dapAn: val.dapAn
                  .filter((_: DapAn, idx: number) => _.id && (_.id > 0 || (_.id < 0 && idx !== index)))
                  .map((_, idx) => idx !== index ? _ : { ..._, xoa: true })
              }))} />
          </div>

        ))}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button onClick={() => onCancel()}>
          Hủy
        </Button>
        <Button variant='solid' color='purple' onClick={async () => {
          if (formValue == null) return message.error('Vui lòng nhập thông tin câu hỏi!')
          if (formValue.loaiCauHoi === 0 && formValue.dapAn.filter(item => item.dungSai).length != 1) return message.error('Vui lòng chọn đúng 1 đáp án!')
          if (formValue.loaiCauHoi === 1 && formValue.dapAn.filter(item => item.dungSai).length == 0) return message.error('Vui lòng chọn ít nhất 1 đáp án!')
          if (formValue.noiDung.length == 0) return message.error('Vui lòng nhập nội dung câu hỏi!')
          if (formValue.dapAn.filter(item => item.noiDung.length == 0).length > 0) return message.error('Vui lòng nhập nội dung đáp án!')

          await onSubmit(undefined)
        }}>
          Xác nhận
        </Button>
      </div>
    </div>
  )
}

function Element() {
  const { monHocId, boCauHoiId }: PageParam = useParams() as PageParam

  const [modal, setModal] = useState<'add' | 'update' | ''>('')
  const [addForm, setAddForm] = useState<CauHoi>({ ...defaultFormValue })
  const [editForm, setEditForm] = useState<CauHoi>({ ...defaultFormValue })

  const [monHoc, setMonHoc] = useState<MonHoc>()
  const [boCauHoi, setBoCauHoi] = useState<BoCauHoi>()
  const [cauHoi, setCauHoi] = useState<CauHoi[]>([])

  const [searchText, setSearchText] = useState('');

  useEffect(function () {
    GetMonHocById(+monHocId).then(result => {
      setMonHoc(result.data[0])
    })
    GetBoCauHoiById(+monHocId, +boCauHoiId).then(result => {
      setBoCauHoi(result.data[0])
    })

    GetCauHoi(+boCauHoiId).then(result => {
      setCauHoi(result.data)
    })
  }, [boCauHoiId, monHocId])

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty == 0) return 'green';
    if (difficulty == 1) return 'orange';
    if (difficulty == 2) return 'red';
    return 'blue';
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
                { title: <Link to={"/giang-vien/mon-hoc/" + monHocId} className='text-xl'>{monHoc?.tenMon}</Link>, },
                { title: <p className='text-xl'>{boCauHoi?.tenBoCauHoi}</p>, },
              ]} />
            <Text className="text-gray-600">
              Cập nhật lần cuối: {new Date(boCauHoi?.thoiGianCapNhatCuoi as string).toLocaleDateString('vi-VN')}
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
              <Select className="w-full" placeholder="Tất cả loại câu hỏi"
                options={[
                  { value: 'multiple', label: 'Chọn nhiều đáp án' },
                  { value: 'single', label: 'Chọn đáp án đúng nhất' },
                ]} />
            </Col>
            <Col span={8}>
              <Select className="w-full" placeholder="Tất cả mức độ"
                options={[
                  { value: 0, label: 'Dễ' },
                  { value: 1, label: 'Trung bình' },
                  { value: 2, label: 'Khó' }
                ]} />
            </Col>
          </Row>

          <div className="flex justify-end space-x-2">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModal('add')}>
              Thêm câu hỏi
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Nhập từ file
            </Button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 flex flex-col gap-3">
          {cauHoi?.map((question, index) => (
            <Card key={question.id} className="shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <Text strong className="text-blue-600">{boCauHoi?.tenBoCauHoi}</Text>
                  <Tag color={getDifficultyColor(question.doKho)}>
                    {question.doKho === 0 ? 'Dễ' : question.doKho === 1 ? 'Trung bình' : 'Khó'}
                  </Tag>
                  <Tag color={question.loaiCauHoi === 0 ? "blue" : "gold"}>
                    {question.loaiCauHoi === 0 ? "Chọn đáp án đúng nhất" : "Chọn nhiều đáp án"}
                  </Tag>
                </div>
                <div className="flex space-x-1">
                  <Button type="text" icon={<EditOutlined />} size="small"
                    onClick={() => {
                      setEditForm({
                        id: question.id,
                        noiDung: question.noiDung,
                        doKho: question.doKho,
                        dapAn: question.dapAn,
                        loaiCauHoi: question.loaiCauHoi
                      })
                      setModal('update')
                    }} />
                  <Button type="text" icon={<DeleteOutlined />} size="small" danger
                    onClick={async () => {
                      await XoaCauHoi(+boCauHoiId, question.id as number).then(result => {
                        setCauHoi(result.data)
                        message.success('Xóa câu hỏi thành công!')
                      }).catch(err => message.error(err.message))
                    }} />
                </div>
              </div>

              <p className="block mb-3 font-bold">
                Câu {index + 1}: {question.noiDung}
              </p>

              <div className="space-y-2">
                {question.dapAn?.map((option, i) => (
                  <div key={i}
                    className={[
                      `p-3 rounded-lg border`,
                      option.dungSai ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-400'
                    ].join(' ')}>
                    <p>
                      <span className="font-medium mr-2">{"ABCDE"[i]}.</span>
                      {option.noiDung}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={modal === 'add'} footer={null} width={600}
        onCancel={() => {
          setModal('')
          setAddForm({ ...defaultFormValue })
        }}
        title={<span className="text-lg font-medium text-gray-700">THÊM CÂU HỎI</span>}>
        <CauHoiForm formValue={addForm} setFormValue={setAddForm} tenBoCauHoi={boCauHoi?.tenBoCauHoi as string}
          onCancel={() => {
            setModal('')
            setAddForm({ ...defaultFormValue })
          }}
          onSubmit={async () => {
            const input: object = {
              doKho: addForm.doKho,
              noiDung: addForm.noiDung,
              loaiCauHoi: addForm.loaiCauHoi,
              dapAn: addForm.dapAn.map(item => ({
                dungSai: item.dungSai,
                noiDung: item.noiDung
              }))
            }
            await ThemCauHoi(+boCauHoiId, input as object).then(result => {
              setCauHoi(result.data)
              message.success('Thêm câu hỏi thành công!')
              setModal('')
            }).catch(err => message.error(err.message))
            setAddForm({ ...defaultFormValue })
          }} />
      </Modal >

      <Modal open={modal === 'update'} footer={null} width={600} closable
        onCancel={() => {
          setModal('')
          setAddForm({ ...defaultFormValue })
        }}
        title={<span className="text-lg font-medium text-gray-700">SỬA CÂU HỎI</span>}>
        <CauHoiForm formValue={editForm} setFormValue={setEditForm} tenBoCauHoi={boCauHoi?.tenBoCauHoi as string}
          onCancel={() => {
            setModal('')
            setEditForm({ ...defaultFormValue })
          }}
          onSubmit={async () => {
            const input: object = {
              id: editForm.id,
              doKho: editForm.doKho,
              noiDung: editForm.noiDung,
              loaiCauHoi: editForm.loaiCauHoi,
              dapAn: editForm.dapAn.map(item => ({
                id: item.id,
                dungSai: item.dungSai,
                noiDung: item.noiDung,
                xoa: item.xoa ? true : false
              }))
            }
            console.log(JSON.stringify(input, null, 2))
            await CapNhatCauHoi(+boCauHoiId, input as object).then(result => {
              setCauHoi(result.data)
              message.success('Cập nhật câu hỏi thành công!')
              setModal('')
            }).catch(err => message.error(err.message))

          }} />
      </Modal >
    </>
  );
}

const GiangVien_ChiTietBoCauHoi = withGiangVienRole(Element)

export default GiangVien_ChiTietBoCauHoi