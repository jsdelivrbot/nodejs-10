var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var fs = require('fs');
var promise = require('bluebird');
var options = {  promiseLib: promise };
var pgp = require('pg-promise')(options);
var pg = require("pg");
const connectionString = "postgres://iphioobnwfhxqh:71052f3a32f6d245594b6e8c134f56cf4952b0e2e6838c2a7108f806437ee3a3@ec2-23-21-220-48.compute-1.amazonaws.com:5432/d2mg8u31dr7ukf";

//////////
//v2

app.get('/updatetodo1', function(request, response) {
  response.sendFile(__dirname + '/public/update.html');
});

app.get('/version2', function(request, response) {
  response.sendFile(__dirname + '/public/version2.html');
});



app.get('/version3', function(request, response) {
  version2ToDo(request, response);
});

function version2ToDo(request, response) {
  version2ToDoFromDb( function(error, result) {
      var todo1 = result;
      console.log(todo1); 
      response.status(200).json(result);
      //response.sendFile(__dirname + '/public/version2.html');
  });
}  

function version2ToDoFromDb( callback) {
  console.log("Getting All ToDo from DB");
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }
    var sql = "SELECT * FROM todolists";
    //var params = [];
    var query = client.query(sql, function(err, result) {
      client.end(function(err) {
        if (err) throw err;
      });
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }
      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    });
  });
} 



// select
app.get('/getToDo', function(request, response) {
  getToDo(request, response);
});

function getToDo(request, response) {
  var id = request.query.id;
  getToDoFromDb(id, function(error, result) {
    if (error || result == null || result.length != 1) {
      response.status(500).json({success: false, data: error});
    } else {
      var todo1 = result[0];
      console.log(todo1);
      response.status(200).json(result[0]);
    }
  });
}  

function getToDoFromDb(id, callback) {
  console.log("Getting ToDo from DB with id: " + id);
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }
    var sql = "SELECT id, name, descr, dline FROM todolists WHERE id = $1::int";
    var params = [id];
    var query = client.query(sql, params, function(err, result) {
      client.end(function(err) {
        if (err) throw err;
      });
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }
      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    });
  });
} 

// create



app.get('/newToDo', function(request, response) {
  newToDo(request, response);
});

function newToDo(request, response) {
  var name = request.query.name; 
  var descr  = request.query.descr;
  var dline = request.query.dline;
  // var id = request.query.id;
  // var qwe = request.query.qwe;
  newToDoFromDb(name, descr, dline, function(error, result) {
    if (error || result == null || result.length != 1) {
      response.status(500).json({success: false, data: error});
    } else {
      var todo1 = result[0];
      console.log(todo1);
      response.status(200).json(result[0]);
    }
  });
}

function newToDoFromDb(name, descr, dline, callback) {
  console.log("Creating ToDo in DB");
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }  
 
    var sql = "INSERT INTO todolists (name, descr, dline) VALUES ($1::varchar, $2::varchar, $3::date)";

    var params = [name, descr, dline]; 
    var query = client.query(sql, params, function(err, result) {
      client.end(function(err) {
        if (err) throw err;
      });
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }
      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    });
  });
} 



//update



app.get('/updToDo', function(request, response) {
  updToDo(request, response);
});

function updToDo(request, response) {
  var name = request.query.name; 
  var descr  = request.query.descr;
  var dline = request.query.dline;
  var id = request.query.id;
  // var qwe = request.query.qwe;
  updToDoFromDb(name, descr, dline, id, function(error, result) {
    if (error || result == null || result.length != 1) {
      response.status(500).json({success: false, data: error});
    } else {
      var todo1 = result[0];
      console.log(todo1);
      response.status(200).json(result[0]);
    }
  });
}

function updToDoFromDb(name, descr, dline, id, callback) {
  console.log("Creating ToDo in DB");
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }  

    var sql = "UPDATE todolists SET name=$1::varchar, descr=$2::varchar, dline=$3::date WHERE id = $4::int";
    
    var params = [name, descr, dline, id]; 
    var query = client.query(sql, params, function(err, result) {
      client.end(function(err) {
        if (err) throw err;
      });
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }
      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    });
  });
} 



//delete
app.get('/delToDo', function(request, response) {
  delToDo(request, response);
});

function delToDo(request, response) {
  var id = request.query.id;
  delToDoFromDb(id, function(error, result) {
    if (error || result == null || result.length != 1) {

      response.sendFile(__dirname + '/public/version2.html');
//      response.status(500).json({success: false, data: error});
    } else {
      var todo1 = result[0];

      response.sendFile(__dirname + '/public/version2.html');
//      response.status(200).json(result[0]);
    }
  });
}

function delToDoFromDb(id, callback) {
  console.log("Deleting ToDo from DB with id: " + id);
  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }
    var sql = "DELETE FROM todolists WHERE id = $1::int";
    var params = [id];
    var query = client.query(sql, params, function(err, result) {
      client.end(function(err) {
        if (err) throw err;
      });
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }
//      response.sendFile(__dirname + '/public/version2.html');
      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    });
  });
} 


/////////////
  

fs.readFile('test.txt', 'utf8', function(err, data) {  
    if (err) throw err;
    console.log(data);
});

app.get('/test.txt', function(request, response) {
  //response.send(cool());
  fs.readFile('test.txt', 'utf8', function(err, data) {  
    if (err) throw err;
    console.log(data);
    response.send(data);
});
});

app.use(express.static('public'));

app.set('port', (process.env.PORT || 5123));

app.use(express.static(__dirname + '/public'));

app.use(session({secret: 'secret12345'}))

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
app.get('/todo', function(req, res) { 
    res.render('todolist.ejs', {todolist: req.session.todolist});
})

app.post('/todo/addnew/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

app.get('/todo/deleteit/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/rate', function(request, response) {
  response.render('pages/rate')
});
app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/about', function(request, response) {
  response.sendFile(__dirname + '/public/test.html');
});
app.get('/contact', function(request, response) {
  response.sendFile(__dirname + '/public/contact.html');
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Ops! It is 500 status!');
});
app.use(function(req, res, next) {
  res.status(404).send('Sorry, no URL with this name!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});