require ('dotenv/config')
  const development = {
    database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql'
  }
  // const development = {
  //   username: "root",
  //   password: "",
  //   database: "db_spk_ismi",
  //   host: "127.0.0.1",
  //   dialect: "mysql",   
  // }
  const test = {
    username: "root",
    password: "",
    database: "hukumDigital",
    host: "127.0.0.1",
    dialect: "mysql"
  }
  const production= {
    database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql'
  }
  module.exports = {
    development,
    test,
    production,
  }
