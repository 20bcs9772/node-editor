import { useTheme } from "../themeContext"
import { Moon, Sun, Menu } from "lucide-react"
import "./Header.css"

export const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <div className="logo-section">
          <div>
            <h1 className="app-title">Node Editor</h1>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}
