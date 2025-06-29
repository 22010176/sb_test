import { useContext, type FC, type JSX } from "react";
import { Navigate } from "react-router";

import PageContext from "@/contexts/PageContext";
import type { AppData, UserData } from "@/App.types";

export function withGiangVienRole(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const pageData: AppData = useContext(PageContext)

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) return <Navigate to="/" />

    const user: UserData = pageData.user as UserData
    if (user.loaiNguoiDung !== 0) return <Navigate to="/" />

    return <Component {...props} />
  }
}

export function withNoAccount(Component: FC | string) {
  return (props: JSX.IntrinsicAttributes) => {
    const pageData: AppData = useContext(PageContext)

    if (pageData.user === 'loading') return ""
    if (pageData.user === null) return <Component {...props} />

    const user = pageData.user as UserData
    if (user.loaiNguoiDung === 0) return <Navigate to="/giang-vien" />

    return <Navigate to="/" />
  }
}