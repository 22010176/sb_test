import { CalendarOutlined, ClockCircleOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Form, Input, message, Modal, Row, Space, Statistic, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { CapNhatBoCauHoi, GetBoCauHoi, ThemBoCauHoi, XoaBoCauHoi } from '@/api/BoCauHoi';
import { GetMonHocById } from '@/api/MonHoc';

const { Title, Text } = Typography;

type MonHoc = {
  id: number,
  maMon: string,
  tenMon: string,
  thoiGianCapNhatCuoi: string,
  idGiangVien: number,
  nguoiTao: undefined,
  boCauHoi: undefined
}

export default function QuanLyBoCauHoi() {
  const navigate = useNavigate();

  const { monHocId }: { monHocId: string } = useParams() as { monHocId: string; }
  const [form] = Form.useForm();

  const [formModal, setFormModal] = useState<"add" | "update" | "">("")
  const [monHoc, setMonHoc]: [MonHoc | object, object] = useState<MonHoc | object>({})
  const [boCauHoi, setBoCauHoi] = useState([]);

  useEffect(function () {
    GetMonHocById(+monHocId).then(result => {
      setMonHoc(result.data[0] as MonHoc)
    }).catch(err => {
      throw err
    })

    GetBoCauHoi(+monHocId).then(result => {
      setBoCauHoi(result.data)
    }).catch(err => {
      throw err
    })
  }, [monHocId])

  // console.log(monHoc, boCauHoi)
  const handleOk = async () => {
    form.validateFields().then(async values => {
      if (formModal === 'update') {
        await CapNhatBoCauHoi({ ...values, idMonHoc: +monHocId }).then(result => {
          setBoCauHoi(result.data)
          message.success('Cập nhật bộ câu hỏi thành công!');
          setFormModal('')
          form.resetFields()
        }).catch(err => {
          message.error(err.message)
        })
      } else if (formModal === 'add') {
        await ThemBoCauHoi({ ...values, idMonHoc: +monHocId }).then(result => {
          setBoCauHoi(result.data)
          message.success('Thêm bộ câu hỏi thành công!');
        }).catch(err => message.error(err.message))
      }

      form.resetFields()
      setFormModal('')
    });
  };

  return (
    <div className="xl:px-60 px-10 pt-6 bg-gray-50 grow">
      {/* Header */}
      <div className="mb-6">
        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <Breadcrumb className='text-lg font-bold'
            separator={<p className='text-xl'>&gt;</p>}
            items={[
              { title: <Link className='text-xl' to="/giang-vien/mon-hoc">Môn học</Link>, },
              { title: <p className='text-xl'>{monHoc.tenMon}</p>, },
            ]} />
          <Text className="text-gray-600">
            Cập nhật lần cuối: {dayjs(monHoc.thoiGianCapNhatCuoi).toDate().toLocaleDateString('vi-VN')}
          </Text>
        </div>

        {/* Statistics */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center bg-blue-50 border-blue-200">
              <Statistic title="Tổng số câu hỏi" value={0} valueStyle={{ color: '#1890ff', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-green-50 border-green-200">
              <Statistic title="Câu hỏi dễ" value={0} valueStyle={{ color: '#52c41a', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-orange-50 border-orange-200">
              <Statistic title="Câu hỏi trung bình" value={0} valueStyle={{ color: '#fa8c16', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center bg-red-50 border-red-200">
              <Statistic title="Câu hỏi khó" value={0} valueStyle={{ color: '#f5222d', fontSize: '2rem', fontWeight: 'bold' }} />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!mb-0">
          CÁC BỘ CÂU HỎI:
        </Title>
        <Space>
          <Button variant='solid' color='purple' icon={<PlusOutlined />} onClick={() => setFormModal('add')}>
            Thêm bộ câu hỏi
          </Button>
          <Button variant='solid' color='green' icon={<DownloadOutlined />} >
            Xuất danh sách
          </Button>
        </Space>
      </div>

      {/* Question Sets */}
      <Row gutter={[16, 16]}>
        {boCauHoi.map((item) => (
          <Col span={12} key={item.id}>
            <Link to={`/giang-vien/mon-hoc/${monHocId}/${item.id}`}>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <Title level={5} className="!mb-0 text-gray-800">
                    {item.tenBoCauHoi}
                  </Title>
                  <div className="flex justify-end">
                    <Button type="text" variant='text' icon={<EyeOutlined />}
                      onClick={() => navigate(`/giang-vien/mon-hoc/${monHocId}/${item.id}`)} />
                    <Button color='blue' variant='text' type="text" icon={<EditOutlined />}
                      onClick={() => {
                        setFormModal('update')
                        form.setFieldsValue(item)
                      }} />
                    <Button color='red' variant='text' type="text" icon={<DeleteOutlined />}
                      onClick={async () => {
                        XoaBoCauHoi({ idMonHoc: +monHocId, id: item.id }).then(result => {
                          setBoCauHoi(result.data)
                          message.success('Xóa bộ câu hỏi thành công!');
                        }).catch(err => {
                          message.error(err.message)
                        })
                      }} />
                  </div>
                </div>

                <Space direction="vertical" className="w-full" size="small">
                  <div className="flex items-center text-gray-600">
                    <FileTextOutlined className="mr-2" />
                    <Text>{item.questionCount ?? 70} Câu hỏi</Text>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <ClockCircleOutlined className="mr-2" />
                    <Text>{item.details ?? '20 Dễ, 10 Trung bình, 10 Khó'}</Text>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <CalendarOutlined className="mr-2" />
                    <Text>Cập nhật lần cuối: {dayjs(item.thoiGianCapNhatCuoi).toDate().toLocaleDateString('vi-VN')}</Text>
                  </div>
                </Space>


              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Modal
        title={
          <span className="text-lg font-semibold text-gray-800">
            {formModal === 'update' ? 'Chỉnh sửa bộ câu hỏi' : 'Thêm bộ câu hỏi mới'}
          </span>
        }
        open={formModal.length > 0}
        onOk={handleOk}
        cancelText="Hủy"
        width={500}
        className="rounded-xl overflow-hidden">
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item name="id" hidden />
          <Form.Item name="tenBoCauHoi"
            label={<span className="font-semibold text-gray-700">Tên bộ câu hỏi</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập tên môn học!' },
              { min: 3, message: 'Tên môn học phải có ít nhất 3 ký tự!' }
            ]}>
            <Input placeholder="Nhập tên bộ câu hỏi" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}