import app, { port } from './app.js';

app.listen(3000, () => {
  console.log(`app listening on port ${port}`);
});
