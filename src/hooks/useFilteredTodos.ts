import { useState, useMemo, useTransition } from 'react'
import { Todo } from '../types'

const useFilteredTodos = (todos: Todo[]) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    const [isPending, startTransition] = useTransition()

    const filteredTodos = useMemo(() => {
        // имитация для проверки pending
        // const now = performance.now()
        // while (performance.now() - now < 500) {
        //     // 500 мс
        // }
        switch (filter) {
            case 'active':
                return todos.filter(t => !t.completed)
            case 'completed':
                return todos.filter(t => t.completed)
            default:
                return todos
        }
    }, [todos, filter])

    const safeSetFilter = (newFilter: typeof filter) => {
        startTransition(() => {
            setFilter(newFilter)
        })
    }

    return { filteredTodos, filter, setFilter: safeSetFilter, isPending }
}

export default useFilteredTodos