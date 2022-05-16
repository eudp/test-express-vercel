const express = require("express");
const app = express();
const port = process.env.port || 3000;
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "heero_contents_dev",
  password: "",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});
app.get("/", async (req, res) => {
  const response = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  await client.end();
  res.status(200).json({ message: response.rows[0].message });
});

app.listen(port, () => {
  console.log(`Example app listening on port1 ${port}`);
});


module.exports = app;