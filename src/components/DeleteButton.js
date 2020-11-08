import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';
import { clearCache } from '../util/hooks';

import {DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../util/graphql';

function DeleteButton({ postId, commentId, callback }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = (commentId) ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        variables: { postId: postId, commentId: commentId },
        update: (cache, result) => {
            setConfirmOpen(false);
            //Get the current list from cache
            if (!commentId)
            {
                clearCache(cache, 'getPosts');
            }
            if (callback) callback();
        }
    });

    return (
        <>
        <MyPopup content={(commentId) ? 'Delete comment' : 'Delete post'}>
            <Button icon color='red' floated='right' onClick={() => setConfirmOpen(true)}>
                <Icon name='trash'/>
            </Button>
        </MyPopup>
        <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePostOrComment}
        />
      </>
    );
}

export default DeleteButton;