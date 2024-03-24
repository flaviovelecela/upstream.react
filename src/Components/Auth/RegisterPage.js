import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { Link } from "react-router-dom";
import Tooltip_PassReq from "../Tooltips/Tooltip_PassReq";
import Tooltip_SteamID_Alert from "../Tooltips/Tooltip_SteamID_Alert";
import { useAuth } from "./useAuth";

function RegisterPage() {
    const navigate = useNavigate();

    const { setIsLoggedIn } = useAuth();

    async function handleSignUp({ DisplayName, SteamID, password, email }, setFormState) {
        console.log('Attempting to sign up:', email); // Debugging
        try {
            const { userId } = await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        'custom:DisplayName': DisplayName,
                        'custom:SteamID': SteamID,
                    },
                },
            });
    
            console.log('Sign up successful, user ID:', userId); // Debugging
            setFormState(prevState => ({ ...prevState, isSignUpComplete: true }));
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    async function handleSignUpConfirmation({ email, confirmationCode }, navigate, setIsLoggedIn) {
        console.log('Confirming sign up for:', email);
        try {
            await confirmSignUp({
                username: email,
                confirmationCode,
            });
            console.log('Sign up confirmation successful');
            setIsLoggedIn(true);
            console.log("(Register) User is logged in:", true)
            navigate('/login');
        } catch (error) {
            console.error('Error confirming sign up:', error);
        }
    }

    const [formState, setFormState] = useState({
        DisplayName: '',
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
                DisplayName: formState.DisplayName,
                SteamID: formState.SteamID,
                password: formState.password,
                email: formState.email
            }, setFormState);
        } else {
            await handleSignUpConfirmation({
                email: formState.email,
                confirmationCode: formState.confirmationCode
            }, navigate, setIsLoggedIn);
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

                    <Form.Group className="mb-3" controlId="DisplayName">
                            <Form.Label><div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>Display Name</div></Form.Label>
                            <Form.Control type="text" placeholder="Please enter your display name" value={formState.DisplayName} onChange={setFormValue('DisplayName')} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="SteamID">
                            <Form.Label><div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>SteamID<Tooltip_SteamID_Alert /></div></Form.Label>
                            <Form.Control type="text" placeholder="Enter Your SteamID" value={formState.SteamID} onChange={setFormValue('SteamID')} required />
                            <Form.Text className='text-muted'>
                                <a href="https://store.steampowered.com/account/" target="_blank">Please visit this link to obtain your SteamID</a>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Your Email" value={formState.email} onChange={setFormValue('email')} required />
                            <Form.Text className='text-muted'>
                                We'll never share your email!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label><div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>Password <Tooltip_PassReq /></div></Form.Label>
                            <Form.Control type="password" minLength="8" placeholder="Enter Password" value={formState.password} onChange={setFormValue('password')} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" minLength="8" placeholder="Confirm Password" value={formState.confirmPassword} onChange={setFormValue('confirmPassword')} required />
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

                        <Link
                            to='/'>
                            <Button variant="primary" type="button">Cancel</Button>
                        </Link>
                        &nbsp;&nbsp;
                        <Button variant="primary" type="submit">
                            {formState.isSignUpComplete ? 'Confirm' : 'Register'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;