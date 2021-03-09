import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import "./NavigationList.scss";
import NavigationCategorys, {
  navItemType,
} from "../NavigationCategory/NavigationCategory"; // navItemType,

const NavigationList = ({ items }) => {
  return (
    <ul className="nav-list">
      {items.map((item) => {
        return (
          <li key={item.name}>
            {item.sublinks && item.sublinks[0].type === "file" ? (
              <Link to={item.path} className="nav-list__link">
                {item.name}
              </Link>
            ) : (
              <NavigationCategorys navItem={item} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

NavigationList.propTypes = {
  items: PropTypes.arrayOf(navItemType).isRequired,
};

export default NavigationList;
