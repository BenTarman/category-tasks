import { useMemo } from 'react'
import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'

type Task = {
  id: string
  content: string
  categoryId: string
}

type Category = {
  id: string
  name: string
  // pretending there can be more to a task and normalizing the data
  taskIds: string[]
}

interface TaskStore {
  tasks: Record<string, Task>
  categories: Record<string, Category>
  // Actions
  addTask: (categoryId: string) => void
  completeTask: (taskId: string) => void
  addCategory: (name: string) => void
}

export const useTaskStore = create<TaskStore>(set => ({
  // Normalized state
  tasks: {
    task1: { id: 'task1', content: 'personal_task_1', categoryId: 'personal' },
    task2: { id: 'task2', content: 'personal_task_2', categoryId: 'personal' },
    task3: { id: 'task3', content: 'work_task_1', categoryId: 'work' },
    task4: { id: 'task4', content: 'work_task_2', categoryId: 'work' },
    task5: { id: 'task5', content: 'family_task_1', categoryId: 'family' }
  },
  categories: {
    personal: {
      id: 'personal',
      name: 'Personal',
      taskIds: ['task1', 'task2']
    },
    work: {
      id: 'work',
      name: 'Work',
      taskIds: ['task3', 'task4']
    },
    family: {
      id: 'family',
      name: 'Family',
      taskIds: ['task5']
    }
  },

  // Actions
  addTask: (categoryId: string) =>
    set(state => {
      const newTaskId = `task_${Date.now()}`

      // auto generate content based off category
      // in full app probably have an <input> or <textarea> where user gives content
      const content = `${state.categories[categoryId].name.toLowerCase()}_task
      ${state.categories[categoryId].taskIds.length + 1}`

      const newTask: Task = {
        id: newTaskId,
        content,
        categoryId
      }

      return {
        tasks: {
          ...state.tasks,
          [newTaskId]: newTask
        },
        categories: {
          ...state.categories,
          [categoryId]: {
            ...state.categories[categoryId],
            taskIds: [...state.categories[categoryId].taskIds, newTaskId]
          }
        }
      }
    }),

  completeTask: (taskId: string) =>
    set(state => {
      const { [taskId]: _, ...remainingTasks } = state.tasks

      const task = state.tasks[taskId]
      return {
        categories: {
          ...state.categories,
          [task.categoryId]: {
            ...state.categories[task.categoryId],
            taskIds: state.categories[task.categoryId].taskIds.filter(id => id !== taskId)
          }
        },
        tasks: remainingTasks
      }
    }),

  addCategory: (name: string) =>
    set(state => {
      const newCategoryId = name.toLowerCase().replace(/\s+/g, '-')
      return {
        categories: {
          ...state.categories,
          [newCategoryId]: {
            id: newCategoryId,
            name,
            taskIds: []
          }
        }
      }
    })
}))

export const useTaskList = (selectedCategoryId: string | null) => {
  const { tasks, categories } = useTaskStore(
    useShallow(state => ({ tasks: state.tasks, categories: state.categories }))
  )

  // Memoize based on relevant dependencies
  const derivedTasks = useMemo(() => {
    if (!selectedCategoryId) {
      return Object.values(tasks)
    }

    const category = categories[selectedCategoryId]
    if (!category) {
      return []
    }

    return category.taskIds.map(taskId => tasks[taskId])
  }, [selectedCategoryId, tasks, categories])

  return derivedTasks
}

export const useCategoriesList = () => useTaskStore(useShallow(state => Object.values(state.categories)))

export type { Task, Category }
