import React, { useState } from 'react';
import { Grid, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';

import { CONFIRMATION_USER } from '../util/graphql';

function Confirmation(props) {
    const vTokenId = props.match.params.vtokenId;

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(confirmation, {
        email: '',
        token: vTokenId
    });

    const [confirmateUser, { loading, data }] = useMutation(CONFIRMATION_USER, {
        update() {
            //context.login(userData);
            //props.history.push('/');
        },
        onError(err) {
            if (err.graphQLErrors.length > 0)
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            else if (err.networkError.result.errors.length > 0)
                err.networkError.result.errors.map(error => console.log(error.message));
        },
        variables: values
    });

    function confirmation() { confirmateUser(); }

    if (data && data.confirmation) return (
        <div className="form-container">
            <h1>User Confirmation</h1>
            <p>{data.confirmation}: <a href='/login'>Go!</a></p>
        </div>
    );

    const markup = (
        <>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <p>Please enter the email account for confirmation</p>
                <Form.Input label='email' placeholder="username@mail.com" name="email" value={values.email} error={errors.email ? true : false} type="email" onChange={onChange} required />
                <Button type="submit" primary>Confirm</Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    );

    return (
        <Grid textAlign='center'>
            <Grid.Row only='tablet mobile'>
                <Grid.Column>
                    <h1>User Confirmation</h1>
                    <div className='flexRegister'>
                        {markup}
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row only='computer'>
                <Grid.Column width={10}>
                    <h1>Register</h1>
                    <div className='flexRegister flexRegister-computer'>
                        {markup}
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Confirmation;