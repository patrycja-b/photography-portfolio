exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allDirectory(filter: { name: { ne: "images" } }) {
        nodes {
          absolutePath
          name
        }
      }
    }
  `)
  data.allDirectory.nodes.forEach(node => {
    console.log(node)
    const slug = node.name
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/gallery.js`),
      context: { slug: slug },
    })
  })
}
