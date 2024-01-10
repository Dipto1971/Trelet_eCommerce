import { Outlet } from 'react-router-dom';

import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Components/Footer';
import Header from './Components/Header';

const App = () => {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;