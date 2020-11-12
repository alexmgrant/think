import app from './app.js';

let port = process.env.PORT;
if (port == null || port == '') {
  port = process.env.PORT;
}
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
