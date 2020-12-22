import React, { useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import AvatarCarousel from '../components/AvatarCarousel';
import { DefaultAvatar } from '../components/AvatarCarousel';

import { REGISTER_USER } from '../util/graphql';

function Register(props) {
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatarImage: DefaultAvatar,
        host: window.location.host
    });

    const [addUser, { loading, data }] = useMutation(REGISTER_USER, {
        update() {
            //context.login(userData);
            //props.history.push('/');
        },
        onError(err) {
            if (err.graphQLErrors && err.graphQLErrors.length > 0)
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            else if (err.networkError && err.networkError.result.errors.length > 0)
                err.networkError.result.errors.map(error => console.log(error.message));
        },
        variables: values
    });

    function registerUser() { addUser(); }

    function onAvatarChange({ image }) {
        //Avatar selected, must change value in user
        onChange({ target: { name: 'avatarImage', value: image } });
    }

    if (data && data.register) {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column style={{ margin: 'auto', marginTop: '1rem' }} textAlign="center"><h1>Register</h1></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>{data.register}</Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    const markup = (
        <>
            
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} style={{width: '350px'}}>
                <Form.Input label='Username' placeholder="Username" name="username" value={values.username} error={errors.username ? true : false} type="text" onChange={onChange} required maxLength={50} />
                <Form.Input label='email' placeholder="username@mail.com" name="email" value={values.email} error={errors.email ? true : false} type="email" onChange={onChange} required />
                <Form.Input label='Password' placeholder="Password" name="password" value={values.password} error={errors.password ? true : false} type="password" onChange={onChange} required />
                <Form.Input label='Confirm Password' placeholder="Password" name="confirmPassword" value={values.confirmPassword} error={errors.confirmPassword ? true : false} type="password" onChange={onChange} required />
                <Form.Input name="avatarImage" type="text" onChange={onChange} value={values.avatarImage} style={{ display: 'none' }} />
                <AvatarCarousel callback={onAvatarChange} /><br/>
                <Button type="submit" primary floated='right'>Register</Button>
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
        <Grid textAlign='center'>
            <Grid.Row only='tablet mobile'>
                <Grid.Column>
                    <h1>Register</h1>
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

export default Register;