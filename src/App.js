import { useState } from "react";
import { PipelineUI } from "./ui";
import { ThemeProvider } from "./themeContext";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import "./App.css";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="app-main">
        <Sidebar isOpen={sidebarOpen} />
        <div className="app-content">
          <PipelineUI />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
