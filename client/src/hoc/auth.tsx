import { useContext, type FC, type JSX } from "react";
import { Navigate } from "react-router";

import type { PageContextData, UserData } from "@/App.types";
import { PageContext } from "@/contexts/PageContext";

const role = import.meta.env.VITE_ROLE;
const link = role === "STUDENT" ? import.meta.env.VITE_HOCSINH_PAGE : import.meta.env.VITE_GIANGVIEN_PAGE

export function withGiangVienRole(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) {
      localStorage.removeItem('token')
      return window.location.replace(link)
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
      return window.location.replace(link)
    }

    const user: UserData = pageData.user as UserData
    if (user.loaiNguoiDung !== 1) return document.location.replace(import.meta.env.VITE_GIANGVIEN_PAGE)

    return <Component {...props} />
  }
}

export function withAccount(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) return window.location.replace(link)

    return <Component {...props} />
  }
}

export function withNoAccount(Component: FC | string) {

  return (props: JSX.IntrinsicAttributes) => {
    const [pageData,]: PageContextData = useContext(PageContext) as PageContextData

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) return <Component {...props} />

    const user = pageData.user as UserData
    return window.location.replace(link)

    // return <Navigate to="/" />
  }
}