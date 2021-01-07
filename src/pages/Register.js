import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Register = (props) => 
{

    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);

    const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
            ) {
            id
            email
            username
            createdAt
            token
            }
        }
        `;

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function registerUser() {
        addUser();
      }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(
            _,
            {
              data: { login: userData }
            }
          ) {
            context.login(userData);
          props.history.push('/');
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
      });

    return (
        <div className="form-container"> 
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
}

export default Register;