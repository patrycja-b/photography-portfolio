import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const Gallery = ({ data }) => (
  <>
    <div>gallery</div>
    {data.allFile.edges.map(({ node: { childImageSharp: { fluid, id } } }) => (
      <Img key={id} fluid={fluid} />
    ))}
  </>
);

export const query = graphql`
  query MyQuery($contextPath: String) {
    allFile(filter: { relativeDirectory: { regex: $contextPath } }) {
      edges {
        node {
          childImageSharp {
            id
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Gallery;
