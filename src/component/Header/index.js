import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    return ( 
        <Navbar
        fixed="top"
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <Navbar.Brand href="/"><img src="/movie-32px.png"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#">Phim mới</Nav.Link>
              <NavDropdown title="Thể loại" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Tình cảm</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Hài hước</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Tâm lý</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Viễn tưởng</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                 Hành động
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" >
                Phim Bộ
              </Nav.Link>
              <Nav.Link href="#" >
                Phim Lẻ
              </Nav.Link>
              <Nav.Link href="#" >
                Phim Chiếu Rạp
              </Nav.Link>
            </Nav>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Button variant="outline-primary" className="ms-2">
                <Link href="/login">Login</Link>
              </Button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     );
}

export default Header;