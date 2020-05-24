import React from "react";
import { graphql } from "gatsby";
// import PropTypes from "prop-types";

const Gallery = () => (
  <>
    <div>gallery</div>
  </>
);

export const query = graphql`
  query MyQuery($contextPath: String) {
    allFile(filter: { relativeDirectory: { regex: $contextPath } }) {
      edges {
        node {
          base
          childImageSharp {
            fluid {
              base64
            }
          }
        }
      }
    }
  }
`;

Gallery.propTypes = {
  // siteTitle: PropTypes.string.isRequired,
};

export default Gallery;
