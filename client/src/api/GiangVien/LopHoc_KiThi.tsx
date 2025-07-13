import axios from "axios";

const url: string = import.meta.env.VITE_LOPHOC_KITHI_URL

export type KiThi_LopHocInput = {
  idLopHoc: number,
  idKiThi: number,
}

export async function LayDanhSachLopHoc(idKiThi: number) {
  const result = await axios.get(`${url}/${idKiThi}/danh-sach-lop`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function ThemDanhSachLopHoc(idKiThi: number, lopHoc: Array<KiThi_LopHocInput>) {
  const result = await axios.post(`${url}/${idKiThi}`, lopHoc, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function XoaDanhSachLopHoc(idKiThi: number) {
  const result = await axios.delete(`${url}/${idKiThi}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}