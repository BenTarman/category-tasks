import React from 'react'

type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
  isSelected?: boolean
}
export const Button = ({ onClick, isSelected = false, children }: ButtonProps) => {
  console.log('isSelected', isSelected)
  return (
    <button
      className={`p-4 rounded hover:bg-blue-300 w-[200px] ${isSelected ? 'bg-blue-300' : 'bg-gray-300 '}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
