import { NavLink } from "react-router-dom";
import useFarmData from "../hooks/useFarmData.js";


export default function Sidebar() {
  const { farm } = useFarmData();

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-mark">
            <img
              src="/logo.svg"
              alt="FeedBoard logo"
            />
          </div>

          <div>
            <div className="brand-name">
              FeedBoard
            </div>

            <div className="brand-subtitle">
              Grazing planner
            </div>
          </div>
        </div>


        <nav
          className="sidebar-nav"
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span aria-hidden="true">
              ▦
            </span>

            Planner
          </NavLink>


          <NavLink
            to="/farminfo"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span aria-hidden="true">
              ⌂
            </span>

            Farm information
          </NavLink>
        </nav>
      </div>


      <div className="farm-footer">
        <div className="farm-avatar">
          RF 
        </div>
<span className="farm-name">
  {farm?.information?.[0]?.farmName}
</span>
      </div>
    </aside>
  );
}