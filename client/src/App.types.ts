export type UserData = {
  id: number
  hoTen: string
  gioiTinh: number
  ngaySinh: string
  soDienThoai: string
  email: string
  loaiNguoiDung: number
  thoiGianTao: string
}

export type AppData = {
  user: UserData | null | string
}

export type PageAction = {
  type: 'SET_USER',
  payload: unknown
}

export type PageContextData = [
  AppData,
  React.Dispatch<PageAction>
]
