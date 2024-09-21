import React from 'react'
import { atom } from 'jotai'

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const gameDetailsAtom = atom({
  isRunning: true,
  isPaused: false,
})
export const ballIsActiveAtom = atom(false)
export const swipeAtom = atom(0)
