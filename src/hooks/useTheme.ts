import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

export type Theme = 'light' | 'dark'

const useTheme = () => {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark' : ''
    }, [theme])

    return { theme, setTheme }
}

export default useTheme
