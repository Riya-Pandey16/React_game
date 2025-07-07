import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  InputGroup,
  Image,
  Modal,
  Dropdown,
} from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaComment, FaShareSquare, FaTrash, FaMoon, FaSun } from 'react-icons/fa';
import reactStringReplace from 'react-string-replace';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: string[];
}

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const CURRENT_USER = 'You';

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const formatText = (text: string): React.ReactNode => {
    let result = reactStringReplace(text, /@(\w+)/g, (match, i) => (
      <span key={`mention-${i}`} className="text-primary fw-semibold">@{match}</span>
    ));
    result = reactStringReplace(result, /#(\w+)/g, (match, i) => (
      <span key={`hashtag-${i}`} className="text-success fw-semibold">#{match}</span>
    ));
    return result;
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleCommentSubmit = (postId: string) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleCreatePost = () => {
    const reader = new FileReader();
    if (newImage) {
      reader.onloadend = () => {
        const imageUrl = reader.result?.toString() || '';
        createPostEntry(imageUrl);
      };
      reader.readAsDataURL(newImage);
    } else {
      createPostEntry();
    }
  };

  const createPostEntry = (imageUrl?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: CURRENT_USER,
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: newContent,
      image: imageUrl,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewContent('');
    setNewImage(null);
    setShowModal(false);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  return (
    <div className="container mt-5 position-relative" style={{ maxWidth: '600px' }}>
      <Button
        className="mb-4 w-100 fw-bold rounded-4 text-white"
        style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', border: 'none' }}
        onClick={() => setShowModal(true)}
      >
        + Create New Post
      </Button>

      {posts.map((post) => (
        <Card
          key={post.id}
          className={`mb-4 border-0 rounded-4 shadow ${darkMode ? 'bg-secondary text-light' : 'bg-white'}`}
        >
          <Card.Body className="d-flex align-items-center justify-content-between pb-0">
            <div className="d-flex align-items-center">
              <Image
                src={post.avatar}
                roundedCircle
                width={45}
                height={45}
                className="me-3 border border-2"
              />
              <div>
                <h6 className="mb-0 fw-semibold">{post.author}</h6>
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
            {post.author === CURRENT_USER && (
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm" className="border-0 shadow-none">
                  ⋮
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeletePost(post.id)}>
                    <FaTrash className="me-2 text-danger" /> Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Card.Body>

          {post.image && (
            <Image src={post.image} alt="post" className="img-fluid rounded-0" />
          )}

          <Card.Body className="pt-2 pb-1 px-3">
            <div className="d-flex align-items-center gap-3 mb-2">
              <Button variant="link" onClick={() => handleLike(post.id)} className="p-0">
                {post.liked ? <FaHeart color="red" size={22} /> : <FaRegHeart size={22} />}
              </Button>
              <FaComment size={20} className="text-muted" />
              <FaShareSquare size={20} className="text-muted" />
            </div>
            <div className="fw-bold">{post.likes} likes</div>
            <div className="mt-2">{formatText(post.content)}</div>
          </Card.Body>

          <Card.Body className="pt-0 px-3">
            <div className="mt-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {post.comments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <span className="fw-semibold">User{index + 1}</span> {comment}
                </div>
              ))}
            </div>
          </Card.Body>

          <Card.Footer className="bg-transparent border-0 px-3 pb-3">
            <InputGroup>
              <Form.Control
                placeholder="Add a comment..."
                value={commentInputs[post.id] || ''}
                onChange={(e) =>
                  setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
                className="border-0 rounded-pill px-3"
              />
              <Button variant="outline-primary" onClick={() => handleCommentSubmit(post.id)}>
                Post
              </Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      ))}

      {/* Create Post Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">Create a New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Post Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="What's happening in your university?"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image (optional)</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreatePost} disabled={!newContent.trim()}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Floating Dark Mode Toggle */}
      <Button
        onClick={toggleTheme}
        className="position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg"
        style={{ width: '50px', height: '50px', zIndex: 999 }}
        variant={darkMode ? 'light' : 'dark'}
      >
        {darkMode ? <FaSun /> : <FaMoon color="white" />}
      </Button>
    </div>
  );
};

export default PostPage;
