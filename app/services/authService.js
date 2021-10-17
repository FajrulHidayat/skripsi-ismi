// import {createBlackList }  from "jwt-blacklist";
const jwt = require("jsonwebtoken");
const {createBlackList} = require('jwt-blacklist')


// require("dotenv/config");

const secret =
  process.env.NODE_ENV === "production" ? process.env.SECRET_BASE : "secret";

const authService = async() => {
 
// memory
const _blacklist = await createBlackList({
  daySize: 10000, // optional, number of tokens need revoking each day
  errorRate: 0.001, // optional, error rate each day
});
 
// redis
// const blacklist = await createBlackList({
//   daySize: 10000, // optional, number of tokens need revoking each day
//   errorRate: 0.001, // optional, error rate each day
//   storeType: 'redis', // store type
//   redisOptions: {
//     host: 'localhost',
//     port: 6379,
//     key: 'jwt-blacklist', // optional: redis key prefix
//   }, // optional, redis options
// });
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);
  // const blacklist = (token) => _blacklist.add(token)

  
  return {
    issue,
    verify,
    // blacklist,
  };
};

module.exports = authService;
