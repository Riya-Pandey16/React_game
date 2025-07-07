import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { BsSearch, BsPlusCircle, BsCameraVideo } from "react-icons/bs";
import "./session.css";

interface Session {
  id: number;
  title: string;
  speaker: string;
  date: string;
  time: string;
  image: string;
  description: string;
}

const initialSessions: Session[] = [
  {
    id: 1,
    title: "Frontend Development with React",
    speaker: "Alice Johnson",
    date: "2025-07-10",
    time: "3:00 PM",
    image: "https://via.placeholder.com/150",
    description: "Learn modern frontend development using React and TypeScript.",
  },
  {
    id: 2,
    title: "Cracking Tech Interviews",
    speaker: "Bob Smith",
    date: "2025-07-12",
    time: "5:00 PM",
    image: "https://via.placeholder.com/150",
    description: "Get insider tips from Bob to land your next big tech job.",
  },
];

const Session = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState<Partial<Session>>({});
  const [joinedSessions, setJoinedSessions] = useState<number[]>([]);

  const handleCreateSession = () => {
    if (
      newSession.title &&
      newSession.speaker &&
      newSession.date &&
      newSession.time &&
      newSession.description
    ) {
      const newId = sessions.length + 1;
      const session: Session = {
        id: newId,
        title: newSession.title!,
        speaker: newSession.speaker!,
        date: newSession.date!,
        time: newSession.time!,
        image: newSession.image || "https://via.placeholder.com/150",
        description: newSession.description!,
      };
      setSessions([session, ...sessions]);
      setNewSession({});
      setShowModal(false);
    }
  };

  const handleJoin = (id: number) => {
    if (!joinedSessions.includes(id)) {
      setJoinedSessions([...joinedSessions, id]);
    }
  };

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(query.toLowerCase()) ||
      session.speaker.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">🎓 UniConnect Sessions</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <BsPlusCircle className="me-2" /> Create Session
        </Button>
      </div>

      <InputGroup className="mb-4 shadow-sm">
        <InputGroup.Text><BsSearch /></InputGroup.Text>
        <Form.Control
          placeholder="Search sessions or speakers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>

      <Row>
        {filteredSessions.map((session) => (
          <Col md={6} lg={4} key={session.id} className="mb-4">
            <Card className="session-card shadow-sm h-100">
              <Card.Img variant="top" src={session.image} className="session-img" />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  👤 {session.speaker}
                </Card.Subtitle>
                <Card.Text className="text-secondary small mb-2">
                  📅 {session.date} | 🕒 {session.time}
                </Card.Text>
                <Card.Text>{session.description}</Card.Text>
                <Button
                  variant={joinedSessions.includes(session.id) ? "secondary" : "primary"}
                  disabled={joinedSessions.includes(session.id)}
                  onClick={() => handleJoin(session.id)}
                  className="w-100"
                >
                  <BsCameraVideo className="me-2" />
                  {joinedSessions.includes(session.id) ? "Joined" : "Join Session"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {filteredSessions.length === 0 && (
          <p className="text-center text-muted">No sessions found.</p>
        )}
      </Row>

      {/* Create Session Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Session title"
                value={newSession.title || ""}
                onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Speaker</Form.Label>
              <Form.Control
                type="text"
                placeholder="Speaker name"
                value={newSession.speaker || ""}
                onChange={(e) => setNewSession({ ...newSession, speaker: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newSession.date || ""}
                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={newSession.time || ""}
                onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Optional image URL"
                value={newSession.image || ""}
                onChange={(e) => setNewSession({ ...newSession, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Brief description"
                value={newSession.description || ""}
                onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreateSession}>
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Session;
