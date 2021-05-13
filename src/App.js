import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Routes from './routes';

import './global.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
