import React from "react";
import { graphql } from "gatsby";

const Gallery = props => (
  <>
    <div>gallery</div>
    <div>{props.siteTitle}</div>
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

export default Gallery;
