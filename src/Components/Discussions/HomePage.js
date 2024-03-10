import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';

function ForumPage() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'First Post', content: 'This is the first post content.' },
        { id: 2, title: 'Second Post', content: 'This is the second post content.' },
    ]);

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPostId = posts.length + 1;
        setPosts([...posts, { id: newPostId, title: postTitle, content: postContent }]);
        setPostTitle('');
        setPostContent('');
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={12}>
                    <h2>Forum</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formPostTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter post title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPostContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter post content"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Post
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4">
                {posts.map((post) => (
                    <Col xs={12} md={6} lg={4} key={post.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>
                                <Link to={{ pathname: `/post/${post.id}` }}>
                                    <Button variant="outline-primary">Read More</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ForumPage