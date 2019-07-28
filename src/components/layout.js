import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'

import '../styles/index.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery query={graphql`
    query LayoutQuery
    {
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        copyright
      }
      allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
        edges {
          node {
            profileType
            url
          }
        }
      }
    }
  `}
  render={data => (
    <div className="container">
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      />
      <div className="container__header">
        <div className="headerbar">
          <div className="header__nav">
            <ul className="header__menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            <div className="header__social">
              {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                <a
                  key={profile.profileType}
                  href={profile.url}
                  target="blank"
                  className={`social social--${profile.profileType.toLowerCase()}`}
                > </a>
              ))}
            </div>
          </div>
          <div className="header__banner">
            <h6 className="header__title">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </h6>
            <div
              className="header__intro"
              dangerouslySetInnerHTML={{
                __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
              }}
            />
            <a href="#" className="cart__summary snipcart-summary snipcart-checkout">
              <div className="cart__summary-title">
                MY CART
              </div>
              <div className="cart__summary-line">
                Number of items: <span className="snipcart-total-items"></span>
              </div>
              <div className="cart__summary-line">
                Total price: <span className="snipcart-total-price"></span>
              </div>
            </a>
            <div className="header__copyright">{data.datoCmsHome.copyright}</div>
          </div>
        </div>
      </div>
      <div className="container__body">
        <div className="container__mobile-header">
          <div className="mobile-header">
            <div className="mobile-header__menu">
              <Link to="#" data-js="toggleSidebar" />
            </div>
            <div className="mobile-header__logo">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
    )}
  />
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
