import React, { useContext } from 'react'
import moment from 'moment';
import { Card, Button, Label, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';
import CommentForm from './CommentForm';

function SinglePostCard({ post: { id,
    body,
    createdAt,
    username,
    likes,
    likesCount,
    commentsCount },
    callback }) {

        const { user } = useContext(AuthContext);
    
    return (
        <Card fluid color='teal'>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likesCount }} />
                {user && <CommentForm postId={id} commentsCount={commentsCount} />}
                {!user &&
                    <MyPopup content="Comments on post">
                        <Button as="div" labelPosition='right'>
                            <Button basic color='blue'>
                                <Icon name='comments' />
                            </Button>
                            <Label basic color='blue' pointing='left'>
                                {commentsCount}
                            </Label>
                        </Button>
                    </MyPopup>
                }
                {user && user.username === username && <DeleteButton postId={id} callback={callback} />}
            </Card.Content>
        </Card>
    );
}
export default SinglePostCard;