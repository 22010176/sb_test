import { LayDanhSachKiThi, TaoKiThi, XoaKiThi, type KiThiInput } from '@/api/GiangVien/KiThi';
import { GetMonHoc } from '@/api/GiangVien/MonHoc';

import { CalendarOutlined, CaretDownOutlined, ClockCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { faBookBookmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, DatePicker, Form, Input, message, Modal, Row, Select, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function QuanLyKiThi() {
  const [searchText, setSearchText] = useState('');
  const [createForm, setCreateForm] = useState(false)
  const [sortBy, setSortBy] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [kiThi, setKiThi] = useState([])

  const [monHoc, setMonHoc] = useState([])

  useEffect(function () {
    GetMonHoc().then(result => {
      console.log(result)
      setMonHoc(result.data)
    })
    LayDanhSachKiThi().then(reuslt => {
      setKiThi(reuslt.data)
    })
  }, [])

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      const value: KiThiInput = {
        tenKiThi: values.tenKiThi,
        thoiGianLamBaiThi: +values.thoiGianLamBaiThi,
        thoiGianVaoLamBai: values.thoiGianVaoLamBai.toDate(),
        idMonHoc: values.idMonHoc
      }
      TaoKiThi(value).then(value => {
        setKiThi(value.data)
        message.success('Tạo kì thi thành công!');
        setCreateForm(false)
        form.resetFields();
      }).catch(err => {
        message.error('Có lỗi xảy ra khi tạo kì thi!');
      })
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo kì thi!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCreateForm(false)
  };

  const getStatusColor = (timeStart: Date, time: number) => {
    const start = dayjs(timeStart), current = dayjs(), end = dayjs(timeStart).add(time, 'minutes')
    if (current.isBefore(start)) return 'green'
    if (current.isAfter(start) && current.isBefore(end)) return 'orange'
    if (current.isAfter(end)) return 'blue'
    return 'gray'
  };

  const getStatusString = (timeStart: Date, time: number) => {
    const start = dayjs(timeStart), current = dayjs(), end = dayjs(timeStart).add(time, 'minutes')
    if (current.isBefore(start)) return 'Chưa diễn ra'
    if (current.isAfter(start) && current.isBefore(end)) return 'Đang diễn ra'
    if (current.isAfter(end)) return 'Đã kết thúc'
    return ''
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search and Actions */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow-sm">
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Input placeholder="Tìm kiếm kì thi" prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} />
          </Col>
          <Col span={8}>
            <Select placeholder="Sắp xếp..." suffixIcon={<CaretDownOutlined />}
              className="w-full"
              onChange={(value) => setSortBy(value)}
              options={[
                { label: "Mới nhất", value: "newest" },
                { label: "Cũ nhất", value: "oldest" },
                { label: "Theo tên", value: "name" },
                { label: "Theo môn học", value: "subject" },
              ]} />
          </Col>
          <Col span={8}>
            <div className="flex justify-end">
              <Button type="primary" icon={<PlusOutlined />}
                onClick={() => setCreateForm(true)}>
                Tạo kì thi
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Title */}
      <h1 className="text-2xl mb-6 text-purple-700 font-bold">
        DANH SÁCH KÌ THI
      </h1>

      {/* Exams Grid */}
      <Row gutter={[16, 16]}>
        {kiThi.map((exam: any) => (
          <Col span={12} key={exam.id}>
            <Link to={`/giang-vien/ki-thi/${exam.id}`}>

              <Card className="hover:shadow-lg transition-all duration-300 border-gray-200 h-full">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <p className="!mb-0 text-2xl font-bold text-gray-800 flex-1 pr-4">
                      {exam.tenKiThi}
                    </p>
                    <div className='flex justify-end items-center'>
                      <Tag className="shrink-0 px-3 py-1 text-sm font-medium" color={getStatusColor(exam.thoiGianVaoLamBai, exam.thoiGianLamBaiThi)} >
                        {getStatusString(exam.thoiGianVaoLamBai, exam.thoiGianLamBaiThi)}
                      </Tag>
                      <Button variant='text' color='red' icon={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={async e => {
                          XoaKiThi(exam.id).then(i => {
                            setKiThi(i.data)
                            message.success("Xóa kì thi thành công!")
                          }).catch(e => {
                            message.success("Xóa kì thi thất bại!")
                          })
                        }} />
                    </div>
                  </div>
                </div>

                <Space direction="vertical" className="w-full" size="middle">
                  <div className="flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faBookBookmark} className="mr-3 text-blue-500" />
                    <p className="text-base">{exam.tenMon}</p>
                    <div className="ml-auto flex items-center">
                      <ClockCircleOutlined className="mr-2 text-red-500" />
                      <p className="text-base font-medium">{exam.thoiGianLamBaiThi}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <CalendarOutlined className="mr-3 text-green-500" />
                    <p className="text-base">{dayjs(exam.thoiGianVaoLamBai).format("DD/MM/YYYY HH:mm")}</p>
                    <div className="ml-auto flex items-center">
                      <CalendarOutlined className="mr-2 text-purple-500" />
                      <p className="text-base">{dayjs(exam.thoiGianVaoLamBai).add(exam.thoiGianLamBaiThi, 'minutes').format("DD/MM/YYYY HH:mm")}</p>
                    </div>
                  </div>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Load More or Pagination could be added here */}
      <div className="text-center mt-8">
        <p className="text-gray-500">
          Hiển thị {kiThi.length} kì thi
        </p>
      </div>
      <Modal open={createForm} footer={[]}
        title={
          <span className="text-lg font-semibold text-gray-800">
            TẠO KÌ THI
          </span>
        }
        onCancel={handleCancel}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          {/* Exam Name */}
          <Form.Item name="tenKiThi"
            label={
              <span className="text-gray-700 font-medium">
                Tên kì thi <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: 'Vui lòng nhập tên kì thi!' },
              { min: 3, message: 'Tên kì thi phải có ít nhất 3 ký tự!' }
            ]}>
            <Input placeholder="Nhập tên kì thi" className="rounded-lg" />
          </Form.Item>

          {/* Subject */}
          <Form.Item name="idMonHoc"
            label={
              <span className="text-gray-700 font-medium">
                Môn thi <span className="text-red-500">*</span>
              </span>
            }

            rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}>
            <Select placeholder="Chọn môn học" className="rounded-lg"
              optionFilterProp="children"
              options={monHoc.map((i: any) => ({ value: i.id, label: i.tenMon }))} />
          </Form.Item>

          {/* Duration */}
          <Form.Item name="thoiGianLamBaiThi"
            label={
              <span className="text-gray-700 font-medium">
                Thời gian làm bài (phút) <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài!' },]}>
            <Input type="number" placeholder="Nhập thời gian làm bài" suffix="phút" />
          </Form.Item>

          {/* Start Time */}
          <Form.Item name="thoiGianVaoLamBai"
            label={
              <span className="text-gray-700 font-medium">
                Thời gian bắt đầu <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}>
            <DatePicker showTime placeholder="Chọn thời gian bắt đầu" className="w-full" format="DD/MM/YYYY HH:mm" />
          </Form.Item>

          {/* End Time */}
          <Form.Item dependencies={['thoiGianVaoLamBai', 'thoiGianLamBaiThi']}
            label={
              <span className="text-gray-700 font-medium">
                Thời gian kết thúc <span className="text-red-500">*</span>
              </span>
            }>
            {() => {
              const { thoiGianVaoLamBai, thoiGianLamBaiThi } = form.getFieldsValue()
              const reuslt = dayjs(thoiGianVaoLamBai).add(+(thoiGianLamBaiThi ?? 0), 'minutes')
              return (
                <DatePicker placeholder="Chọn thời gian kết thúc" className="w-full" showTime disabled format="DD/MM/YYYY HH:mm" value={reuslt} />
              )
            }}
          </Form.Item>

          {/* Action Buttons */}
          <Form.Item className="mb-0 pt-6">
            <Space className="w-full justify-center">
              <Button onClick={handleCancel}
                className="px-8 py-2 h-auto rounded-lg border-gray-300 text-gray-600 hover:border-gray-400">
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default QuanLyKiThi