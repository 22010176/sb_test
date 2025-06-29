import type { AppData, PageAction, PageContext, UserData } from "@/App.types";
import { createContext } from "react";


const PageContext = createContext<PageContext>([{ user: 'loading' }, () => { }])

export function PageReducer(state: AppData, action: PageAction) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload as string | null | UserData
      }
    default:
      return state
  }
}

export default PageContext;