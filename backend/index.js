require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Web3 } = require('web3');
const { Connection, PublicKey } = require('@solana/web3.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'BTCKILLER Trends Bot backend is running' });
});

// Example Ethereum web3 placeholder
if (process.env.ETHEREUM_RPC) {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_RPC));
  app.get('/eth/blocknumber', async (req, res) => {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      // Convert BigInt to string for JSON serialization
      res.json({ blockNumber: blockNumber.toString() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
} else {
  app.get('/eth/blocknumber', (req, res) => {
    res.json({ message: 'ETHEREUM_RPC not configured' });
  });
}

// Example Solana connection placeholder
if (process.env.SOLANA_RPC) {
  const connection = new Connection(process.env.SOLANA_RPC);
  app.get('/solana/slot', async (req, res) => {
    try {
      const slot = await connection.getSlot();
      res.json({ slot });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
} else {
  app.get('/solana/slot', (req, res) => {
    res.json({ message: 'SOLANA_RPC not configured' });
  });
}

// Simple trading signal endpoint (mock)
app.get('/signal/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const signals = ['BUY', 'SELL', 'HOLD'];
  const signal = signals[Math.floor(Math.random() * signals.length)];
  res.json({
    symbol,
    signal,
    timestamp: new Date().toISOString(),
    note: 'This is a mock signal for demonstration purposes.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});