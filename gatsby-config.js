require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Aboriginal Art`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: env.DATO_API_TOKEN,
      },
    },
  ],
}
