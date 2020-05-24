import React, { useState } from "react";
import PropTypes from "prop-types";
import NavigationList from "../NavigationList/NavigationList";

import "./NavigationCategory.scss";

const NavigationCategory = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="nav-list__category"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {navItem.name}
      </button>
      {isOpen && navItem.sublinks && (
        <NavigationList items={navItem.sublinks} />
      )}
    </div>
  );
};

const navItemShape = {
  name: PropTypes.string.isRequired,
};
navItemShape.subLinks = PropTypes.arrayOf(PropTypes.shape(navItemShape));

export const navItemType = PropTypes.shape(navItemShape);

NavigationCategory.propTypes = {
  navItem: navItemType.isRequired,
};

export default NavigationCategory;
