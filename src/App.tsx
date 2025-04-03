import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import MoodBoost from './components/MoodBoost'
import { Todo } from './types'
import './styles/theme.css'

let nextId = 1

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark' : ''
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const handleAdd = (text: string) => {
        setTodos([...todos, { id: nextId++, text, completed: false }])
    }

    const handleToggle = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        )
    }

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>🧠 MoodTask</h1>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>

            <TodoInput onAdd={handleAdd} />
            <TodoList todos={todos} onToggle={handleToggle} />
            {todos.length > 0 && todos.length % 3 === 0 && <MoodBoost />}
        </div>
    )
}

export default App