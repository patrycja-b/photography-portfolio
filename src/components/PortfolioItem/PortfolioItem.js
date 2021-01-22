import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
// import Img from "gatsby-image";

// import "./Gallery.scss";
import Img from "gatsby-image";

const PortfolioItem = ({ data }) =>
  console.log(data, 'DATA') || (
    <>
      <div>PortfolioItem</div>
      <Img
        className="gallery__image"
        key={data.file.id}
        fluid={data.file.childImageSharp.fluid}
      />
    </>
  );

export const query = graphql`
  query QueryItem($imageId: String) {
    file(id: { eq: $imageId }) {
      id
      name
      childImageSharp {
        id
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

PortfolioItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PortfolioItem;
