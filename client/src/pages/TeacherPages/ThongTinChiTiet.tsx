import { withGiangVienRole } from "@/hoc/auth";
import { Navigate, useParams } from "react-router";

function Lop() {
  const { lopId } = useParams()
  return <Navigate to={`/giang-vien/lop-hoc/${lopId}/danh-sach-lop`} />
}
function KiThi() {
  const { idKiThi } = useParams()
  return <Navigate to={`/giang-vien/ki-thi/${idKiThi}/chi-tiet`} />
}

export const ChiTietLop = withGiangVienRole(Lop)
export const ChiTietKiThi = withGiangVienRole(KiThi)
