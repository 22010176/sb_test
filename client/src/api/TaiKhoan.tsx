import axios from 'axios'

const url: string = import.meta.env.VITE_AUTH_URL

export interface DangNhapInput {
  loaiNguoiDung: number,
  email: string,
  soDienThoai: string,
  matKhau: string
}

export interface DangKyInput {
  hoTen: string,
  gioiTinh: number,
  ngaySinh: string,
  soDienThoai: string,
  email: string,
  matKhau: string,
  loaiNguoiDung: number
}

export async function GetNguoiDung() {
  const result = await axios.get(url)
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

