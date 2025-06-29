import type { AppData } from "@/App.types";
import { createContext } from "react";

const PageContext = createContext<AppData>({
  user: null
})

export default PageContext;