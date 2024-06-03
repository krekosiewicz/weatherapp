import express from 'express';
import { createServer as createViteServer } from 'vite';
import { render } from './entry-server';

async function createServer() {
    const app = express();

    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' }
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
        const url = req.originalUrl;

        try {
            const appHtml = await render(url, {});

            const html = `
            <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Vite SSR</title>
                </head>
                <body>
                  <div id="root">${appHtml}</div>
                </body>
              </html>`;

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.message);
        }
    });

    app.listen(3000, () => {
        console.log('Server is running at http://localhost:3000');
    });
}

createServer();
