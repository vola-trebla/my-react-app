import { useTheme } from './ThemeContext'

const boosts = [
    'Ты красавчик!',
    '🔥 Keep going!',
    'Ты почти на вершине!',
    'Пацан сказал — пацан сделал 💪',
    'Мотивация зашла в чат 🧠',
    'Пингвины бы тобой гордились 🐧',
]

const MoodBoost = () => {
    const random = Math.floor(Math.random() * boosts.length)

    const { theme } = useTheme()


    return (
        // <div style={{ marginTop: 30, background: '#eee', padding: 20, borderRadius: 8 }}>
        <div style={{
            background: theme === 'dark' ? '#333' : '#eee',
            color: theme === 'dark' ? '#fff' : '#000',
            padding: 20,
            borderRadius: 8,
            marginTop: 30
        }}>
            <h3>🎉 Boost of the moment:</h3>
            <p style={{ fontStyle: 'italic' }}>{boosts[random]}</p>
        </div>
    )
}

export default MoodBoost