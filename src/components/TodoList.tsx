import { Todo } from '../types'

interface Props {
    todos: Todo[]
    onToggle: (id: number) => void
}

const TodoList = ({ todos, onToggle }: Props) => {
    return (
        <ul>
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    onClick={() => onToggle(todo.id)}
                    style={{
                        cursor: 'pointer',
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        marginBottom: 10,
                    }}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    )
}

export default TodoList