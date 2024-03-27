import React, { useState } from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';

function Navbar({ changeMode }) {
  const [selectedRoundColor, setSelectedRoundColor] = useState(null);

  const handleRoundClick = (color) => {
    setSelectedRoundColor(color);
  };
  const [colors, setColors]=useState(
    [
      "yellow",
      "red",
      "blue",
      "black",
      "orange",
      "green"
    ]
  )

  return (
    <div>
      <nav style={{ backgroundColor: selectedRoundColor  }}>
        <div className="container">
          <NavLink to={"/"}><h1>Cooking Abdulaziz</h1></NavLink>
          <NavLink to={"/create"}><button>Create</button></NavLink>
        </div>
      </nav>
      <div className="container nav_bottom">
        <div className="round1" onClick={changeMode}>
        </div>
        <div className="rounds2">
          {
            colors.map((item)=>{
              return(
                <div className="round r1" style={{backgroundColor: item}} onClick={() => handleRoundClick(item)}></div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
