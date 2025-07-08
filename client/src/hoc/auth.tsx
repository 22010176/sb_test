import { useContext, type FC, type JSX } from "react";
import { Navigate } from "react-router";

import type { PageContextData, UserData } from "@/App.types";
import { PageContext } from "@/contexts/PageContext";


export function withGiangVienRole(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) {
      localStorage.removeItem('token')
      return <Navigate to="/" />
    }

    const user: UserData = pageData.user as UserData
    if (user.loaiNguoiDung !== 0) return <Navigate to={import.meta.env.VITE_HOCSINH_PAGE} />

    return <Component {...props} />
  }
}

export function withHocSinhRole(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) {
      localStorage.removeItem('token')
      return <Navigate to="/" />
    }

    const user: UserData = pageData.user as UserData
    if (user.loaiNguoiDung !== 1) return <Navigate to={import.meta.env.VITE_GIANGVIEN_PAGE} />

    return <Component {...props} />
  }
}

export function withAccount(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) return <Navigate to="/" />

    return <Component {...props} />
  }
}

export function withNoAccount(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) return <Component {...props} />

    const user = pageData.user as UserData
    if (user.loaiNguoiDung === 0) return <Navigate to="/giang-vien" />

    return <Navigate to="/" />
  }
}