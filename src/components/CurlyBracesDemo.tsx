const CurlyBracesDemo = () => {
    const user = 'Альберт'
    const age = 32
    const mood = age > 30 ? 'зрелый волчара 🐺' : 'молодой кодер 🧑‍💻'
    const numbers = [1, 2, 3, 4]

    return (
        <div>
            <h2>Привет, {user}!</h2>
            <p>Тебе {age} лет — ты {mood}</p>
            <p>Чётные числа:</p>
            <ul>
                {numbers.filter(n => n % 2 === 0).map(n => <li key={n}>{n}</li>)}
            </ul>
        </div>
    )
}

export default CurlyBracesDemo