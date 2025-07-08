import { withGiangVienRole } from "@/hoc/auth";
import { Navigate, useParams } from "react-router";

function Element() {
  const { lopId } = useParams()
  return <Navigate to={`/giang-vien/lop-hoc/${lopId}/danh-sach-lop`} />
}

const ChiTietLop = withGiangVienRole(Element)
export default ChiTietLop