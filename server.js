const express = require('express');
const app = express();

const blogRouter = require("./blogRouter");
app.use(express.static('public'));
app.get('/', (req, res) => {
  console.log("test");
  res.send("hi");
});

app.use("/blog", blogRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});