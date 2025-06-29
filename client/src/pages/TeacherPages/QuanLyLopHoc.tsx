import { withGiangVienRole } from '@/hoc/auth';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Space, Table } from 'antd';
import { useState } from 'react';

const { Search } = Input;

function Element() {
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
      key: 'index', width: 60, align: 'center',
      title: <span className="font-semibold text-gray-700">STT</span>,
      render: (_: unknown, __: unknown, index: number) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      dataIndex: 'courseCode', key: 'courseCode', width: 150, align: 'center',
      title: <span className="font-semibold text-gray-700">Mã lớp</span>,
      render: (text: string) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-mono text-sm">
          {text}
        </span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Tên lớp</span>,
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text: string) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">Sĩ số lớp</span>,
      dataIndex: 'questionCount',
      key: 'questionCount',
      width: 150,
      align: 'center',
      render: (count: number) => (
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
            className="text-green-500 hover:text-green-600 hover:bg-green-50 border-0 rounded-lg transition-all duration-200" />
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
              <Search placeholder="Tìm kiếm theo mã môn học hoặc tên môn học" allowClear size="middle" className="max-w-md"
                enterButton={<Button icon={<SearchOutlined />} className="bg-gray-600 hover:bg-gray-700 border-gray-600" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Select placeholder="Sắp xếp..." className="w-40" size="middle" options={[
                { value: 'name', label: 'Theo tên' },
                { value: 'code', label: 'Theo mã' },
                { value: 'questions', label: 'Theo số câu hỏi' },
              ]} />
            </div>

            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-0 rounded-lg px-6 py-2 h-auto font-semibold shadow-md hover:shadow-lg transition-all duration-200">
              Thêm lớp học
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <Table size='small' columns={columns} dataSource={filteredCourses} rowKey="id" pagination={{ pageSize: 10, }}
            className="bg-white rounded-lg overflow-hidden"
            rowClassName={(record, index) => `hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`} />
        </div>
      </div>

      {/* Modal */}
      <Modal
        okText={editingCourse ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title={
          <span className="text-lg font-semibold text-gray-800">
            {editingCourse ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'}
          </span>
        }>
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item
            label={<span className="font-semibold text-gray-700">Tên lớp học</span>}
            name="courseName"
            rules={[
              { required: true, message: 'Vui lòng nhập tên lớp học!' },
              { min: 3, message: 'Tên lớp học phải có ít nhất 3 ký tự!' }
            ]}>
            <Input
              placeholder="Nhập tên lớp học"
              className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-gray-700">Mô tả</span>}
            name="questionCount"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng câu hỏi!' },
              { type: 'string', message: 'Vui lòng nhập mô tả!' }
            ]}>
            <Input.TextArea
              autoSize={{ maxRows: 5, minRows: 5 }}
              placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
      {/* </div> */}
    </div>
  );
}

const QuanLyLopHoc = withGiangVienRole(Element)

export default QuanLyLopHoc