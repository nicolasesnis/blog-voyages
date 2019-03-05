import React from 'react';
import { Link } from 'gatsby';
import script from 'applause-button';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import applauseStyles from './applause-button.css';

const Post = ({ post }) => {
  const {
    tags, title, date, country
  } = post.frontmatter;

  const { html } = post;
  const { tagSlugs } = post.fields;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">
        All Articles
      </Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} country={country} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />

        <Tags tags={tags} tagSlugs={tagSlugs} />
        <applause-button
          color="black"
          className={applauseStyles}
          style={{ width: '50px', height: '50px', margin: 'auto' }}
        />
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={post.fields.slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
