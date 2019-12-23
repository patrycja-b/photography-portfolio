exports.createPages = async function({ actions, graphql }) {
  // const { data } = await graphql(`
  //   query {
  //     allDirectory(filter: { name: { ne: "images" } }) {
  //       nodes {
  //         absolutePath
  //         name
  //       }
  //     }
  //   }
  // `)
  const data = await graphql(`
    query {
      allSite {
        nodes {
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
    }
  `)
  console.log(data)
  // site.c.menuLinks.forEach(node => {
  //   // console.log(node)
  //   const slug = node.name
  //   actions.createPage({
  //     path: slug,
  //     component: require.resolve(`./src/components/gallery.js`),
  //     context: { slug: slug },
  //   })
  // })
}
