const { createFilePath } = require(`gatsby-source-filesystem`);
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
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;

//   // only create the slug for mdx files sourced from pages directory
//   if (node.fileAbsolutePath && node.fileAbsolutePath.includes(`images`)) {
//     const slug = createFilePath({ node, getNode, basePath: `images` });

//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     });
//   }
// };

exports.createPages = async function ({ actions, graphql }) {
  // const { data } = await graphql(`
  //   query {
  //     allDirectory(filter: { name: { ne: "images" } }) {
  //       nodes {
  //         absolutePath
  //         name
  //       }
  //     }
  //   }
  // `);
  const data = await graphql(`
    query {
      site {
        siteMetadata {
          menuLinks {
            link
            name
            sublinks {
              link
              name
            }
          }
        }
      }
    }
  `);

  const createSite = (linksArray) => {
    linksArray.forEach((menuLink) => {
      console.log(!!menuLink.sublinks, "menuLunk");
      if (menuLink.sublinks) {
        createSite(menuLink.sublinks);
      } else {
        const slug = menuLink.name;
        console.log("create", slug);

        actions.createPage({
          path: menuLink.link,
          component: require.resolve(`./src/components/Gallery/Gallery.js`),
          context: { contextPath: `${menuLink.link}/` },
        });
      }
    });
  };

  console.log(data);
  createSite(menuLinks);
};
