'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { store } from '/src/utils/store'
import { Provider } from 'react-redux'
import Navbar from '../components/Navbar'
import { ChatContextProvider } from "../context/chatContext"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <ChatContextProvider>
        <Provider store={store}>
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </Provider>
      </ChatContextProvider>
    </html>
  )
}
