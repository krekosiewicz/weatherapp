import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server';
import { store } from './logic/store/store'
import { Provider } from 'react-redux'
import App from '@/App.tsx'

interface IRenderProps {
  path: string;
}

export function render({path}: IRenderProps) {
  // return renderToPipeableStream(
  // Streaming: renderToPipeableStream is a streaming function introduced in React 18. It allows the server to start sending the HTML to the client
  // before the entire component tree is rendered. This improves the time to first byte (TTFB) and can make the application feel faster for the user.
  // Suspense Support: It supports React's Suspense component, allowing parts of the UI to be progressively hydrated as the data becomes available.


  // Blocking: renderToString is a blocking function. It renders the entire React component tree to a string before sending it to the client.
  // This means the server must wait until the entire HTML is generated before sending a response to the client.
  // return renderToString(

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </React.StrictMode>
  )
  console.log('Server Rendered HTML:', html);
  return { html }
}