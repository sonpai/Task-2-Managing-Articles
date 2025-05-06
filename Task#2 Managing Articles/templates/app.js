//Sofia Kononenko Sham Hasson

const express = require("express");
const app = express();
const articleRoutes = require("./articles");
const productRoutes = require("./products");
const port = 3001;

app.use(express.json());

app.use("/articles", articleRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
