import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { DateTime } from "luxon";
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';
import MyPopup from '../../util/MyPopup';

function PostCard({
    post: { body, createdAt, id, username, likesCount, commentsCount, likes, userAvatarImage },
    callback
}) {
    const { user } = useContext(AuthContext);
    const moreDetail = '...(see detail for more)';
    const maxBodyLength = 50;

    return (
        <Card fluid>
            <Card.Content>
                <Image floated="right" size="tiny" src={`https://react.semantic-ui.com/images/avatar/large/${userAvatarImage}`} />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {DateTime.fromMillis(Number.parseInt(createdAt)).toRelative()}
                </Card.Meta>
                <Card.Description>{body.length > maxBodyLength ? body.substr(0, maxBodyLength) + moreDetail : body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likesCount }} />
                <MyPopup content='Comment on post'>
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button basic color='blue'>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentsCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} callback={callback} />}
            </Card.Content>
        </Card>
    );
}

export default PostCard;