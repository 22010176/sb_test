import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { faClipboard, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table, type FormInstance } from 'antd';
import { useEffect, useState, type Dispatch } from 'react';
import { useNavigate } from 'react-router';

import { CapNhatLopHoc, CreateLopHocLink, GetLopHoc, ThemLopHoc, XoaLopHoc } from '@/api/GiangVien/LopHoc';
import { withGiangVienRole, withHocSinhRole } from '@/hoc/auth';

const { Search } = Input;

function LopHocForm({ form }: { form: FormInstance<unknown> }) {
  return (
    <Form form={form} layout="vertical" className="mt-6">
      <Form.Item name="id" hidden={true} />

      <Form.Item name="tenLop"
        label={<span className="font-semibold text-gray-700">Tên lớp học</span>}
        rules={[
          { required: true, message: 'Vui lòng nhập tên lớp học!' },
          { min: 3, message: 'Tên lớp học phải có ít nhất 3 ký tự!' }
        ]}>
        <Input placeholder="Nhập tên lớp học"
          className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
      </Form.Item>

      <Form.Item name="moTa"
        label={<span className="font-semibold text-gray-700">Mô tả</span>}
        rules={[
          { required: true, message: 'Vui lòng nhập số lượng câu hỏi!' },
          { type: 'string', message: 'Vui lòng nhập mô tả!' }
        ]}>
        <Input.TextArea autoSize={{ maxRows: 5, minRows: 5 }} placeholder="Nhập mô tả" />
      </Form.Item>
    </Form>
  )
}
type LopHoc = {
  id: number
  maLop: string
  tenLop: string
  moTa: string
  thoiGianTao: string
}


function Element() {
  const navigate = useNavigate();
  const [lopHoc, setLopHoc] = useState<LopHoc[]>([]);
  const [inviteForm, setInviteForm]: [unknown, Dispatch<unknown>] = useState({})

  const [isModalVisible, setIsModalVisible] = useState<"add" | "update" | "">('');
  const [searchText, setSearchText] = useState('');

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(function () {

  }, [])

  const handleCancel = () => {
    setIsModalVisible('');
    createForm.resetFields();
    updateForm.resetFields();
  };

  const deleteCourse = async (id: number) =>
    await XoaLopHoc(id).then(result => {
      setLopHoc(result.data as LopHoc[])
      message.success('Xóa môn học thành công!');
    }).catch(err => {
      message.error(err.message)
    })


  const columns: unknown[] = [
    {
      width: 60, align: 'center',
      title: <span className="font-semibold text-gray-700">STT</span>,
      render: (_: unknown, __: unknown, index: number) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      width: 150, align: 'center',
      title: <span className="font-semibold text-gray-700">Mã lớp</span>,
      render: (entry: LopHoc) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-mono text-sm">
          {entry.maLop}
        </span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Tên lớp</span>,
      render: (entry: LopHoc) => (
        <span className="font-medium text-gray-800">
          {entry.tenLop}
        </span>
      ),
    },
    {
      width: 150, align: 'center',
      title: <span className="font-semibold text-gray-700">Sĩ số lớp</span>,
      render: () => (
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
          {0}
        </span>
      ),
    },
    {
      width: 150, align: 'center',
      title: <span className="font-semibold text-gray-700">Thao tác</span>,
      render: (record: LopHoc) => (
        <Space size="small" className="flex justify-center">
          <Button size='small' variant='outlined' color='blue' icon={<EditOutlined />}
            onClick={() => {
              updateForm.setFieldsValue(record);
              setIsModalVisible('update');
            }} />
          <Popconfirm okText="Có" cancelText="Không" placement='left'
            onConfirm={() => deleteCourse(record.id)}
            title={
              <div className="font-medium text-gray-700">
                Bạn có chắc chắn muốn xóa môn học này?
              </div>
            }>
            <Button size='small' variant='outlined' color='red' icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button size='small' variant='outlined' color='green' icon={<ArrowRightOutlined />}
            onClick={() => navigate(`/giang-vien/lop-hoc/${record.id}`)} />
          <Button size='small' variant='outlined' color='magenta' icon={<FontAwesomeIcon icon={faMailForward} />}
            onClick={async () => {
              const result = await CreateLopHocLink(record.id)
              console.log(result)
              message.success("Copy link mời thành công!")
            }} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <Search placeholder="Tìm kiếm theo mã môn học hoặc tên môn học" allowClear className="max-w-md"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)} />
              </div>

              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible('add')}>
                Thêm lớp học
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="p-6">
            <Table size='small' columns={columns} dataSource={lopHoc} rowKey="id" pagination={{ pageSize: 10, }}
              className="bg-white rounded-lg overflow-hidden"
              rowClassName={(record, index) => `hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`} />
          </div>
        </div>


      </div>
      {/* Create */}
      <Modal okText='Thêm' cancelText="Hủy" open={isModalVisible === 'add'}
        title={<span className="text-lg font-semibold text-gray-800">Thêm lớp học mới</span>}
        onOk={() => {
          createForm.validateFields().then(async values => {
            ThemLopHoc(values).then(result => {
              setLopHoc(result.data as LopHoc[])
              message.success('Thêm môn học thành công!');
              handleCancel()
            }).catch(err => message.error(err.message))
          })
        }}
        onCancel={handleCancel}>
        <LopHocForm form={createForm} />
      </Modal>

      {/* Update */}
      <Modal okText='Cập nhật' cancelText="Hủy" open={isModalVisible === 'update'}
        title={<span className="text-lg font-semibold text-gray-800">Cập nhật lớp học</span>}
        onOk={() => {
          updateForm.validateFields().then(async values => {
            await CapNhatLopHoc(values).then(result => {
              setLopHoc(result.data as LopHoc[])
              message.success('Cập nhật môn học thành công!');
              handleCancel()
            }).catch(err => message.error(err.message))
          });
        }}
        onCancel={handleCancel}>
        <LopHocForm form={updateForm} />
      </Modal>

      <Modal footer={[]} open={false}
        title={<span className="text-lg font-semibold text-gray-800">Link tham gia lớp học</span>}>
        <div className='flex gap-5'>
          <Input disabled />
          <Button variant='solid' color='blue' icon={<FontAwesomeIcon icon={faClipboard} />} />
        </div>
      </Modal>
    </>
  );
}

const HocSinh_QuanLyLopHoc = withHocSinhRole(Element)

export default HocSinh_QuanLyLopHoc