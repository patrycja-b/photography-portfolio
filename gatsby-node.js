const dirTree = require("directory-tree");

const fs = require("fs");

const tree = dirTree("images");

const json = JSON.stringify(tree);
fs.writeFile("./src/menu.json", json, "utf8", (err) => {
  if (err) console.log("error", err);
});

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "File") {
    createNodeField({
      node,
      name: "slug",
      value: `${node.relativeDirectory}/${node.id}`,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const createSite = (linksArray) => {
    linksArray.forEach(async (menuItem) => {
      if (menuItem.children && menuItem.type === "directory") {
        const menuLink = menuItem.path.replace("images", "");

        const imgFiles = await graphql(`
        query {
          allFile(filter: { relativeDirectory: { regex: "${menuLink}/" } }) {
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
            path: `${menuLink}/${id}`,
            component: require.resolve(
              `./src/components/PortfolioItem/PortfolioItem.js`
            ),
            context: { imageId: id },
          });
        });

        actions.createPage({
          path: menuLink,
          component: require.resolve(`./src/components/Gallery/Gallery.js`),
          context: { contextPath: `${menuLink}/` },
        });

        createSite(menuItem.children);
      }
    });
  };

  createSite(tree.children);
};
