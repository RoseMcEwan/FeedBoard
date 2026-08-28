import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useFarmData from "../hooks/useFarmData.js";


export default function Sidebar() {
  const [farmName, setFarmName] = useState("");
  const { farm } = useFarmData();


  useEffect(() => {
    async function loadFarmInfo() {
      try {
        const response = await fetch("/api/planner");

        if (!response.ok) {
          throw new Error(
            "Could not load farm information."
          );
        }

        const data = await response.json();

        setFarmName(
          data.information[0]?.farmName ?? ""
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadFarmInfo();
  }, []);


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
<span className="farm-name">{farm?.information[0].farmName}</span>
        <div>
          <strong>
            {farmName}
          </strong>
        </div>
      </div>
    </aside>
  );
}