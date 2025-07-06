import axios from "axios";

const url = import.meta.env.VITE_CAUHOI_URL;

export async function GetCauHoi(boCauHoiId: number) {
  const result = await axios.get(`${url}/${boCauHoiId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function ThemCauHoi(boCauHoiId: number, cauHoi: object) {
  const result = await axios.post(`${url}/${boCauHoiId}`, cauHoi, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function CapNhatCauHoi(boCauHoiId: number, cauHoi: object) {
}

export async function XoaCauHoi(boCauHoiId: number, cauHoiId: number) {
  const result = await axios.delete(`${url}/${boCauHoiId}/${cauHoiId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}