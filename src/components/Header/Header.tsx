import type { ReactNode } from "react"
import iconMoon from '../../assets/icon-moon.svg';
import iconSun from '../../assets/icon-sun.svg'
import { useTheme } from "../../hooks/useTheme";
import clsx from "clsx";

const DARK = "dark"
const DEVFINDER = "devfinder"

Header.Logo = function Logo(){

  const {theme} = useTheme()

  const className = clsx({
    "font-mono font-bold text-[26px]": true,
    "text-neutral-900": theme === "ligth", 
    "text-neutral": theme === "dark", 
  })

  return (
    <h1 className={className}>{DEVFINDER}</h1>
  )
}

Header.ThemeToggle = function ThemeToggle(){
  const {theme, toggleTheme} = useTheme()
  
  const className = clsx({
    "uppercase font-mono font-bold text-[12px]": true, 
    "text-neutral-500" : theme === "ligth", 
    "text-neutral-200" : theme === "dark",
  })

  return(
    <div className="flex flex-row items-center gap-3">
      <label 
        htmlFor="theme-toggle" 
        className={className}
      >
        {DARK}
      </label>
      <button 
        id='theme-toggle' 
        className='cursor-pointer'
        onClick={() => toggleTheme()}
      >
        <img src={theme === "ligth" ? iconMoon : iconSun} alt="icon toggleTheme" />
      </button>
    </div>
  )
}

export default function Header(): ReactNode {
    return(
        <header className='flex justify-between mb-8'>
          <Header.Logo/>
          <Header.ThemeToggle />
        </header>
    )
}