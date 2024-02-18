import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

async function handleSignOut() {
    try {
        await signOut({ global: true });
        console.log('YUESS');
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function SiteNav() {

    const navigate = useNavigate();

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            await signOut({ global: true });
            console.log('Successfully signed out');
            alert('Successfully Signed Out')
            localStorage.removeItem('isLoggedIn');
            navigate('/HomePage');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>Upstream</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-md-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                            {localStorage.getItem('isLoggedIn') === 'true' ? (
                                <div style={{ cursor: 'pointer' }} className='nav-link' onClick={handleSignOut}>
                                    Sign Out
                                </div>
                            ) : (
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/Register">Register</Nav.Link>
                                </>
                            )}
                            <Nav.Link href='/steamgames'>testAPI</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default SiteNav;