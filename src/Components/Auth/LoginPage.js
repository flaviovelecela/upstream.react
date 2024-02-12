import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "aws-amplify/auth";

function LoginPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const user = await signIn({username: email, password});
            console.log(user);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/dashboard');
        } catch (error) {
            console.log('error signing in', error)
            alert(error)
        }
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Login</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}/>
                        </Form.Group>

                        <Button variant="primary" type="button"
                            onClick={handleSignIn}>Login &gt;&gt;</Button>
                        &nbsp;&nbsp;                      
                        <Link to ='/ResetPass'>
                            <Button variant="secondary" type="button">Reset Password &gt;&gt;</Button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                            to='/'>
                            <Button href="/ResetPass" variant="secondary" type="button">Cancel &gt;&gt;</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage