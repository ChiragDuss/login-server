const index = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  family: 4, // Force IPv4
  connectTimeoutMS: 10000,
};

const url = `mongodb+srv://chiragduss:ML9rkTyCTcTLwJHU@cluster0.bkz03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const url = `mongodb://localhost:27017`;

index
  .connect(url, options)
  .then(function () {
    console.log("MongoDB is connected");
  })
  .catch(function (err) {
    console.log("ERORRRRRR", err);
  });
