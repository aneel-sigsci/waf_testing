import express from 'express';
import { getPayloads } from '../utils/payloads.js';

const router = express.Router();

// Serve the HTML form
router.get('/', (req, res) => {
  const payloads = getPayloads();

  const htmlForm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WAF Testing Tool</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 2em;
        }
        .payloads {
          margin-top: 2em;
          border: 1px solid #ccc;
          padding: 1em;
          border-radius: 4px;
          background-color: #f9f9f9;
        }
        .payloads h2 {
          margin-top: 0;
        }
        .payload {
          font-family: monospace;
          background: #e7f1ff;
          padding: 0.5em;
          margin: 0.2em 0;
          border-radius: 4px;
        }
        #results {
          margin-top: 2em;
          border: 1px solid #ccc;
          padding: 1em;
          border-radius: 4px;
          background-color: #fffbe7;
          overflow-y: auto;
          max-height: 300px;
        }
        #results h2 {
          margin-top: 0;
        }
        #results div {
          font-family: monospace;
          margin: 0.2em 0;
        }
      </style>
    </head>
    <body>
      <h1>WAF Testing Tool</h1>
      <form id="test-form">
        <label for="target">Enter Target Host:</label>
        <input type="url" id="target" name="target" placeholder="https://example.com" required>
        <br>
        <label for="iterations">Number of Iterations:</label>
        <input type="number" id="iterations" name="iterations" min="1" value="1" required>
        <br>
        <button type="button" id="start-btn">Start Testing</button>
      </form>

      <div id="results">
        <h2>Test Results:</h2>
        <div id="live-results"></div>
      </div>

      <script>
        document.getElementById('start-btn').addEventListener('click', function () {
          const target = document.getElementById('target').value;
          const iterations = document.getElementById('iterations').value;
          const liveResults = document.getElementById('live-results');
          liveResults.innerHTML = '<p>Testing started...</p>';

          const eventSource = new EventSource('/start?target=' + encodeURIComponent(target) + '&iterations=' + encodeURIComponent(iterations));

          eventSource.onmessage = function (event) {
            const result = document.createElement('div');
            result.textContent = event.data;
            liveResults.appendChild(result);
          };

          eventSource.onerror = function () {
            const result = document.createElement('div');
            result.textContent = 'Testing completed or connection closed.';
            liveResults.appendChild(result);
            eventSource.close();
          };
        });
      </script>
    </body>
    </html>
  `;
  res.send(htmlForm);
});

export default router;
