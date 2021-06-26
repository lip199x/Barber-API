var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var apiversion = "/api/v1";
var fileUpload = require('express-fileupload');
// var bookpicturepath = 'C:/Users/NuenGxz/Desktop/222/src/assets/bookpictures'
//MYSQL Connection
var db = require("./config/db.config");

var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

//Get all hairsalons
app.get(apiversion + "/hairsalons", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  db.query("SELECT * FROM hair_salon", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: "hairsalon ", data: results });
  });
});

// //Upload using express-upload
// app.post(apiversion + '/upload', (req, res) => {
//   if (!req.files) {
//       return res.status(500).send({ msg: "file is not found" })
//   }
//   const myFile = req.files.file;
//   myFile.mv(`${bookpicturepath}${myFile.name}`, function (err) {
//       if (err) {
//           console.log(err)
//           return res.status(500).send({ msg: "Error occured" });
//       }
      
//       return res.send({name: myFile.name, path: `/${myFile.name}`});
//   });
// });

//Get hairsalon by id
app.get(apiversion + "/hairsalon/:hsalon_id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  var hsalon_id = Number(req.params.hsalon_id);

  db.query("SELECT * FROM hair_salon where hsalon_id=?", hsalon_id.toString(), function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      message: "hairsalon id =" + hsalon_id.toString(),
      data: results,
    });
  });
});

//Delete hairsalon by id
app.delete(apiversion + "/hairsalon/:hsalon_id", function (req, res) {

  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //Code for Delete
  db.query("DELETE FROM hair_salon WHERE hsalon_id=?",req.params.hsalon_id,
  function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: "Hairsalon DELETE" });
  });
});

//Add new hairsalon
app.post(apiversion + '/hairsalon',  function (req, res)  {  

  var hsalon_name = req.body.hsalon_name;
  var hsalon_detail = req.body.hsalon_detail;
  var hsalon_time = req.body.hsalon_time;
  var hsalon_pic = req.body.hsalon_pic;
  var hsalon_address = req.body.hsalon_address;
  var hsalon_lat = req.body.hsalon_lat;
  var hsalon_lng = req.body.hsalon_lng;


  var hsalon_id = Number(req.params.hsalon_id);
  
  db.query(`INSERT INTO hair_salon
  (hsalon_name,hsalon_detail,hsalon_time,hsalon_pic,hsalon_address,hsalon_lat,hsalon_lng) 
    VALUES ( '${hsalon_name}','${hsalon_detail}','${hsalon_time}','${hsalon_pic}','${hsalon_address}',${hsalon_lat},
    ${hsalon_lng});`,function (error, results, fields) 
    {
      if (error) throw error;
      return res.send({ error: false, message: 'Insert new book' });
  });
});


//Edit hairsalon by id
app.put(apiversion + "/hairsalon/:hsalon_id", function (req, res) {
  //Code for Edit
  var hsalon_id = req.body.hsalon_id;
  var hsalon_name = req.body.hsalon_name;
  var hsalon_detail = req.body.hsalon_detail;
  var hsalon_time = req.body.hsalon_time;
  var hsalon_pic = req.body.hsalon_pic;
  var hsalon_address = req.body.hsalon_address;
  var hsalon_lat = req.body.hsalon_lat;
  var hsalon_lng = req.body.hsalon_lng;
  
  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  db.query(
    "UPDATE hair_salon SET hsalon_name = ?, hsalon_detail = ?, hsalon_time = ?, hsalon_pic = ?, hsalon_address = ?, hsalon_lat = ?, hsalon_lng = ? WHERE hsalon_id = ?",
    [
      
      hsalon_name,
      hsalon_detail,
      hsalon_time,
      hsalon_pic,
      hsalon_address,
      hsalon_lat,
      hsalon_lng,
      hsalon_id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: "update hairsalon" });
    }
  );
  
});

app.listen(port, function () {
  console.log("Server is up and running...");
});
