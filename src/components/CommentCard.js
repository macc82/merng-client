import React, { useContext } from 'react'
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';

function CommentCard({ id, username, comment }) {
    const { user } = useContext(AuthContext);

    const color = (username === comment.username) ? 'teal' : 'red';
    const floated = (username === comment.username) ? 'left' : 'right';
    const textAlign = (username === comment.username) ? 'right' : 'left';
    return (
        <Card fluid key={comment.id} color={color}>
            <Card.Content>
                <Image
                    floated={floated}
                    size="mini"
                    src={`https://react.semantic-ui.com/images/avatar/large/${comment.commentAvatarImage}`}
                />
                <Card.Header textAlign={textAlign}>{comment.username}</Card.Header>
                <Card.Meta textAlign={textAlign}>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
                {user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id} />}
            </Card.Content>
        </Card>
    );
}

export default CommentCard;