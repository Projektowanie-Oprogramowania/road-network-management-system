import React from "react";
import { Link } from "react-router-dom";

interface INavbar {
    navbarList: Array<{
        "label":  string,
        "path": string
    }>
}

export const Navbar = (props: INavbar) => {
    return (
        <nav>
          <ul>
            {
                props.navbarList.map((v) => 
                    <li>
                        <Link to={v.path}>{v.label}</Link>
                    </li>)
            }
          </ul>
        </nav>
    )
  };