import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

import "./Navigation.scss";

const query = graphql`
  {
    site {
      siteMetadata {
        menuLinks {
          name
          link
          sublinks {
            name
            link
          }
        }
      }
    }
  }
`;

const Navigation = ({ children }) => {
  const {
    site: {
      siteMetadata: { menuLinks },
    },
  } = useStaticQuery(query);
  return (
    <aside>
      <h1 className="header">PATRYCJA BATKO PHOTOGRAPHY</h1>
      <nav>
        <ul>
          {menuLinks.map(({ name, link, sublinks }) => (
            <>
              <li>
                <Link to={link}>{name}</Link>
              </li>
              {!!sublinks.length &&
                sublinks.map(({ name, link }) => <Link to={link}>{name}</Link>)}
            </>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Navigation;
