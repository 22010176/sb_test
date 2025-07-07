import type { AppData, PageAction, UserData } from "@/App.types";
import { createContext } from "react";


const PageContext = createContext<unknown>([{ user: 'loading' }, () => { }])

function PageReducer(state: AppData, action: PageAction) {
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

export {
  PageContext,
  PageReducer
}

// export  PageContext;