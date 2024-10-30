import { Button } from './Button'
import { useTaskList, useTaskStore } from '../store'

type TasksListProps = {
  selectedCategoryId: string | null
}
export const TasksList = ({ selectedCategoryId }: TasksListProps) => {
  const tasks = useTaskList(selectedCategoryId)
  const completeTask = useTaskStore(state => state.completeTask)

  return (
    <div className=" flex flex-col gap-2">
      {tasks.map(({ id, content }) => (
        <Button key={id} onClick={() => completeTask(id)}>
          {content}
        </Button>
      ))}
    </div>
  )
}
