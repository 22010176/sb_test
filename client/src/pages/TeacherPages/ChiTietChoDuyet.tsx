import { LayDanhSachChoDuyet } from '@/api/GiangVien/LopHoc';
import { CapNhatTrangThaiCho } from '@/api/GiangVien/LopHoc_HocSinh';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table } from 'antd';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function ChiTietChoDuyet() {
  const { lopId } = useParams()
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(function () {
    LayDanhSachChoDuyet(+(lopId ?? 0)).then(function (res) {
      setStudents(res.data)
      console.log(res.data)
    })
  }, [lopId])


  const columns = [
    {
      title: <p className='text-center'>STT</p>, dataIndex: 'stt', key: 'stt', width: 60, className: 'text-center',
      render: (_, __, i) => i + 1
    },
    {
      title: <p className='text-center'>Họ và tên</p>, dataIndex: 'hoTen', key: 'hoTen', width: 180, filteredValue: searchText ? [searchText] : null,
      onFilter: (value: any, record: any) => record.name.toLowerCase().includes(value.toLowerCase())
    },
    { title: <p className='text-center'>Giới tính</p>, dataIndex: 'gioiTinh', key: 'gioiTinh', width: 100, className: 'text-center' },
    {
      title: <p className='text-center'>Ngày sinh</p>, dataIndex: 'ngaySinh', key: 'ngaySinh', width: 120, className: 'text-center',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    { title: <p className='text-center'>SĐT</p>, dataIndex: 'soDienThoai', key: 'soDienThoai', width: 130 },
    { title: <p className='text-center'>Email</p>, dataIndex: 'email', key: 'email', width: 200, },
    {
      title: <p className='text-center'>Thao tác</p>, key: 'action', width: 120, className: 'text-center',
      render: (_: any, record: any) => (
        <Space>
          <Button variant='text' color='blue' icon={<ThumbsUp />}
            onClick={async () => {
              console.log(_)
              await CapNhatTrangThaiCho({ id: _.id, trangThaiMaMoi: 1 })
                .then(async result => {
                  await LayDanhSachChoDuyet(+(lopId ?? 0)).then(function (res) {
                    setStudents(res.data)
                    console.log(res.data)
                  })
                  message.info("Cập nhật thành công!")
                }).catch(e => {

                  message.error("Cập nhật thất bại!")
                })
            }} />
          <Button variant='text' color='red' icon={<ThumbsDown />}
            onClick={async () => {
              await CapNhatTrangThaiCho({ id: _.id, trangThaiMaMoi: 0 })
                .then(async result => {
                  await LayDanhSachChoDuyet(+(lopId ?? 0)).then(function (res) {
                    setStudents(res.data)
                    console.log(res.data)
                  })
                  message.info("Cập nhật thành công!")
                }).catch(e => {

                  message.error("Cập nhật thất bại!")
                })
            }} />
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
        </div>
      </div>

      <Table columns={columns} dataSource={students} bordered size="small" />
    </div>
  );
};

export default ChiTietChoDuyet;