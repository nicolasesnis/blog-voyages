import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ReactDisqusComments from 'react-disqus-comments';
import hideDisqusStyle from './hide-disqus-footer.css';

export const PureComments = ({ data, postTitle, postSlug }) => {
  const { url, disqusShortname } = data.site.siteMetadata;

  if (!disqusShortname) {
    return null;
  }

  return (
    <div style={hideDisqusStyle}>
      <ReactDisqusComments
        shortname={disqusShortname}
        identifier={postTitle}
        title={postTitle}
        url={url + postSlug}
        // onNewComment={function handleNewComment(comment) {
        //   console.log(comment.text);
        // }}
        // category_id="123456"
      />
    </div>
  );
};

export const Comments = (props) => (
  <StaticQuery
    query={graphql`
      query CommentsQuery {
        site {
          siteMetadata {
            disqusShortname
            url
          }
        }
      }
    `}
    render={(data) => <PureComments {...props} data={data} />}
  />
);

export default Comments;
