import { useState, useEffect, useMemo, useCallback } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import MoodBoost from './components/MoodBoost'
import Playground from './pages/Playground'
import { ThemeContext } from './components/ThemeContext'
import { Todo } from './types'
import './styles/theme.css'

const App = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const saved = localStorage.getItem('todos')
            return saved ? JSON.parse(saved) : []
        } catch (err) {
            console.error('Ошибка чтения из localStorage:', err)
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos))
        } catch (err) {
            console.error('Ошибка записи в localStorage:', err)
        }
    }, [todos])

    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark' : ''
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const handleAdd = useCallback((text: string) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        }

        console.log('Добавляю задачу:', newTodo)

        setTodos((prev) => {
            const updated = [...prev, newTodo]
            console.log('После добавления будет список:', updated)
            return updated
        })
    }, [])

    const handleToggle = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        )
    }

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed)
            case 'completed':
                return todos.filter(todo => todo.completed)
            default:
                return todos
        }
    }, [todos, filter])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>🧠 MoodTask</h1>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </div>

                <TodoInput onAdd={handleAdd} />

                <div style={{ marginBottom: 20 }}>
                    <button onClick={() => setFilter('all')} disabled={filter === 'all'}>Все</button>
                    <button onClick={() => setFilter('active')} disabled={filter === 'active'}>Активные</button>
                    <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Завершённые</button>
                </div>

                <TodoList todos={filteredTodos} onToggle={handleToggle} />

                {todos.length > 0 && todos.length % 3 === 0 && <MoodBoost />}

                <Playground />
            </div>
        </ThemeContext.Provider>
    )
}

export default App