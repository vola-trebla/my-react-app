import { useReducer, useCallback, useEffect } from 'react'
import { Todo } from '../types'
import useLocalStorage from './useLocalStorage'

type Action =
    | { type: 'add'; payload: string }
    | { type: 'toggle'; payload: number }
    | { type: 'delete'; payload: number }
    | { type: 'edit'; payload: { id: number; text: string } }
    | { type: 'clear' }

const reducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'add':
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            }
            return [...state, newTodo]
        case 'toggle':
            return state.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo,
            )
        case 'delete':
            return state.filter((todo) => todo.id !== action.payload)
        case 'edit':
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo,
            )
        case 'clear':
            return []
        default:
            return state
    }
}

const useTodos = () => {
    const [savedTodos, setSavedTodos] = useLocalStorage<Todo[]>('todos', [])

    // many tasks for check pending
    // const [savedTodos, setSavedTodos] = useLocalStorage<Todo[]>('todos',
    //     Array.from({ length: 10000 }, (_, i) => ({
    //         id: i,
    //         text: `Task ${i}`,
    //         completed: Math.random() > 0.5
    //     }))
    // )

    const [todos, dispatch] = useReducer(reducer, savedTodos)

    useEffect(() => {
        setSavedTodos(todos)
    }, [todos, setSavedTodos])

    const handleAdd = useCallback((text: string) => {
        dispatch({ type: 'add', payload: text })
    }, [])

    const handleDelete = useCallback((id: number) => {
        dispatch({ type: 'delete', payload: id })
    }, [])

    const handleToggle = useCallback((id: number) => {
        dispatch({ type: 'toggle', payload: id })
    }, [])

    const handleEdit = useCallback((id: number, text: string) => {
        dispatch({ type: 'edit', payload: { id, text } })
    }, [])

    const resetTodos = useCallback(() => {
        dispatch({ type: 'clear' })
    }, [dispatch])

    return { todos, handleAdd, handleDelete, handleToggle, handleEdit, resetTodos }
}

export default useTodos