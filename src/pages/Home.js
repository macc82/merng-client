import React, { useContext, useState } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { Card, Grid, Pagination } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const { user } = useContext(AuthContext);
    const { loading, error, data, refetch, networkStatus } = useQuery(FETCH_POSTS_QUERY, {
        variables: { page: currentPage },
        notifyOnNetworkStatusChange: true
    });

    const totalPages = data && data.getPosts && data.getPosts.totalPages ? data.getPosts.totalPages : 1;

    if (networkStatus === NetworkStatus.refetch) { return 'Refetching!'; }
    if (loading) return null;
    if (error) return `Error! ${error}`;

    function onPageChange(event, data) {
        setCurrentPage(data.activePage);
    }

    function onNewPost() {
        setCurrentPage(1);
        refetch();
    }

    function onDeletedPost() { refetch(); }

    return (
        <Grid columns='equal'>
            <Grid.Row className="page-title">
                <Grid.Column>
                    <h1>Recent Posts {user && (
                        <PostForm callback={onNewPost} />
                    )}
                    </h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign='left'>
                    <Card.Group stackable itemsPerRow={3}>
                        {data.getPosts.posts && data.getPosts.posts.map((post) => (
                            <PostCard key={post.id} post={post} callback={onDeletedPost} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{marginBottom: "2.5rem"}}>
                <Grid.Column textAlign='right'>
                    <Pagination totalPages={totalPages} onPageChange={onPageChange} activePage={currentPage} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Home;