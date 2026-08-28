import Sidebar from './components/Sidebar.jsx'
import PannerPage from './pages/Planner/PlannerPage.jsx'
import { Routes, Route } from "react-router-dom"
import FarmInfoPage from "./pages/FarmInfo/farmInfoPage.jsx"

export function App() {
  return (
  <div className="app-shell">
<Sidebar />

<main className="main-content">
<Routes>
  <Route path="/" element={<PannerPage />} />
  <Route path="/farminfo" element={<FarmInfoPage />} />
</Routes>
</main>
</div>
  );
}

