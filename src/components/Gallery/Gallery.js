import React from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"

import Img from "gatsby-image"
// import { tree } from "../../../gatsby-node"

import "./Gallery.scss"

// console.log(tree, "GALLERY")

const Gallery = ({ data }) => (
  <>
    <div>gallery</div>
    {data.allFile.edges.map(
      ({
        node: {
          id: nodeId,
          fields: { slug },
          childImageSharp: { fluid },
        },
      }) => (
        <Link key={nodeId} to={slug}>
          <Img className='gallery__image' key={nodeId} fluid={fluid} />
        </Link>
      )
    )}
  </>
)

export const query = graphql`
  query QueryGallery($contextPath: String) {
    allFile(filter: { relativeDirectory: { regex: $contextPath } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          relativePath
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Gallery
