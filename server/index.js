const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.post("/reports", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("test").collection("reports");

    const item = await collection.insertOne(req.body);
    res.json({ message: "Report submitted", report: item });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.post("/users", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("test").collection("users");

    const user = await collection.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      return res.json({ message: "User found", user: user, success: true });
    };

    const item = await collection.insertOne(req.body);
    res.json({ message: "User Created", user: item, success: true, });
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).json({ error: "Internal Server Error", success: false, });
  } finally {
    await client.close();
  }
});

app.get("/users/:email/:password", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("test").collection("users");

    const user = await collection.findOne({
      email: req.params.email,
      password: req.params.password,
    });

    if(user) {
      return res.json({ message: "User found", user: user, success: true });
    } else {
      return res.json({ message: "Not Found", success: false })
    }
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).json({ error: "Internal Server Error", success: false, });
  } finally {
    await client.close();
  }
})

app.get("/reports", async (req, res) => {
  try {
    await client.connect();
    const reports = await client
      .db("test")
      .collection("reports")
      .find()
      .toArray();

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => console.log("App running on port 3000"));
