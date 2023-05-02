import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

const root: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(<Main />);

function Main(): JSX.Element {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
