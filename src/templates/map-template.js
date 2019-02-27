import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import SimpleMap from '../components/Map';

const TagsListTemplate = ({ data }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const { group } = data.allMarkdownRemark;

  return (
    <Layout title={`Pays - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Pays">
        <ul>
          {group.map((country) => (
            <li key={country.fieldValue}>
              <Link to={`/country/${kebabCase(country.fieldValue)}/`}>
                {country.fieldValue} ({country.totalCount})
              </Link>
            </li>
          ))}
        </ul>
        <SimpleMap />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query MapQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }) {
      group(field: frontmatter___country) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsListTemplate;
