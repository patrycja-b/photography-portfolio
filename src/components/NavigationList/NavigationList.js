import React from "react";
import { Link } from "gatsby";

import "./NavigationList.scss";
import NavigationCollapsableItem from "../NavigationCollapsableItem/NavigationCollapsableItem";

const NavigationList = ({ items }) => {
  return (
    <ul className="nav-list">
      {items.map(item => (
        <li key={item.name}>
          {/* <div className="nav-list__link">{name}</div> */}
          {item.sublinks ? (
            <NavigationCollapsableItem navItem={item} />
          ) : (
            <Link to={item.link}>{item.name}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavigationList;
