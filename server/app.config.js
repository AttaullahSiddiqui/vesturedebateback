const config = {
  // MongoDB connection
  db: {
    development: "mongodb://localhost:27017/duarestaurant",
    // production: 'mongodb+srv://attaullah:mongocluster@cluster0-jrlh5.mongodb.net/test?retryWrites=true&w=majority'
    production:
      "mongodb+srv://attaullah:vesturedebate@cluster0.g2rpomi.mongodb.net/main?retryWrites=true&w=majority"
  },
  JWT: {
    secretKey: "hfgs97454089jbjsdfsdvf87032603jb",
  },
  twilio: {
    accountSID: "ACf52b98a28838a65a827eca710f56b079",
    authToken: "b1cd052b21d966b0671f16ab325b0ccb",
    twilioPhoneNo: "+18632702045",
  },
  local: {
    url: "mongodb://localhost:27017/codesarrival",
    dbname: "codesarrival",
  },
};

module.exports = config;
