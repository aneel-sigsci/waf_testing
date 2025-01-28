import express from 'express';
import { getPayloads } from '../utils/payloads.js';
import { delay } from '../utils/helpers.js';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
  const targetHost = req.query.target;
  const iterations = parseInt(req.query.iterations, 10);

  // Validate input
  if (!targetHost) {
    return res.status(400).send('Error: Missing target host.');
  }

  if (!iterations || iterations < 1) {
    return res.status(400).send('Error: Iterations must be a positive integer.');
  }

  const payloads = getPayloads();
  const totalPayloads = payloads.length;

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Stream progress updates
  for (let iteration = 0; iteration < iterations; iteration++) {
    for (let i = 0; i < totalPayloads; i++) {
      const payload = payloads[i];
      const targetUrl = `${targetHost}?q=${encodeURIComponent(payload)}`;

      try {
        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'X-Forwarded-For': '192.168.1.100',
            'User-Agent': 'Mozilla/5.0 (WAF-Tester)',
          },
        });

        res.write(`data: Iteration ${iteration + 1}, Payload #${i + 1}: ${payload} - Status: ${response.status}\n\n`);
      } catch (error) {
        res.write(`data: Iteration ${iteration + 1}, Error with payload #${i + 1}: ${error.message}\n\n`);
      }

      await delay(500); // Simulate delay for better visualization
    }
  }

  // Signal completion
  res.write('data: Testing completed.\n\n');
  res.end();
});

export default router;
