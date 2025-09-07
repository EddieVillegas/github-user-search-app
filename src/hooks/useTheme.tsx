import { 
    useState,
    useContext, 
    createContext, 
} from "react";

type Props = {
    children: React.ReactNode
}

type Theme = "ligth" | "dark"

type Context = {
    theme: Theme,
    toggleTheme: () => void
}

const ThemeContext = createContext<Context | null>(null)

export default function Provider({ 
    children 
}: Props) {
    
    const [theme, setTheme] = useState<Theme>("ligth")

    const toggleTheme = () => setTheme(prev => prev === "ligth" ? "dark" : "ligth")

    // const colors = {
    //     neutral:{
    //         0:  "#FFF",
    //         100: "#F6F8FF",
    //         200: "#90A4D4",
    //         300: "#697C9A",
    //         500: "#4B6A9B",
    //         700: "#2B3442",
    //         800: "#1E2A47",
    //         900: "#141D2F"
    //     },
    //     blue: {
    //         300: "#60ABFF",
    //         500: "#0079FF"
    //     },
    //     red:{
    //         500: "#F74646"
    //     }
    // }

    return (
        <ThemeContext.Provider value={{
            theme, 
            toggleTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const themeContext = useContext(ThemeContext)
    if(!themeContext) throw new Error('useTheme needs useContext')
    return themeContext
}