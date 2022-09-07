import React from 'react';

import { AppRoutes } from './AppRoutes';
import { Footer } from './componets/Footer/Footer';
import { Header } from './componets/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-wrap">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
