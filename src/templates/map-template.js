import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Geocode from 'react-geocode';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import SimpleMap from '../components/Map';

class MapTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      loading: true
    };
  }

  componentDidMount() {
    Geocode.setApiKey(process.env.GATSBY_GOOGLE_API_KEY);
    Geocode.enableDebug();
    console.log(this.props.data.allMarkdownRemark);
    this.props.data.allMarkdownRemark.edges.map((edge) => {
      edge.node.city.city.map((city) => {
        Geocode.fromAddress(`${city} ${edge.node.country.country}`)
          .then(
            (response) => {
              this.setState({
                markers: [...this.state.markers, response.results[0]]
              });
            },
            (error) => {
              console.error(error);
            }
          )
          .then(this.setState({ loading: false }));
      });
    });
  }

  render() {
    const countries = [];
    return (
      <Layout
        title={`Pays - ${this.props.data.site.siteMetadata.title}`}
        description={this.props.data.site.siteMetadata.subtitle}
      >
        <Sidebar />
        <Page title="Pays">
          <ul>
            {this.props.data.allMarkdownRemark.edges.map((edge) => {
              if (!countries.includes(edge.node.country.country)) {
                countries.push(edge.node.country.country);
                return (
                  <li key={edge.node.country.country}>
                    <Link to={`/country/${kebabCase(edge.node.country.country)}/`}>
                      {edge.node.country.country} ({edge.node.city.city.length})
                    </Link>
                  </li>
                );
              }
            })}
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
      edges {
        node {
          country: frontmatter {
            country
          }
          city: frontmatter {
            city
          }
        }
      }
    }
  }
`;

export default MapTemplate;
