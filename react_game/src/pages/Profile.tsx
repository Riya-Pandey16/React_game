import React, { useState, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Image,
} from 'react-bootstrap';
import './Profile.css'; // Optional external CSS if separating styles

interface UserProfile {
  id: number;
  name: string;
  branch: string;
  year: string;
  skills: string;
  about: string;
  pictureUrl?: string;
}

const Profile: React.FC = () => {
  const defaultUser: UserProfile = {
    id: 1,
    name: '',
    branch: '',
    year: '',
    skills: '',
    about: '',
    pictureUrl: '',
  };

  const initialProfiles: UserProfile[] = [
    {
      id: 2,
      name: 'Sonia',
      branch: 'IT',
      year: '3rd',
      skills: 'Python, Java',
      about: 'ML enthusiast',
      pictureUrl: '',
    },
    {
      id: 3,
      name: 'Bob',
      branch: 'CSE',
      year: '2nd',
      skills: 'React, Node.js',
      about: 'Full-stack developer',
      pictureUrl: '',
    },
    {
      id: 4,
      name: 'Alice',
      branch: 'ECE',
      year: '4th',
      skills: 'VLSI, C++',
      about: 'Loves hardware!',
      pictureUrl: '',
    },
  ];

  const [myProfile, setMyProfile] = useState<UserProfile>(defaultUser);
  const [profiles, setProfiles] = useState<UserProfile[]>(initialProfiles);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMyProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfiles = profiles.filter((p) => p.id !== myProfile.id);
    setProfiles([...updatedProfiles, myProfile]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMyProfile((prev) => ({
          ...prev,
          pictureUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.branch.toLowerCase().includes(search.toLowerCase()) ||
      p.skills.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4" style={{ backgroundColor: '#f8f9fc' }}>
      <h2 className="text-center mb-4 fade-in-top text-gradient">
        🌟 My Profile
      </h2>
      <Card className="p-4 mb-5 shadow-lg animated-card">
        <Form onSubmit={handleSaveProfile}>
          <Row>
            <Col md={4} className="text-center mb-3">
              <Image
                src={
                  myProfile.pictureUrl || 'https://via.placeholder.com/100'
                }
                roundedCircle
                width={100}
                height={100}
                className="mb-3 border border-2 border-primary profile-pic"
              />
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
              />
            </Col>
            <Col md={8}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={myProfile.name}
                      onChange={handleInputChange}
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Branch</Form.Label>
                    <Form.Control
                      name="branch"
                      value={myProfile.branch}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Year</Form.Label>
                    <Form.Control
                      name="year"
                      value={myProfile.year}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Skills</Form.Label>
                    <Form.Control
                      name="skills"
                      value={myProfile.skills}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">About</Form.Label>
                    <Form.Control
                      name="about"
                      value={myProfile.about}
                      as="textarea"
                      onChange={handleInputChange}
                      rows={3}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 pulse-button"
                  >
                    Save Profile
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>

      <h4 className="mb-3 fade-in-top">🔍 Search Other Profiles</h4>
      <Form.Control
        type="text"
        placeholder="Search by name, branch, or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 custom-input"
      />

      <Row>
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <Col md={4} key={profile.id} className="mb-4 fade-in-bottom">
              <Card className="shadow-sm h-100 text-center profile-card hover-lift">
                <Card.Body>
                  <Image
                    src={
                      profile.pictureUrl || 'https://via.placeholder.com/80'
                    }
                    roundedCircle
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      marginBottom: '10px',
                      border: '2px solid #4e73df',
                    }}
                  />
                  <Card.Title>{profile.name}</Card.Title>
                  <Card.Text>
                    <strong>Branch:</strong> {profile.branch}
                  </Card.Text>
                  <Card.Text>
                    <strong>Year:</strong> {profile.year}
                  </Card.Text>
                  <Card.Text>
                    <strong>Skills:</strong> {profile.skills}
                  </Card.Text>
                  <Card.Text className="text-muted">{profile.about}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No matching profiles found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
