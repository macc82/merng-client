import React, { useContext, useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../util/graphql';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() { loginUser(); }

    const markup = (
        <>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input label='Username or email' placeholder="Username" name="username" value={values.username} error={errors.username ? true : false} type="text" onChange={onChange} required />
                <Form.Input label='Password' placeholder="Password" name="password" value={values.password} error={errors.password ? true : false} type="password" onChange={onChange} required />
                <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    return (
        <Grid>
            <Grid.Row only='tablet mobile'>
                <Grid.Column>
                {markup}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row only='computer'>
                <Grid.Column style={{margin: 'auto', marginTop: '1rem'}} width={4}>
                    {markup}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

}



export default Login;