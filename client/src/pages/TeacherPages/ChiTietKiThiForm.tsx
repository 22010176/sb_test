import { CapNhatKiThi, LayKiThiChiTiet } from '@/api/GiangVien/KiThi';
import { GetMonHoc } from '@/api/GiangVien/MonHoc';

import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, message, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const ChiTietKiThiForm = () => {
  const navigate = useNavigate()

  const { idKiThi } = useParams()
  const [kiThi, setKiThi] = useState<any>({})
  const [monHoc, setMonHoc] = useState([])

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    LayKiThiChiTiet(+(idKiThi ?? 0)).then(result => {
      const input = result.data
      setKiThi(input)
      form.setFieldsValue({
        tenKiThi: input.tenKiThi,
        idMonHoc: input.idMonHoc,
        thoiGianLamBaiThi: input.thoiGianLamBaiThi,
        thoiGianVaoLamBai: dayjs(input.thoiGianVaoLamBai),
      })
    })
    GetMonHoc().then(result => {
      console.log(result)
      setMonHoc(result.data)
    })
  }, [idKiThi])

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const input = {
        idMonHoc: values.idMonHoc,
        tenKiThi: values.tenKiThi,
        thoiGianLamBaiThi: +values.thoiGianLamBaiThi,
        thoiGianVaoLamBai: dayjs(values.thoiGianVaoLamBai).toDate()
      }
      await CapNhatKiThi(+(idKiThi ?? 0), input).then(function (data) {
        console.log(data)
        LayKiThiChiTiet(+(idKiThi ?? 0)).then(result => {
          const input = result.data
          setKiThi(input)
          form.setFieldsValue({
            tenKiThi: input.tenKiThi,
            idMonHoc: input.idMonHoc,
            thoiGianLamBaiThi: +input.thoiGianLamBaiThi,
            thoiGianVaoLamBai: dayjs(input.thoiGianVaoLamBai),
          })
          message.success("Cập nhật thành công!")
        })
      }).catch(err => {
        message.error("Cập nhật thất bại!")
      })

    } finally {
      setLoading(false);
      navigate(0)
    }
  };

  const onEdit = () => {
    // Handle edit action
    console.log('Edit clicked');
  };

  const handleSave = () => {
    form.submit();
  };

  return (
    <div className='p-10'>
      <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-6">
        <div className="space-y-4">
          <Form.Item
            label={<span className="text-gray-700 font-medium">Tên kì thi <span className="text-red-500">*</span></span>}
            name="tenKiThi"
            rules={[
              { required: true, message: 'Vui lòng nhập tên kì thi!' }
            ]}>
            <Input placeholder="Nhập tên kì thi" />
          </Form.Item>

          <Form.Item name="idMonHoc"
            label={<span className="text-gray-700 font-medium">Môn thi <span className="text-red-500">*</span></span>}
            rules={[{ required: true, message: 'Vui lòng chọn môn thi!' }]}>
            <Select
              placeholder="Chọn môn thi"
              options={monHoc.map((i: any) => ({ value: i.id, label: i.tenMon }))} />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Thời gian làm bài thi (phút) <span className="text-red-500">*</span></span>}
            name="thoiGianLamBaiThi"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài!' },]}>
            <InputNumber className='w-20' placeholder="Nhập thời gian (phút)" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-gray-700 font-medium">Thời gian bắt đầu <span className="text-red-500">*</span></span>}
              name="thoiGianVaoLamBai"
              rules={[
                { required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }
              ]}>
              <DatePicker showTime className='w-full' format="DD/MM/YYYY HH:mm" placeholder="Chọn thời gian bắt đầu" />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Thời gian kết thúc <span className="text-red-500">*</span></span>}
              dependencies={['thoiGianVaoLamBai', 'thoiGianLamBaiThi']}
              rules={[
                { required: true, message: 'Vui lòng chọn thời gian kết thúc!' }
              ]}>
              {() => {
                const { thoiGianVaoLamBai, thoiGianLamBaiThi } = form.getFieldsValue()
                const reuslt = dayjs(thoiGianVaoLamBai).add(+(thoiGianLamBaiThi ?? 0), 'minutes')
                return (
                  <DatePicker placeholder="Chọn thời gian kết thúc" className="w-full" showTime disabled format="DD/MM/YYYY HH:mm" value={reuslt} />
                )
              }}
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button type="default" icon={<EditOutlined />} onClick={onEdit}>
            Chỉnh sửa
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={loading}>
            Lưu
          </Button>
        </div>
      </Form>

    </div>
    // </div>
  );
};

export default ChiTietKiThiForm;