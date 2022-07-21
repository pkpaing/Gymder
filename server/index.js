const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
require("dotenv").config();

const PORT = 8000;

express().use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

express().options("/*", (_, res) => {
  res.sendStatus(200);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

express().post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

express().get("/image/:fileName", function (req, res) {
  const filePath = res.sendFile(filePath); // find out the filePath based on given fileName
});

const uri =
  "mongodb+srv://pkpaing:gymder123@cluster0.4ta7f.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();
express().use(cors());
express().use(express.json());

express().get("/", (req, res) => {
  res.json("Hello to my app");
});

express().post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generateduserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generateduserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generateduserId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

express().post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });

      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

express().get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

express().get("/filtered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const location_pref = req.query.location_pref;
  const gender_pref = req.query.gender_pref;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = {
      $and: [
        {
          gym_location: { $in: location_pref },
        },
        {
          gender_identity: { $in: gender_pref },
        },
      ],
    };
    const foundUsers = await users.find(query).toArray();
    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

express().put("/user", async (req, res) => {
  console.log("im here");
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        age: formData.age,
        gym_location: formData.gym_location,
        training_type: formData.training_type,
        years_experience: formData.years_experience,
        gender_identity: formData.gender_identity,
        url1: formData.url1,
        image: formData.image,
        about: formData.about,
        matches: formData.matches,
        location_pref: formData.location_pref,
        gender_pref: formData.gender_pref,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);
    console.log(insertedUser);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
});

express().get("/read", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

express().get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

express().put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

express().get("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, correspondingUserId } = req.query;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };

    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

express().post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

express().listen(PORT, () => console.log("Server running on PORT " + PORT));
