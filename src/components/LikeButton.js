import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Label, Icon } from 'semantic-ui-react';

import { LIKE_POST_MUTATION } from '../util/graphql';
import MyPopupExt from '../util/MyPopupExt';

function LikeButton({ user, post: { id, likesCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
        <Button color="teal" basic>
          <Icon name="heart" />
        </Button>
      )
  ) : (
      <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    );

  const likeContainer = user ? (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likesCount}
      </Label>
    </Button>
  ) : (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );

  if (likesCount > 10) {
    return (
      <MyPopupExt trigger={likeContainer}>
          <h4>Likes by:</h4>
          <ul>
              {likes.slice(0, 10).map((l, i) => {
                return (
                  <li key={i+1}>{l.username}</li>
                )
              })}
              <li key={0}>(Too many likes to show...)</li>
            </ul>
            {liked ? 'Unlike?' : 'Like?'}
      </MyPopupExt>
    );
  } else if (likesCount > 0) {
    return (
      <MyPopupExt
        trigger={likeContainer}>
          <h4>Likes by:</h4>
          <ul>
              {likes.map((l, i) => {
                return (
                  <li key={i+1}>{l.username}</li>
                )
              })}
            </ul>
            {liked ? 'Unlike?' : 'Like?'}
      </MyPopupExt>
    );
  } else {
    return (
      <MyPopupExt
        content={liked ? 'Unlike?' : 'Like?'}
        trigger={likeContainer}/>
    );
  }
}

export default LikeButton;