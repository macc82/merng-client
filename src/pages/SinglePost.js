import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Card, Grid, Image, Button, Label, Icon, Pagination } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { FETCH_POST_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';
import CommentForm from '../components/CommentForm';

function SinglePost(props) {
    const limit = 5;
    const [currentPage, setCurrentPage ] = useState(1);

    const { user } = useContext(AuthContext);
    const postId = props.match.params.postId;
    
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    function deletePostCallback() {
        props.history.push('/');
    }

    function onPageChange(event, data) {
        setCurrentPage(data.activePage);
    }

    let postMarkup;
    if (!data || !data.getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likesCount,
            commentsCount,
            userAvatarImage
        } = data.getPost;

        postMarkup = (
            <Grid style={{marginTop: '1.5rem'}}>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated="right"
                            size="small"
                            src={`https://react.semantic-ui.com/images/avatar/large/${userAvatarImage}`}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid color='teal'>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likesCount }} />
                                { user && <CommentForm postId={postId} commentsCount={commentsCount} />}
                                { !user &&
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
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
                            </Card.Content>
                        </Card>
                        {Math.ceil(commentsCount / limit) > 1 && 
                        <Pagination totalPages={Math.ceil(commentsCount / limit)} 
                            onPageChange={onPageChange}
                            activePage={currentPage}
                            floated="right"
                            style={{marginBottom: '15px'}}
                        />}
                        {comments.slice(limit*(currentPage-1), limit*currentPage).map((comment) => 
                            {
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
                                )})}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

export default SinglePost;