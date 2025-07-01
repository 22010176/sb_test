import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Select, Space, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const { Search } = Input;
const { Option } = Select;

export default function QuanLyMonHoc() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    { id: 1, courseCode: 'MH-001', courseName: 'Tiếng Nhật cơ bản', questionCount: 150, },
    { id: 2, courseCode: 'MH-002', courseName: 'Tiếng Nhật chuyên ngành', questionCount: 100, },
    { id: 3, courseCode: 'MH-003', courseName: 'Tài chính ngân hàng', questionCount: 90, },
    { id: 4, courseCode: 'MH-004', courseName: 'Tổ hợp xác suất', questionCount: 100, },
    { id: 5, courseCode: 'MH-005', courseName: 'Toán rời rạc', questionCount: 120, },
    { id: 6, courseCode: 'MH-006', courseName: 'An toàn và bảo mật thông tin', questionCount: 180, },
    { id: 7, courseCode: 'MH-007', courseName: 'Cơ sở dữ liệu', questionCount: 200, },
    { id: 8, courseCode: 'MH-007', courseName: 'Cơ sở dữ liệu', questionCount: 200, },
    { id: 9, courseCode: 'MH-007', courseName: 'Cơ sở dữ liệu', questionCount: 200, },
    { id: 10, courseCode: 'MH-007', courseName: 'Cơ sở dữ liệu', questionCount: 200, },
    { id: 11, courseCode: 'MH-007', courseName: 'Cơ sở dữ liệu', questionCount: 200, },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (course = null) => {
    setEditingCourse(course);
    setIsModalVisible(true);
    if (course) {
      form.setFieldsValue(course);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingCourse) {
        setCourses(courses.map(course =>
          course.id === editingCourse.id ? { ...course, ...values } : course
        ));
        message.success('Cập nhật môn học thành công!');
      } else {
        const newCourse = {
          id: Math.max(...courses.map(c => c.id)) + 1,
          ...values
        };
        setCourses([...courses, newCourse]);
        message.success('Thêm môn học thành công!');
      }
      setIsModalVisible(false);
      setEditingCourse(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCourse(null);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    message.success('Xóa môn học thành công!');
  };

  const columns = [
    {
      title: <span className="font-semibold text-gray-700">STT</span>,
      key: 'index',
      width: 60,
      align: 'center',
      render: (_, __, index) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Mã môn học</span>,
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 150,
      align: 'center',
      render: (text) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-mono text-sm">
          {text}
        </span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Tên môn học</span>,
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Số lượng câu hỏi</span>,
      dataIndex: 'questionCount',
      key: 'questionCount',
      width: 150,
      align: 'center',
      render: (count) => (
        <div className="flex items-center justify-center">
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
            {count}
          </span>
        </div>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Thao tác</span>,
      key: 'action',
      width: 150,
      align: 'center',
      render: (_, record) => (
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
              <Search allowClear className="max-w-md"
                placeholder="Tìm kiếm theo mã môn học hoặc tên môn học"
                enterButton={<Button icon={<SearchOutlined />} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
              <Select placeholder="Sắp xếp..." className="w-40" options={[
                { value: 'name', label: 'Theo tên' },
                { value: 'code', label: 'Theo mã' },
                { value: 'questions', label: 'Theo số câu hỏi' },
              ]} />
            </div>

            <Button type="primary" icon={<PlusOutlined />}
              onClick={() => showModal()}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-0 rounded-lg px-6 py-2 h-auto font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Thêm môn học
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <Table
            size='small'
            columns={columns}
            dataSource={filteredCourses}
            rowKey="id"
            pagination={{ pageSize: 10, }}
            className="bg-white rounded-lg overflow-hidden"
            rowClassName={(record, index) => `hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`
            } />
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

          <Form.Item name="courseName"
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