import React from "react";
import { Col, Container } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <row>
          <Col className="text-center py-3">© {currentYear} Trelet</Col>
        </row>
      </Container>
    </footer>
  );
};

export default Footer;
