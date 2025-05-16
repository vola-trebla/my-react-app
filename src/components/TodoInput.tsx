import { useRef } from 'react'
import React from 'react'

interface Props {
    onAdd: (text: string) => void
}

const TodoInput = ({ onAdd }: Props) => {
    console.log('🔁 <TodoInput /> ререндер')

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const text = inputRef.current?.value.trim()
        if (text) {
            onAdd(text)
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input
                ref={inputRef}
                placeholder="Что нужно сделать?"
                style={{ padding: 8, width: '60%', marginRight: 10 }}
            />
            <button type="submit" style={{ padding: '8px 12px' }}>
                Добавить
            </button>
        </form>
    )
}

export default React.memo(TodoInput)