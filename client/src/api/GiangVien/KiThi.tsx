import axios from "axios";

const url = import.meta.env.VITE_KITHI_URL

export type KiThiInput = {
  tenKiThi: string,
  thoiGianLamBaiThi: number,
  thoiGianVaoLamBai: Date,
  idMonHoc: number
}

export type CauHoiKiThi = {
  danhSachCauHoi: number[]
}

export async function LayDanhSachKiThi() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function TaoKiThi(kiThi: KiThiInput) {
  const result = await axios.post(url, kiThi, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function CapNhatKiThi(kithiId: number, kiThi: KiThiInput) {
  const result = await axios.put(`${url}/${kithiId}`, kiThi, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function ThemCauHoiKiThi(idKiThi: number, danhSachCauHoi: CauHoiKiThi) {
  const result = await axios.post(`${url}/${idKiThi}`, danhSachCauHoi, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function XoaKiThi(idKiThi: number) {
  const result = await axios.delete(`${url}/${idKiThi}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function LayKiThiChiTiet(idKiThi: number) {
  const result = await axios.get(`${url}/${idKiThi}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}