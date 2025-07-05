import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { BsSearch, BsUpload } from 'react-icons/bs';

const Post: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <>
      
      {/* Main Container */}
      <Container className="my-5">
        {/* Share Section */}
        <Card className="shadow-sm p-4 mb-4">
          <Card.Title className="mb-3 fs-4 text-primary">
            📢 Share Your Ideas / Notes / Videos
          </Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your idea, note, or video link here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="d-block">Upload a file</Form.Label>
              <InputGroup>
                <InputGroup.Text><BsUpload /></InputGroup.Text>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit} className="w-100">
              Post
            </Button>
          </Form>
        </Card>

        {/* Search Section */}
        <InputGroup className="mb-4 shadow-sm">
          <InputGroup.Text><BsSearch /></InputGroup.Text>
          <Form.Control
            placeholder="Search posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {/* Recent Posts Header */}
        <h5 className="fw-bold mb-3">📝 Recent Posts</h5>

        {/* Dummy post example (replace with loop/map from backend) */}
        <Card className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>🚀 How to Learn React</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Posted by Jane Doe</Card.Subtitle>
            <Card.Text>
              React is a JavaScript library for building user interfaces. Start with components...
            </Card.Text>
            <div className="d-flex justify-content-end gap-3">
              <Button size="sm" variant="outline-primary">Like</Button>
              <Button size="sm" variant="outline-secondary">Comment</Button>
              <Button size="sm" variant="outline-success">Share</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Repeat cards as needed */}
      </Container>
    </>
  );
};

export default Post;
