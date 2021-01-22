const { createFilePath } = require(`gatsby-source-filesystem`)
const dirTree = require("directory-tree")

const fs = require("fs")

const tree = dirTree("images")
// console.log(tree);

const json = JSON.stringify(tree)
fs.writeFile("./src/menu.json", json, "utf8", function (err, result) {
  if (err) console.log("error", err)
})

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
]

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "File") {
    // console.log(node, "NODE");
    createNodeField({
      node,
      name: "slug",
      value: `${node.relativeDirectory}/${node.id}`,
    })
  }
}

exports.createPages = async function ({ actions, graphql }) {
  const createSite = linksArray => {
    linksArray.forEach(async menuItem => {
      if (menuItem.children && menuItem.type === "directory") {
        const slug = menuItem.name
        const menuLink = menuItem.path.replace("images", "")

        console.log(menuLink)

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
        `)

        imgFiles.data.allFile.edges.forEach(({ node: { id } }) => {
          actions.createPage({
            path: `${menuLink}/${id}`,
            component: require.resolve(
              `./src/components/PortfolioItem/PortfolioItem.js`
            ),
            context: { imageId: id },
          })
        })

        actions.createPage({
          path: menuLink,
          component: require.resolve(`./src/components/Gallery/Gallery.js`),
          context: { contextPath: `${menuLink}/` },
        })

        createSite(menuItem.children)
      }
    })
  }

  createSite(tree.children)
}
