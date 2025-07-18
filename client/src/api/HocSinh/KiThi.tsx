import axios from "axios";

const url = import.meta.env.VITE_KITHI_URL


export async function LayDanhSachKiThi() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}