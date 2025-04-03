import { useState } from 'react'

interface Props {
    onAdd: (text: string) => void
}

const TodoInput = ({ onAdd }: Props) => {
    const [text, setText] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            onAdd(text)
            setText('')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Что нужно сделать?"
                style={{ padding: 8, width: '60%', marginRight: 10 }}
            />
            <button type="submit" style={{ padding: '8px 12px' }}>
                Добавить
            </button>
        </form>
    )
}

export default TodoInput