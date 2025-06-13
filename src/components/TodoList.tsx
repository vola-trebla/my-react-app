import { Todo } from '../types'
import { useState } from 'react'

interface Props {
    todos: Todo[]
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (id: number, text: string) => void
}

const TodoList = ({ todos, onToggle, onDelete, onEdit }: Props) => {
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState('')

    const handleDoubleClick = (todo: Todo) => {
        setEditingId(todo.id)
        setEditText(todo.text)
    }

    const handleEditFinish = (id: number) => {
        if (editText.trim()) {
            onEdit(id, editText.trim())
        }
        setEditingId(null)
    }

    return (
        <ul>
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    onClick={() => onToggle(todo.id)}
                    onDoubleClick={() => handleDoubleClick(todo)}
                    style={{
                        cursor: 'pointer',
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        marginBottom: 10,
                    }}
                >
                    {editingId === todo.id ? (
                        <input
                            value={editText}
                            autoFocus
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={() => handleEditFinish(todo.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleEditFinish(todo.id)
                            }}
                            style={{ marginRight: 10 }}
                        />
                    ) : (
                        <>
                            {todo.text}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(todo.id)
                                }}
                                style={{ marginLeft: 10 }}
                            >
                                🗑
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default TodoList