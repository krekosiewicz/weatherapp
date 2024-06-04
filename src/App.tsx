/// <reference path="../global.d.ts" />

import './styles/main.scss';
import React from 'react';
import { Router } from './logic/router.tsx'


const App: React.FC = () => {
  return (
    <div className={'appContainer'}>
      <div className={'appContent'}>
        <Router></Router>
      </div>
    </div>
  );
}

export default App;
