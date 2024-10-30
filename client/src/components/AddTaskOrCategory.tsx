import React, { useState } from 'react'
import { useTaskStore } from '../store'

const BTN_CLASS = 'bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors py-2 px-4'

type AddTaskOrCategoryProps = {
  selectedCategoryId: string | null
}
export const AddTaskOrCategory = ({ selectedCategoryId }: AddTaskOrCategoryProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center w-full md:justify-between">
      <AddCategory />
      <AddTask selectedCategoryId={selectedCategoryId ?? ''} />
    </div>
  )
}

type AddTaskProps = {
  selectedCategoryId: string
}

const AddTask = ({ selectedCategoryId }: AddTaskProps) => {
  const addTask = useTaskStore(state => state.addTask)

  return (
    <AddButton
      onClick={() => addTask(selectedCategoryId)}
      isDisabled={!selectedCategoryId}
      className="w-full md:w-auto"
    >
      + Add Task
    </AddButton>
  )
}

const AddCategory = () => {
  const addCategory = useTaskStore(state => state.addCategory)
  const [category, setCategory] = useState('')

  return (
    <div className="relative flex-1 w-full">
      <input
        className="w-full py-2 border rounded focus:ring-blue-500"
        type="text"
        placeholder="Add Category"
        value={category}
        onChange={ev => setCategory(ev.target.value)}
        onKeyDown={ev => {
          if (ev.key === 'Enter') {
            setCategory('')
            addCategory(category)
          }
        }}
      />
      <AddButton
        className="absolute right-2 top-1/2 -translate-y-1/2"
        isDisabled={!category}
        onClick={() => {
          setCategory('')
          addCategory(category)
        }}
      >
        Add Category
      </AddButton>
    </div>
  )
}

type AddButtonProps = {
  onClick: () => void
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
}
const AddButton = ({ onClick, isDisabled = false, className = '', children }: AddButtonProps) => {
  return (
    <button
      className={`${className} ${BTN_CLASS} ${isDisabled ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
