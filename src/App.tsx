import { useState, useEffect, useMemo, useCallback } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import MoodBoost from './components/MoodBoost'
import Playground from './pages/Playground'
import useTheme from './hooks/useTheme'
import useTodos from './hooks/useTodos'
import { ThemeContext } from './components/ThemeContext'
import { Todo } from './types'
import './styles/theme.css'

const App = () => {
    const { todos, dispatch } = useTodos()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark' : ''
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const handleAdd = (text: string) => {
        dispatch({ type: 'add', payload: text })
    }

    const handleDelete = (id: number) => {
        dispatch({ type: 'delete', payload: id })
    }

    const handleToggle = (id: number) => {
        dispatch({ type: 'toggle', payload: id })
    }

    const handleEdit = (id: number, text: string) => {
        dispatch({ type: 'edit', payload: { id, text } })
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

                <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

                {todos.length > 0 && todos.length % 3 === 0 && <MoodBoost />}

                <Playground />
            </div>
        </ThemeContext.Provider>
    )
}

export default App