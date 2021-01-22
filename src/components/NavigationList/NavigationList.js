import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import "./NavigationList.scss";
import NavigationCategorys, {
  navItemType,
} from "../NavigationCategory/NavigationCategory"; // navItemType,

const NavigationList = ({ items }) => {
  console.log("ITEMS", items);
  return (
    <ul className="nav-list">
      {items.map((item) => (
        <li key={item.name}>
          {/* <div className="nav-list__link">{name}</div> */}
          {item.sublinks ? (
            <NavigationCategorys navItem={item} />
          ) : (
            <Link to={item.path} className="nav-list__link">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

NavigationList.propTypes = {
  items: PropTypes.arrayOf(navItemType).isRequired,
};

export default NavigationList;
