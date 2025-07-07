import axios from 'axios'

import type { LopHoc } from '@/pages/TeacherPages/types'

const url: string = import.meta.env.VITE_LOPHOC_URL

export async function GetLopHoc() {
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function CreateLopHocLink(id: number) {
  console.log(`${url}/link/${id}`)
  const result = await axios.post(`${url}/${id}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data

}

export async function ThemLopHoc(lopHoc: LopHoc) {
  const result = await axios.post(url, lopHoc, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function CapNhatLopHoc(lopHoc: LopHoc) {
  const result = await axios.put(`${url}/${lopHoc.id}`, lopHoc, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}

export async function XoaLopHoc(id: number) {
  const result = await axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
}