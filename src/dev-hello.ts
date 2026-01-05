import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.json({ message: 'Hello World' });
});

const port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Hello server listening on ${port}`);
  });
}

export default app;
