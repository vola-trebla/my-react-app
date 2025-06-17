import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import MoodBoost from './components/MoodBoost'
import Playground from './pages/Playground'
import useTheme from './hooks/useTheme'
import useTodos from './hooks/useTodos'
import useFilteredTodos from './hooks/useFilteredTodos'
import useSearchTodos from './hooks/useSearchTodos'
import { ThemeContext } from './components/ThemeContext'
import './styles/theme.css'
import React from "react";

const App = () => {
    const { todos,  handleAdd, handleDelete, handleToggle, handleEdit, resetTodos } = useTodos()
    const { theme, setTheme } = useTheme()
    const { filteredTodos, filter, setFilter, isPending } = useFilteredTodos(todos)
    const { searchedTodos, searchTerm, setSearchTerm } = useSearchTodos(filteredTodos)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

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
                    <button
                        onClick={() => setFilter('all')}
                        disabled={isPending || filter === 'all'}
                    >Все
                    </button>

                    <button
                        onClick={() => setFilter('active')}
                        disabled={isPending || filter === 'active'}
                    >Активные
                    </button>

                    <button
                        onClick={() => setFilter('completed')}
                        disabled={isPending || filter === 'completed'}
                    >Завершённые
                    </button>

                    <button onClick={resetTodos} style={{ marginBottom: 10 }}>
                        🗑 Очистить все задачи
                    </button>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Поиск задач..."
                        style={{ marginBottom: 10, width: '100%', padding: 5 }}
                    />
                </div>

                <TodoList todos={searchedTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

                {todos.length > 0 && todos.length % 3 === 0 && <MoodBoost />}
                {searchedTodos.length === 0 && (
                    <p style={{ color: 'gray', textAlign: 'center', marginTop: 20 }}>
                        ❌ Ничего не найдено ❌
                    </p>
                )}

                <Playground />
            </div>
        </ThemeContext.Provider>
    )
}

export default App