import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ReactDisqusComments from 'react-disqus-comments';

export const PureComments = ({ data, postTitle, postSlug }) => {
  const { url, disqusShortname } = data.site.siteMetadata;

  if (!disqusShortname) {
    return null;
  }

  return (
    <div>
      <ReactDisqusComments
        shortname={disqusShortname}
        identifier={postTitle}
        title={postTitle}
        url={url + postSlug}
        onNewComment={function handleNewComment(comment) {
          console.log(comment.text);
        }}
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
