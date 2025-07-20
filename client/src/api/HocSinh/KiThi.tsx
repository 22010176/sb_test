import axios from "axios";

const url = import.meta.env.VITE_KITHI_URL
console.log("URL Ki Thi:", url)

export async function LayDanhSachKiThi() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function ThamGiaKiThi(idKiThi: number) {
  const result = await axios.post(`${url}/${idKiThi}/tham-gia`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}