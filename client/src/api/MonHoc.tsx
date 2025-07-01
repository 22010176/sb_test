import axios from "axios";

const url = import.meta.env.VIET_MONHOC_URL;

export async function GetMonHoc() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function ThemMoc() {
  const result = await axios.post(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data;
}

export async function CapNhatMonHoc() {
  const result = await axios.put(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

