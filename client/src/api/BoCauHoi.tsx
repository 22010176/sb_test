import axios from "axios";

const url = import.meta.env.VITE_BOCAUHOI_URL;

export async function GetBoCauHoi(idMonHoc: number) {
  const result = await axios.get(`${url}/${idMonHoc}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return result.data;
}

export async function GetBoCauHoiById(idMonHoc: number, idBoCauHoi: number) {
  const result = await axios.get(`${url}/${idMonHoc}/${idBoCauHoi}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function ThemBoCauHoi({ idMonHoc, tenBoCauHoi }: { idMonHoc: number, tenBoCauHoi: string }) {
  const result = await axios.post(`${url}/${idMonHoc}`, { tenBoCauHoi }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
}

export async function CapNhatBoCauHoi({ id, idMonHoc, tenBoCauHoi }: { id: number, idMonHoc: number, tenBoCauHoi: string }) {
  const result = await axios.put(`${url}/${idMonHoc}/${id}`, { tenBoCauHoi }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data;
}

export async function XoaBoCauHoi({ idMonHoc, id }: { idMonHoc: number, id: number }) {
  const result = await axios.delete(`${url}/${idMonHoc}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data;
}