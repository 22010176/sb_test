import axios from "axios";

const url: string = import.meta.env.VITE_LOPHOC_URL

export async function ThamGiaLopHoc(maLop: string) {
  const result = await axios.post(`${url}/${maLop}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function LayDanhSachHocSinhLopHoc() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function RoiLopHoc() {

}