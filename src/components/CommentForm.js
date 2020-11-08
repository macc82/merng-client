import React, { useState } from 'react'
import { Button, Label, Icon, Form, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import MyPopup from '../util/MyPopup';
import { SUBMIT_COMMENT_MUTATION, FETCH_POST_QUERY } from '../util/graphql';

function CommentForm({ postId, commentsCount, callback }){
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        variables: { postId, body: comment},
        update: () => {
            setComment('');
            setErrors({});
            setOpen(false);
            if (callback) callback();
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
          setOpen(true);
        },
        refetchQueries: [{query: FETCH_POST_QUERY, variables: { postId }}]
    });

    function ValidateAndSubmit(event) {
        if (comment !== '')
            submitComment();
        else
            event.preventDefault();
    }

    return (
        <>
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
        <Modal open={open}
            onOpen={() => setOpen(true)}
            onClose={() => {
                setComment('');
                setErrors({});
                setOpen(false);
                }}
            trigger={<Button icon basic color='blue'><Icon.Group><Icon name="comment"/><Icon corner name="plus" /></Icon.Group></Button>}
            >
            <Modal.Header>Post a comment:</Modal.Header>
            <Modal.Content>
                <Form onSubmit={ValidateAndSubmit}>
                    <Form.Field>
                        <Form.Input
                        type="text"
                            placeholder="Comment..."
                            name="comment"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </Form.Field>
                </Form>
                {Object.keys(errors).length > 0 && (
                <div className="ui error message" style={{marginBottom: 20 }}>
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
                )}
            </Modal.Content>
            <Modal.Actions>
                <Button
                    type="submit"
                    color="teal"
                    disabled={comment.trim() === ''}
                    onClick={submitComment}>
                    Submit
                </Button>
            </Modal.Actions>
        </Modal>
        </>
    );
}

export default CommentForm;