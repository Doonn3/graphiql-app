import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(<Main />);

function Main(): JSX.Element {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
