import React from 'react';
import Container from '@material-ui/core/Container';
import './App.css';

import Dashboard from './Dashboard';
import Store from './Store';

function App() {
  return (
    <div className='App'>
      <Container maxWidth='sm'>
        <Store>
          <Dashboard />
        </Store>
      </Container>
    </div>
  );
}

export default App;
