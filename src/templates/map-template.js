import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Geocode from 'react-geocode';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import SimpleMap from '../components/Map';

class TagsListTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      loading: true
    };
  }

  componentDidMount() {
    Geocode.setApiKey(process.env.GOOGLE_API_KEY);
    Geocode.enableDebug();
    this.props.data.allMarkdownRemark.group.map((country) => Geocode.fromAddress(country.fieldValue)
      .then(
        (response) => {
          this.setState({
            markers: [...this.state.markers, response.results[0].geometry.location]
          });
        },
        (error) => {
          console.error(error);
        }
      )
      .then(this.setState({ loading: false })));
  }

  render() {
    return (
      <Layout title={`Pays - ${this.props.data.title}`} description={this.props.data.subtitle}>
        <Sidebar />
        <Page title="Pays">
          <ul>
            {this.props.data.allMarkdownRemark.group.map((country) => (
              <li key={country.fieldValue}>
                <Link to={`/country/${kebabCase(country.fieldValue)}/`}>
                  {country.fieldValue} ({country.totalCount})
                </Link>
              </li>
            ))}
          </ul>
          {this.state.loading ? <div /> : <SimpleMap markers={this.state.markers} />}
        </Page>
      </Layout>
    );
  }
}

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
