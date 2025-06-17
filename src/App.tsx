import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import MoodBoost from './components/MoodBoost'
import Playground from './pages/Playground'
import useTheme from './hooks/useTheme'
import useTodos from './hooks/useTodos'
import useFilteredTodos from './hooks/useFilteredTodos'
import { ThemeContext } from './components/ThemeContext'
import './styles/theme.css'

const App = () => {
    const { todos,  handleAdd, handleDelete, handleToggle, handleEdit } = useTodos()
    const { theme, setTheme } = useTheme()
    const { filteredTodos, filter, setFilter, isPending } = useFilteredTodos(todos)

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
                </div>

                <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

                {todos.length > 0 && todos.length % 3 === 0 && <MoodBoost />}

                <Playground />
            </div>
        </ThemeContext.Provider>
    )
}

export default App