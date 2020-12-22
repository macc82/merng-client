import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { Grid, Image, Pagination } from 'semantic-ui-react';

import CommentCard from '../components/CommentCard';
import { FETCH_POST_QUERY } from '../util/graphql';
import SinglePostCard from '../components/SinglePostCard';

function SinglePost(props) {
    const limit = 5;
    const [currentPage, setCurrentPage] = useState(1);

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
            username,
            comments,
            commentsCount,
            userAvatarImage
        } = data.getPost;

        postMarkup = (
            <Grid style={{ paddingTop: '.8rem', paddingBottom: '2.8rem' }}>
                <Grid.Row only='computer'>
                    <Grid.Column width={2}>
                        <Image
                            floated="right"
                            size="small"
                            src={`https://react.semantic-ui.com/images/avatar/large/${userAvatarImage}`}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <SinglePostCard post={data.getPost} callback={deletePostCallback} />
                        {Math.ceil(commentsCount / limit) > 1 &&
                            <Pagination totalPages={Math.ceil(commentsCount / limit)}
                                onPageChange={onPageChange}
                                activePage={currentPage}
                                floated="right"
                                style={{ marginBottom: '15px' }}
                            />}
                        {comments.slice(limit * (currentPage - 1), limit * currentPage).map((comment, index) => (
                                <CommentCard key={index} id={id} username={username} comment={comment} />
                            )
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row only='tablet mobile'>
                    <Grid.Column>
                        <Image
                            floated="left"
                            size="small"
                            src={`https://react.semantic-ui.com/images/avatar/large/${userAvatarImage}`}
                        />
                        <SinglePostCard post={data.getPost} callback={deletePostCallback} />
                        {Math.ceil(commentsCount / limit) > 1 &&
                            <Pagination totalPages={Math.ceil(commentsCount / limit)}
                                onPageChange={onPageChange}
                                activePage={currentPage}
                                floated="right"
                                style={{ marginBottom: '15px' }}
                            />}
                        {comments.slice(limit * (currentPage - 1), limit * currentPage).map((comment, index) => (
                                <CommentCard key={index} id={id} username={username} comment={comment} />
                            )
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

export default SinglePost;