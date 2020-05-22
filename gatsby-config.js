module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    menuLinks: [
      {
        name: "people",
        link: "/people",
        sublinks: [
          {
            name: "baba",
            link: "people/baba",
          },
          {
            name: "second",
            link: "people/second",
          },
        ],
      },
      {
        name: "travels",
        link: "/travels",
        sublinks: [
          {
            name: "mountains",
            link: "travels/mountains",
          },
        ],
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/Layout.js`),
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Inria Serif`,
            variants: [`300`],
          },
          {
            family: `Open Sans`,
            variants: [`300`, `400`],
          },
        ],
      },
    },
  ],
};
