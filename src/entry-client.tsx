/// <reference types="react/experimental" />

import ReactDOM from 'react-dom/client';
import './styles/main.scss';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './logic/store/store';
import { BrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
