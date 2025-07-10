import axios from "axios";

const url: string = import.meta.env.VITE_LOPHOC_HOCSINH_URL
export async function CapNhatTrangThaiCho({ id, trangThaiMaMoi }: { id: number, trangThaiMaMoi: number }) {
  const result = await axios.put(url, { id, trangThaiMaMoi }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function XoaHocSinhKhoiLop({ id }: { id: number }) {
  const result = await axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function ThemHocSinhBangSoDienThoai({ idLopHoc, soDienThoai }: { idLopHoc: number, soDienThoai: string }) {
  const result = await axios.post(url, { idLopHoc, soDienThoai }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}