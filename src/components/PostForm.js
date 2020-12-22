import React, {useState} from 'react';
import { Button, Form, Modal, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm, clearCache } from '../util/hooks';
import { CREATE_POST_MUTATION } from '../util/graphql';

function PostForm({ callback }){
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(cache, result) {
          values.body = '';
          setErrors({});
          setOpen(false);

          clearCache(cache, 'getPosts');

          callback(cache, result);
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
          setOpen(true);
        }
    });

    function createPostCallback() {
        createPost();
    }

    return (
        
        <Modal open={open}
          onOpen={() => setOpen(true)}
          onClose={() => {
            values.body = '';
            setErrors({});
            setOpen(false);
            }}
          trigger={<Button icon><Icon name='plus'/></Button>}
        >
          <Modal.Header>Create a post:</Modal.Header>
          <Modal.Content>
            <Form onSubmit={onSubmit}>
              <Form.Field style={{marginBottom: ".5em"}}>
                <Form.TextArea
                  placeholder="Write new post content..."
                  name="body"
                  maxLength="500"
                  rows={4}
                  style={{resize: "none"}}
                  onChange={onChange}
                  value={values.body}
                  error={Object.keys(errors).length > 0 ? true : false}
                />
              </Form.Field>
              <Form.Field style={{textAlign: "right"}}>
                <Label style={{fontSize: ".8rem", fontWeight: "bold", color:"rgba(0,0,0,.4)", background: "transparent", padding: "0"}}>{values.body.length + "/500"}</Label>
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
            <Button type="submit" color="teal" onClick={onSubmit}>
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
  );
}

export default PostForm;