import { ShoppingCartIcon, SunIcon, MoonIcon } from "lucide-react"
import { useThemeStore } from '../store/useThemeStore'
import { useEffect } from 'react'

function Navbar() {
  const { theme, toggleTheme } = useThemeStore()
  
  // Set theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={`bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="size-9 text-primary"/>
            <span className="font-semibold font-mono tracking-widest text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              E-COMMERCE
            </span>
          </div>
          <button 
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar