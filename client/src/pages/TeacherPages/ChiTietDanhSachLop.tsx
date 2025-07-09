import { LayDanhSachHocSinhLopHoc } from '@/api/GiangVien/LopHoc';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function ChiTietDanhSachLop() {
  const { lopId } = useParams()

  const [students, setStudents] = useState([
    { key: '1', stt: 1, name: 'Trịnh Văn Hùng', gender: 'Nam', birthDate: '04/07/2007', phone: '0912 345 678', email: 'tvhung@example.com' },
    { key: '2', stt: 2, name: 'Lê Minh Khang', gender: 'Nam', birthDate: '15/04/2007', phone: '0987 654 321', email: 'hung@example.com' },
    { key: '3', stt: 3, name: 'Hà Xuân Bách', gender: 'Nam', birthDate: '12/08/2007', phone: '0901 234 567', email: 'haxbach@example.com' },
    { key: '4', stt: 4, name: 'Lê Ngọc Mai', gender: 'Nữ', birthDate: '27/12/2007', phone: '0934 567 890', email: 'ngcmai@example.com' },
    { key: '5', stt: 5, name: 'Phạm Gia Linh', gender: 'Nữ', birthDate: '09/01/2007', phone: '0945 678 901', email: 'phlinh@example.com' },
    { key: '6', stt: 6, name: 'Khương Phương Anh', gender: 'Nữ', birthDate: '16/03/2007', phone: '0976 543 210', email: 'kphanh@example.com' },
    { key: '7', stt: 7, name: 'Trần Tuấn Dũng', gender: 'Nam', birthDate: '02/09/2007', phone: '0888 999 000', email: 'ttdunga@example.com' }
  ]);

  useEffect(function () {
    LayDanhSachHocSinhLopHoc(+(lopId ?? 0)).then(function (res) {
      setStudents(res.data)
    })
  }, [lopId])

  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleDelete = (key: string) => {
    setStudents(students.filter(student => student.key !== key));
  };

  const handleEdit = (record: any) => {
    console.log('Edit student:', record);
  };

  const columns = [
    { title: <p className='text-center'>STT</p>, dataIndex: 'stt', key: 'stt', width: 60, className: 'text-center' },
    {
      title: <p className='text-center'>Họ và tên</p>, dataIndex: 'name', key: 'name', width: 180, filteredValue: searchText ? [searchText] : null,
      onFilter: (value: any, record: any) => record.name.toLowerCase().includes(value.toLowerCase())
    },
    { title: <p className='text-center'>Giới tính</p>, dataIndex: 'gender', key: 'gender', width: 100, className: 'text-center' },
    { title: <p className='text-center'>Ngày sinh</p>, dataIndex: 'birthDate', key: 'birthDate', width: 120, className: 'text-center' },
    { title: <p className='text-center'>SĐT</p>, dataIndex: 'phone', key: 'phone', width: 130 },
    {
      title: <p className='text-center'>Email</p>, dataIndex: 'email', key: 'email', width: 200,
      render: (email: string) => <Link to="">{email}</Link>
    },
    {
      title: <p className='text-center'>Thao tác</p>, key: 'action', width: 120, className: 'text-center',
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm okText="Có" cancelText="Không" title="Bạn có chắc chắn muốn xóa học sinh này?"
            onConfirm={() => handleDelete(record.key)}>
            <Button type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button type="text" icon={<EditOutlined />}
            onClick={() => handleEdit(record)} />
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
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select placeholder="Sắp xếp..." className="w-32"
            value={sortOrder}
            onChange={setSortOrder}
            options={[
              { value: "asc", label: "Tăng dần" },
              { value: "desc", label: "Giảm dần" },
            ]} />
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm học sinh
        </Button>
      </div>

      <Table columns={columns} dataSource={students} bordered size="small" />
    </div>
  );
};

export default ChiTietDanhSachLop;