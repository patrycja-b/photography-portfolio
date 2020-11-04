const { createFilePath } = require(`gatsby-source-filesystem`);
const PATH = require('path');
const dirTree = require("directory-tree");

const tree = dirTree("images");

const menuLinks = [
  {
    name: "people",
    link: "/people",
    sublinks: [
      {
        name: "baba",
        link: "/people/baba",
      },
      {
        name: "second",
        link: "/people/second",
      },
    ],
  },
  {
    name: "travels",
    link: "/travels",
    sublinks: [
      {
        name: "mountains",
        link: "/travels/mountains",
      },
    ],
  },
];

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "File") {
    // console.log(node, "NODE");
    createNodeField({
      node,
      name: "slug",
      value: `${node.relativeDirectory}/${node.id}`,
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const createSite = (linksArray) => {
    linksArray.forEach(async (menuLink) => {
      if (menuLink.sublinks) {
        createSite(menuLink.sublinks);
      } else {
        const slug = menuLink.name;

        const imgFiles = await graphql(`
        query {
          allFile(filter: { relativeDirectory: { regex: "${menuLink.link}/" } }) {
            edges {
              node {
                id
              }
            }
          }
        }
        `);

        imgFiles.data.allFile.edges.forEach(({ node: { id } }) => {
          actions.createPage({
            path: `${menuLink.link}/${id}`,
            component: require.resolve(
              `./src/components/PortfolioItem/PortfolioItem.js`
            ),
            context: { imageId: id },
          });
        });

        actions.createPage({
          path: menuLink.link,
          component: require.resolve(`./src/components/Gallery/Gallery.js`),
          context: { contextPath: `${menuLink.link}/` },
        });
      }
    });
  };

  createSite(menuLinks);
};
