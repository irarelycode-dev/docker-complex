const keys = require("./keys");

// Express app setup
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

//mongoose setup
(async function connectToDb() {
  try {
    const conn = await mongoose.connect("mongodb://mongo:27017");
  } catch (error) {
    console.log("error", error);
  }
})();

//redis client setup
const redis = require("redis");
const { Values } = require("./fib.schema");
const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
  retry_strategy: () => 1000,
});

const redisPub = redisClient.duplicate();

//express route handlers
app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/values/all", async (req, res) => {
  try {
    const values = await Values.find({});
    res.send(values);
  } catch (err) {
    console.log("err", err);
    res.send([]);
  }
});
app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(Object.keys(values).map((key) => values[key]));
  });
});
app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) return res.status(422).send("Index too high");
  redisClient.hset("values", index, "Nothing yet");
  redisPub.publish("insert", index);
  const values = new Values({ index });
  await values.save();
  res.send({ working: true });
});

app.listen(5000, (err) => console.log("listening on port 5000"));
