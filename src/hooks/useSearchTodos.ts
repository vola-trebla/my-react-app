import { useState, useDeferredValue, useMemo } from 'react'
import { Todo } from '../types'

const useSearchTodos = (todos: Todo[]) => {
    const [searchTerm, setSearchTerm] = useState('')
    const deferredSearchTerm = useDeferredValue(searchTerm)

    const searchedTodos = useMemo(() => {
        return todos.filter(todo =>
            todo.text.toLowerCase().includes(deferredSearchTerm.toLowerCase())
        )
    }, [todos, deferredSearchTerm])

    return { searchedTodos, searchTerm, setSearchTerm }
}

export default useSearchTodos