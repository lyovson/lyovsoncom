import React from 'react'
import { ThemeProvider } from 'next-themes'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
