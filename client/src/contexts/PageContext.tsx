import type { AppData } from "@/App";
import { createContext } from "react";

const PageContext = createContext<AppData>({
  user: null
})

export default PageContext;