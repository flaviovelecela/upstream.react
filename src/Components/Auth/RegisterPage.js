import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { Link } from "react-router-dom";
import Tooltip from "../Tooltips/Tooltip";

async function handleSignUp({ SteamID, password, email }, setFormState) {
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: email,
            password,
            options: {
                userAttributes: {
                    'custom:SteamID': SteamID
                },
            }
        });

        console.log(userId);
        setFormState(prevState => ({ ...prevState, isSignUpComplete: true }));
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function handleSignUpConfirmation({ email, confirmationCode }, navigate) {
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: email,
            confirmationCode
        });
        if (isSignUpComplete) {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/dashboard')
        }
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

function RegisterPage() {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        SteamID: '',
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: '',
        isSignUpComplete: false,
    })

    const setFormValue = (key) => (e) => {
        setFormState({ ...formState, [key]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formState.isSignUpComplete) {
            if (formState.password !== formState.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }

            await handleSignUp({
                SteamID: formState.SteamID,
                password: formState.password,
                email: formState.email
            }, setFormState);
        } else {
            await handleSignUpConfirmation({
                email:formState.email,
                confirmationCode: formState.confirmationCode
            }, navigate);
        }
    };

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Register</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="SteamID">
                            <Form.Label>SteamID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your SteamID" value={formState.SteamID} onChange={setFormValue('SteamID')} />
                            <Form.Text className='text-muted'>
                                <a href="https://store.steampowered.com/account/" target="_blank">Please visit this link to obtain your SteamID</a>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Your Email" value={formState.email} onChange={setFormValue('email')} />
                            <Form.Text className='text-muted'>
                                We'll never share your email!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label><div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>Password <Tooltip /></div></Form.Label>
                            <Form.Control type="password" minLength="8" placeholder="Enter Password" value={formState.password} onChange={setFormValue('password')} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" minLength="8" placeholder="Confirm Password" value={formState.confirmPassword} onChange={setFormValue('confirmPassword')} />
                        </Form.Group>

                        {
                            formState.isSignUpComplete && (
                                <Form.Group className="mb-3" controlId="formConfirmationCode">
                                    <Form.Label>Confirmation Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Confirmation Code"
                                        value={formState.confirmationCode}
                                        onChange={setFormValue('confirmationCode')}
                                    />
                                </Form.Group>
                            )
                        }

                        <Button variant="primary" type="submit">
                            {formState.isSignUpComplete ? 'Confirm': 'Register'}</Button>
                        &nbsp;&nbsp;
                        <Link
                            to='/'>
                            <Button variant="primary" type="button">Cancel &gt;&gt;</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;