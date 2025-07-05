import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  InputGroup,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile, BsMoonStars, BsSun, BsCheck2All } from "react-icons/bs";
import classNames from "classnames";
import "./Msg.css";

interface Message {
  from: string;
  text: string;
  time: string;
  file?: string;
  read?: boolean;
}

const users = ["Sonia", "Bob", "Alice", "Mahima"];

const Msg: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState("Sonia");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Simulate read ticks
  useEffect(() => {
    const updated = messages.map((msg) => ({ ...msg, read: true }));
    setMessages(updated);
  }, [selectedUser]);

  // Scroll to bottom
  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          from: "Me",
          text: input,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        },
      ]);
      setInput("");
      setIsTyping(false);
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setMessages((prev) => [
        ...prev,
        {
          from: "Me",
          text: e.target.files[0].name,
          file,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  return (
    <Container fluid className={`msg-container ${theme}`}>
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={3} className="bg-light border-end p-3 user-sidebar">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary fw-bold">👥 Users</h5>
            <Button
              variant={theme === "light" ? "outline-dark" : "outline-light"}
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <BsMoonStars /> : <BsSun />}
            </Button>
          </div>
          <Form.Control placeholder="Search users..." className="mb-3" />
          <ListGroup variant="flush">
            {users.map((user, idx) => (
              <ListGroup.Item
                key={idx}
                active={user === selectedUser}
                onClick={() => setSelectedUser(user)}
                action
              >
                <Image
                  src={`https://ui-avatars.com/api/?name=${user}`}
                  roundedCircle
                  width={30}
                  className="me-2"
                />
                {user}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Chat */}
        <Col md={9} className="d-flex flex-column p-3 chat-area">
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-success text-white fw-bold">
              Chat with {selectedUser}
            </Card.Header>
            <Card.Body className="chat-body overflow-auto" ref={chatBodyRef}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={classNames("d-flex flex-column mb-3", {
                    "align-items-end": msg.from === "Me",
                    "align-items-start": msg.from !== "Me",
                  })}
                >
                  <Card
                    bg={msg.from === "Me" ? "primary" : "light"}
                    text={msg.from === "Me" ? "white" : "dark"}
                    className="p-2 message-card"
                  >
                    {msg.file ? (
                      <a href={msg.file} target="_blank" rel="noreferrer" className="text-white">
                        📎 {msg.text}
                      </a>
                    ) : (
                      msg.text
                    )}
                  </Card>
                  <div className="d-flex align-items-center mt-1">
                    <small className="text-muted">{msg.time}</small>
                    {msg.from === "Me" && (
                      <BsCheck2All className={msg.read ? "ms-2 text-info" : "ms-2 text-muted"} />
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-muted small mt-2">{selectedUser} is typing...</div>
              )}
            </Card.Body>
          </Card>

          {/* Input Area */}
          <InputGroup className="chat-input">
            <Form.Control
              placeholder="Type a message..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsTyping(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="outline-secondary" onClick={() => fileInputRef.current?.click()}>
              📎
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowEmoji(!showEmoji)}>
              <BsEmojiSmile />
            </Button>
            <Button variant="success" onClick={handleSend}>
              Send
            </Button>
          </InputGroup>

          {showEmoji && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileUpload}
            accept="image/*,application/pdf"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Msg;
