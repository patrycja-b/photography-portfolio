import React, { useState } from "react";

import NavigationList from "../NavigationList/NavigationList";

const NavigationCollapsableItem = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>{navItem.name}</div>
      {isOpen && navItem.sublinks && (
        <NavigationList items={navItem.sublinks} />
      )}
    </div>
  );
};

export default NavigationCollapsableItem;
