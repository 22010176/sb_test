import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Select, Space, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { CapNhatMonHoc, GetMonHoc, ThemMoc, XoaMonHoc } from '@/api/GiangVien/MonHoc';
import { withGiangVienRole } from '@/hoc/auth';

const { Search } = Input;

function Element() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const [sort, setSort] = useState('name');

  const dataTable = useMemo(() => {
    return courses.filter((course: any) =>
      course.tenMon.toLowerCase().includes(searchText.toLowerCase()) ||
      course.maMon.toLowerCase().includes(searchText.toLowerCase())
    ).sort((a: any, b: any) => {
      if (sort === 'name') return a.tenMon?.localeCompare(b?.tenMon);
      if (sort === 'code') return a.maMon?.localeCompare(b?.maMon);
      if (sort === 'questions') return (b?.questionCount || 0) - (a?.questionCount || 0);
      return 0;
    });
  }, [courses, searchText, sort]);

  useEffect(() => {
    GetMonHoc().then(result => {
      // console.log(result)
      setCourses(result.data)
    }).catch(err => message.error(err.message))
  }, [])

  const showModal = (course = null) => {
    setEditingCourse(course);
    setIsModalVisible(true);
    if (course) form.setFieldsValue(course);
    else form.resetFields();
  };

  const handleOk = async () => {
    form.validateFields().then(async values => {
      if (editingCourse) {
        console.log(values)
        await CapNhatMonHoc(values).then(result => {
          setCourses(result.data)
          message.success('Cập nhật môn học thành công!');
        }).catch(err => message.error(err.message))
      } else await ThemMoc(values).then(result => {
        setCourses(result.data)
        message.success('Thêm môn học thành công!');
      }).catch(err => message.error(err.message))

      setIsModalVisible(false);
      setEditingCourse(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCourse(null);
  };

  const deleteCourse = (id: number) => {
    XoaMonHoc(id).then(result => {
      setCourses(result.data)
      message.success('Xóa môn học thành công!');
    }).catch(err => message.error(err.message));
  };

  const columns = [
    {
      key: 'index', width: 60, align: 'center',
      title: <span className="font-semibold text-gray-700">STT</span>,
      render: (_: unknown, __: object, index: number) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      dataIndex: 'maMon', key: 'maMon', width: 150, align: 'center',
      title: <span className="font-semibold text-gray-700">Mã môn học</span>,
      render: (text: string) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-mono text-sm">
          {text || 'Chưa có mã'}
        </span>
      ),
    },
    {
      dataIndex: 'tenMon', key: 'tenMon',
      title: <span className="font-semibold text-gray-700">Tên môn học</span>,
      render: (text: string) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Số lượng câu hỏi</span>,
      dataIndex: 'soLuongCauHoi',
      key: 'soLuongCauHoi',
      width: 150,
      align: 'center',
      render: (count: number) => (
        <div className="flex items-center justify-center">
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
            {count ?? 0}
          </span>
        </div>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Thao tác</span>,
      key: 'action',
      width: 150,
      align: 'center',
      render: (_: unknown, record: any) => (
        <Space size="small" className="flex justify-center">
          <Button size='small' variant='outlined' color='blue' icon={<EditOutlined />} onClick={() => showModal(record)} />
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
            onClick={() => navigate(`/giang-vien/mon-hoc/${record.id}`)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-auto">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Toolbar */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <Search allowClear className="max-w-md" placeholder="Tìm kiếm theo mã môn học hoặc tên môn học" enterButton={<Button icon={<SearchOutlined />} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
              <Select placeholder="Sắp xếp..." className="w-40"
                value={sort}
                onChange={(value) => setSort(value)}
                options={[
                  { value: 'name', label: 'Theo tên' },
                  { value: 'code', label: 'Theo mã' },
                  { value: 'questions', label: 'Theo số câu hỏi' },
                ]} />
            </div>

            <Button type="primary" icon={<PlusOutlined />}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-0 rounded-lg px-6 py-2 h-auto font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => showModal()}>
              Thêm môn học
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <Table
            size='small'
            columns={columns}
            dataSource={dataTable}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="bg-white rounded-lg overflow-hidden"
            rowClassName={(record, index) => `hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`} />
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-800">
              {editingCourse ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}
            </span>
          </div>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingCourse ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
        width={500}
        className="rounded-xl overflow-hidden">
        <Form form={form} layout="vertical" className="mt-6">

          <Form.Item name="id" hidden />

          <Form.Item name="tenMon"
            label={<span className="font-semibold text-gray-700">Tên môn học</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập tên môn học!' },
              { min: 3, message: 'Tên môn học phải có ít nhất 3 ký tự!' }
            ]}>
            <Input placeholder="Nhập tên môn học" />
          </Form.Item>
        </Form>
      </Modal>
      {/* </div> */}
    </div >
  );
}

const GiangVien_QuanLyMonHoc = withGiangVienRole(Element)
export default GiangVien_QuanLyMonHoc