import React from 'react';
import { Grid } from 'semantic-ui-react';

import MobilePostCard from './mobile/PostCard';
import ComputerPostCard from './computer/PostCard';

function PostCard({ post, callback }) {
  return (
    <Grid style={{ margin: '0.05rem 0.25rem' }}>
      <Grid.Row only='mobile tablet'>
        <Grid.Column>
          <MobilePostCard post={post} callback={callback} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row only="computer">
        <Grid.Column>
          <ComputerPostCard post={post} callback={callback} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PostCard;