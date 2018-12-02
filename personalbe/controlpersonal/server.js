//declaracion de cliente mongo db y ConnectionString
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kepch:karate123@ds119164.mlab.com:19164/progweb";
//var url = "mongodb://localhost:27017/progweb";
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var redis = require("redis");
var redis_client = redis.createClient("redis://ec2-54-244-68-53.us-west-2.compute.amazonaws.com:6379");
//var redis_client = redis.createClient(process.env.REDIS_URL);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
      // console.log(req);
      return res.send(200);
    } else {
      return next();
    }
  });

//declaracion de los servicios API
app.get("/api/V1/Persona/:id?", (req, res) => {
    var id = req.body.id;
    if (id===undefined)
    {
        GetPersons().then(function(results) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(results));
            res.end();
            })
    }
    else
    {
        GetPerson(id).then(function(results) {
                if(results.length==0)
                {
                    res.writeHead(404, {"Content-Type": "application/json"});
                    res.write(JSON.stringify(results));
                    res.end();   
                }
                else
                {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify(results[0]));
                    res.end();
                }
            })
    }
   });

app.post('/api/V1/Persona', function(req, res) {
    var person = req.body;
    insertPerson(person);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify({status:"ok"}));
    res.end();
});

app.put("/api/V1/Persona/", (req, res) => {
    var id = req.body._id;
    const body = {
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        edad : req.body.edad,
        usuario : req.body.usuario,
        pais : req.body.pais
      }
    GetPerson(id).then(function(results) {
        if( results===[] )
        { 
            // persons.persons.splice(x => x.id !==id)
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not found");
            res.end();
        }
        else
        {
            deletePerson(id).then(function(results)
            {
                insertPerson(body);
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.write("ok");
                res.end();
            });
        }
    })
   });

app.delete("/api/V1/Persona/", (req, res) => {
    var id = req.body.id;
    GetPerson(id).then(function(results) {
        if( results===[] )
        { 
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not found");
            res.end();
        }
        else
        {
            deletePerson(id);
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("ok");
            res.end();
        }
        })
});

function GetPersons()
{
    return new Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
        if (err) return reject('Fallo la conexion a la base de datos');
        console.log("connected to Database");
        var dbo = db.db("progweb");
        dbo.collection("persons").find({}).toArray( function(err, result) {
            if (err) return reject('Fallo el query a la base de datos');
            resolve(result);
            console.log("query executed");
            db.close();
            console.log("conection Closed");
            })
        })
    })
}

function GetPerson(id)
{
    return new Promise(function(resolve,reject){
        redis_lookup(id).then(function(redis_results){
            
            if (redis_results === JSON.parse(null))
            {
                console.log("DB consulted for record");
                resolve(GetPerson_mongo(id));
            }
            else
            {
                console.log("Record consulted in redis");
                console.log(redis_results);
                resolve([redis_results]);
            }
        });
    })

}

function GetPerson_mongo(id)
{
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, function(err, db) {
            if (err) return reject('Fallo la conexion a la base de datos');
            console.log("connected to Database");
            var dbo = db.db("progweb");
            var ObjectId = require('mongodb').ObjectID;
            var query = {_id: new ObjectId(id)};
            dbo.collection("persons").find(query).toArray( function(err, result) {
                if (err) return reject('Fallo el query a la base de datos');
                if(result.length==1){
                    redis_insert(id,result[0]);
                }
                resolve(result);
                console.log("query executed");
                db.close();
                console.log("conection Closed");
                })
            })
    })
}

function insertPerson(myobj)
{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("connected to Database");
        var dbo = db.db("progweb");
        dbo.collection("persons").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          redis_insert(res.insertedId,res.ops[0]);
          db.close();
        });
      });
}

function deletePerson(id)
{
    return new Promise(function(resolve,reject){
        redis_delete(id)
        MongoClient.connect(url, function(err, db) {
            if (err) return reject(err.message);
            var dbo = db.db("progweb");
            var ObjectId = require('mongodb').ObjectID;
            var query = {_id: new ObjectId(id)};
            dbo.collection("persons").deleteOne(query, function(err, obj) {
                if (err) return reject(err.message);
                console.log("1 document deleted");
                db.close(); 
                return resolve("ok");
            });
        });
    });
}

function redis_lookup(id)
{
    return new Promise(function(resolve,reject){
        redis_client.get(id, function(error, result) {
            if (error) reject('Fallo en lectura de redis');
            else resolve(JSON.parse(result));
        });
    });
}
function redis_insert(id,object)
{
    redis_client.set(id, JSON.stringify(object), redis.print);
}

function redis_delete(id)
{
    console.log("Record from redis erased");
    redis_client.del(id);
}

//levantamos el servidor
function createServer(){
    app.listen(8080, () => {
    console.log("Server running on port 8080");
    });
}

//ejecuccion 
createServer();
