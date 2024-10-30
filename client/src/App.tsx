import { useState } from 'react'
import { CategoryTab } from './components/CategoryTab'
import { TasksList } from './components/TasksList'
import { AddTaskOrCategory } from './components/AddTaskOrCategory'

export type CategoryItem = {
  title: string
  tasks: string[]
}

export type Task = string

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  const onCategoryChange = (categoryId: string) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null)
      return
    }
    setSelectedCategoryId(categoryId)
  }
  return (
    <div className="min-h-screen w-full max-w-[800px] mx-auto px-4 md:px-6">
      <header className="mb-4 ">
        <h1 className="text-2xl mb-2">Eluve Interview</h1>
        <AddTaskOrCategory selectedCategoryId={selectedCategoryId} />
      </header>
      <main>
        <div className="mb-8 pb-8 border-b border-gray-200">
          <CategoryTab selectedCategoryId={selectedCategoryId} onCategoryChange={onCategoryChange} />
        </div>
        <TasksList selectedCategoryId={selectedCategoryId} />
      </main>
    </div>
  )
}

export default App
