import axios from "axios";

const url = import.meta.env.VITE_MONHOC_URL;

export async function GetMonHoc() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  console.log('dddd', { result: result.data })
  return result.data;
}

export async function GetMonHocById(id: number) {
  const result = await axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function ThemMoc({ tenMon }: { tenMon: string }) {
  const result = await axios.post(url, { tenMon }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data;
}

export async function CapNhatMonHoc({ id, tenMon }: { id: number, tenMon: string }) {
  const result = await axios.put(`${url}/${id}`, { tenMon }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function XoaMonHoc(id: number) {
  const result = await axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data;
}