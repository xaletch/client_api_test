import { PropsWithChildren } from "react"
import { AuthProvider } from "../auth-provider"

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
