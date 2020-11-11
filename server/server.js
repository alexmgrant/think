import app from './app.js';

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
