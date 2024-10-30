import { useCategoriesList } from '../store'
import { Button } from './Button'

type CategoryTabProps = {
  selectedCategoryId: string | null
  onCategoryChange: (category: string) => void
}
export const CategoryTab = ({ selectedCategoryId, onCategoryChange }: CategoryTabProps) => {
  const categories = useCategoriesList()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {categories.map(({ id, name, taskIds }) => (
        <Button
          key={id}
          onClick={() => {
            onCategoryChange(id)
          }}
          isSelected={selectedCategoryId === id}
        >
          {name} {taskIds.length}
        </Button>
      ))}
    </div>
  )
}
