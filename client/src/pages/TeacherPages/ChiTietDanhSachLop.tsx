import { LayDanhSachHocSinhLopHoc } from '@/api/GiangVien/LopHoc';
import { ThemHocSinhBangSoDienThoai, XoaHocSinhKhoiLop } from '@/api/GiangVien/LopHoc_HocSinh';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function ChiTietDanhSachLop() {
  const { lopId } = useParams()

  const [inviteModal, setInviteModal] = useState(false)
  const [createForm] = Form.useForm();
  const [students, setStudents] = useState([]);

  useEffect(function () {
    LayDanhSachHocSinhLopHoc(+(lopId ?? 0)).then(function (res) {
      setStudents(res.data[0].hocSinh)
    })
  }, [lopId])

  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
    {
      title: <p className='text-center'>Email</p>, dataIndex: 'email', key: 'email', width: 200,
      render: (email: string) => <Link to="">{email}</Link>
    },
    {
      title: <p className='text-center'>Thao tác</p>, key: 'action', width: 120, className: 'text-center',
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm okText="Có" cancelText="Không" title="Bạn có chắc chắn muốn xóa học sinh này?"
            onConfirm={() => {
              XoaHocSinhKhoiLop({ id: record.id }).then(result => {
                LayDanhSachHocSinhLopHoc(+(lopId ?? 0)).then(function (res) {
                  setStudents(res.data[0].hocSinh)
                  message.success("Thành công!")
                })
              }).catch(err => message.error("Lỗi!"))
            }}>
            <Button variant='solid' color='red' icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6 bg-white">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Input placeholder="Tìm kiếm học sinh" prefix={<SearchOutlined />} className="w-100"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} />
          {/* <Select placeholder="Sắp xếp..." className="w-50"
            value={sortOrder}
            onChange={setSortOrder}
            options={[
              { value: "asc", label: "Tăng dần" },
              { value: "desc", label: "Giảm dần" },
            ]} /> */}
        </div>
        <Button type="primary" icon={<PlusOutlined />}
          onClick={() => {
            setInviteModal(true)
            createForm.resetFields();
          }}>
          Thêm học sinh
        </Button>
      </div>

      <Table bordered size="small"
        columns={columns}
        dataSource={students.filter((student: any) =>
          student.hoTen.toLowerCase().includes(searchText.toLowerCase())
          || student.soDienThoai.includes(searchText)
          || student.email.toLowerCase().includes(searchText.toLowerCase()))}
      />

      <Modal okText='Tham gia' cancelText="Hủy" open={inviteModal}
        title={<span className="text-lg font-semibold text-gray-800">Thêm học sinh bằng số điện thoại</span>}

        onOk={() => {
          createForm.validateFields().then(async values => {
            console.log(values)
            ThemHocSinhBangSoDienThoai({ idLopHoc: +(lopId ?? 0), soDienThoai: values.soDienThoai })
              .then(result => {
                LayDanhSachHocSinhLopHoc(+(lopId ?? 0)).then(function (res) {
                  setStudents(res.data[0].hocSinh)
                  message.success("Thành công!")
                })
              }).catch(err => message.error("Lỗi!"))
          })
        }}
        onCancel={() => {
          setInviteModal(false)
          createForm.resetFields();
        }}>
        <Form form={createForm} layout="vertical" className="mt-6">
          <Form.Item name="soDienThoai"
            label={<span className="font-semibold text-gray-700">Số điện thoại</span>}
            rules={[
              { required: true, message: 'Vui lòng số điện thoại học sinh!' },
              { pattern: /^\+?[0-9]{1,4}?[-. (]?[0-9]{2,4}?[-. )]?[0-9]{3,4}?[-. ]?[0-9]{3,4}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}>
            <Input placeholder="Nhập số điện thoại..." />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default ChiTietDanhSachLop;