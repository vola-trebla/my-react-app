import { useReducer, useEffect } from 'react'
import { Todo } from '../types'

type Action =
    | { type: 'add'; payload: string }
    | { type: 'toggle'; payload: number }
    | { type: 'delete'; payload: number }
    | { type: 'edit'; payload: { id: number; text: string } }

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
        default:
            return state
    }
}

const useTodos = () => {
    const init = (): Todo[] => {
        try {
            const saved = localStorage.getItem('todos')
            return saved ? JSON.parse(saved) : []
        } catch (err) {
            console.error('Ошибка чтения из localStorage:', err)
            return []
        }
    }

    const [todos, dispatch] = useReducer(reducer, [], init)

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos))
        } catch (err) {
            console.error('Ошибка записи в localStorage:', err)
        }
    }, [todos])

    return { todos, dispatch }
}

export default useTodos
