import axios from 'axios'
import type { Dayjs } from 'dayjs'

const url: string = import.meta.env.VITE_AUTH_URL

export type DangNhapInput = {
  loaiNguoiDung: number,
  email: string,
  soDienThoai: string,
  matKhau: string
}

export type DangKyInput = {
  hoTen: string,
  gioiTinh: number,
  ngaySinh: string,
  soDienThoai: string,
  email: string,
  matKhau: string,
  loaiNguoiDung: number
}

export type CapNhatInput = {
  hoTen: string,
  gioiTinh: number,
  ngaySinh: string | Dayjs,
  soDienThoai: string
  email: string
}

export async function GetNguoiDung() {
  const result = await axios.get(`${url}/thong-tin-nguoi-dung`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function DangNhapNguoiDung(input: DangNhapInput) {
  const result = await axios.post(`${url}/dang-nhap`, input)
  return result.data
}

export async function DangKyNguoiDung(input: DangKyInput) {
  const result = await axios.post(`${url}/dang-ky`, input)
  return result.data
}

export async function CapNhatNguoiDung(input: CapNhatInput) {
  const result = await axios.put(`${url}/sua-tai-khoan`, input, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

