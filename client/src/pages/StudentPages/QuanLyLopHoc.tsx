import { EyeFilled, PlusOutlined } from '@ant-design/icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


import { CapNhatTrangThaiCho } from '@/api/GiangVien/LopHoc_HocSinh';
import { LayDanhSachHocSinhLopHoc, ThamGiaLopHoc } from '@/api/HocSinh/LopHoc';
import { withHocSinhRole } from '@/hoc/auth';

const { Search } = Input;

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

  const [isModalVisible, setIsModalVisible] = useState<"add" | "update" | "">('');
  const [searchText, setSearchText] = useState('');

  const [createForm] = Form.useForm();

  useEffect(function () {
    LayDanhSachHocSinhLopHoc()
      .then(e => {
        setLopHoc(e.data)
      })

  }, [])

  const handleCancel = () => {
    setIsModalVisible('');
    createForm.resetFields();
  };

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
          <Button size='small' variant='outlined' color='blue' icon={<EyeFilled />}
            onClick={() => {

            }} />
          <Popconfirm okText="Có" cancelText="Không" placement='left'
            onConfirm={() => { }}
            title={
              <div className="font-medium text-gray-700">
                Bạn có chắc chắn muốn rời lớp học này?
              </div>
            }>
            <Button size='small' variant='outlined' color='red' icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
              onClick={() => {
                CapNhatTrangThaiCho({ id: record.id, trangThaiMaMoi: 2 })
                  .then(async result => {
                    LayDanhSachHocSinhLopHoc()
                      .then(e => {
                        setLopHoc(e.data)
                      })

                    message.info("Rời lớp học thành công!")
                  }).catch(e => {
                    message.error("Rời lớp học thất bại!")
                  })
              }} />
          </Popconfirm>
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
                Tham gia lớp học
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

      <Modal okText='Tham gia' cancelText="Hủy" open={isModalVisible === 'add'}
        title={<span className="text-lg font-semibold text-gray-800">Tham gia lớp học mới</span>}
        onOk={() => {
          createForm.validateFields().then(async values => {
            console.log(values)
            await ThamGiaLopHoc(values.maLop).then(result => {
              console.log(result)
              message.success("Gửi yêu cầu tham gia thành công!")
            }).catch(err => {
              console.log(err)
              message.error("Gửi yêu cầu tham gia thất bại!")
            })
          })
        }}
        onCancel={handleCancel}>
        <Form form={createForm} layout="vertical" className="mt-6">
          <Form.Item name="maLop"
            label={<span className="font-semibold text-gray-700">Mã lớp</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp học!' },]}>
            <Input placeholder="Nhập mã lớp học" />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}

const HocSinh_QuanLyLopHoc = withHocSinhRole(Element)

export default HocSinh_QuanLyLopHoc