const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
});

const artistsUsers = `CREATE TABLE IF NOT EXISTS artists_users (
    id_a INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    picture_profil TEXT NOT NULL
)`;

const proUsers = `CREATE TABLE IF NOT EXISTS pro_users (
    id_p INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    pro_type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    picture TEXT NOT NULL,
    enterprise_name VARCHAR(255) NOT NULL,
    siret_number VARCHAR(255) NOT NULL
)`;

const contents = `CREATE TABLE IF NOT EXISTS contents (
    id_c INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    id_user_a INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    duration TIME NOT NULL,
    content_type VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY(id_user_a) REFERENCES artists_users(id_a)
)`;

const admin = `CREATE TABLE IF NOT EXISTS admin (
    id_admin INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    picture_profil_a TEXT NOT NULL
)`;

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected")

    connection.query(artistsUsers, (err, res) => {
        if (err) throw err;
    })
  
    connection.query(proUsers, (err, res) => {
        if (err) throw err;
    })

    connection.query(contents, (err, res) => {
        if (err) throw err;
    })

    connection.query(admin, (err, res) => {
        if (err) throw err;
    })

   
});



module.exports = connection;