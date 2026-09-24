// Local decision relay for the Ch.08 mobile workflow. This service never deploys or rolls back code.
const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');

const token = process.env.CODEX_WATCHDOG_TOKEN || '';
if (token.length < 32) {
  console.error('Set CODEX_WATCHDOG_TOKEN to a random value of at least 32 characters.');
  process.exit(1);
}

const app = express();
app.use(express.json({ limit: '1kb' }));
const port = Number(process.env.PORT || 8080);
const signalDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-watchdog-'));
const signalFile = path.join(signalDir, 'decision.json');

app.post('/api/mobile-reply', (req, res) => {
  const authorization = req.get('authorization') || '';
  const expected = Buffer.from(`Bearer ${token}`);
  const actual = Buffer.from(authorization);
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decision = req.body && req.body.userMessage === '1' ? 'approved'
    : req.body && req.body.userMessage === '0' ? 'denied' : null;
  if (!decision) {
    return res.status(400).json({ error: 'Reply with 1 (approve) or 0 (deny).' });
  }

  try {
    fs.writeFileSync(signalFile, JSON.stringify({ decision, at: new Date().toISOString() }), {
      encoding: 'utf8',
      mode: 0o600
    });
    return res.json({ decision, message: 'Decision recorded; no command was executed.' });
  } catch (error) {
    console.error('[Watchdog] Failed to record decision:', error);
    return res.status(500).json({ error: 'Failed to record decision.' });
  }
});

app.listen(port, '127.0.0.1', () => {
  console.log(`[Watchdog] Listening on http://127.0.0.1:${port}`);
  console.log(`[Watchdog] Decision file: ${signalFile}`);
});
