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
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: true,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcart',
      options: {
        apiKey: 'OWE4ZWQ5NjUtMGZmNi00NjM0LWEwYjUtZjIwMjVkY2RjOGNmNjM2OTk2NTQ0NzMzMjE1ODc0',
        autopop: true
      }
    },
  ],
}
