var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');
var app = express();


//el use es un estatico que se utiliza en todas las rutas.
app.use(express.static("public"));
app.use(formidable());


//primero se leee y luego se escribe 

// fs.readFile(__dirname + '/data/posts.json', function (error, file) {    
//     //sin parsear da buffer con números
//     var parsedFile = JSON.parse(file);
//     console.log(parsedFile);
    
// });

// fs.writeFile(__dirname + '/data/posts.json', file, function (error) {    
//     console.log(file)
// });

app.get('/get-posts', function(req, res) {
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {    
        //sin parsear da buffer con números
        var parsedFile = JSON.parse(file);
        var string = JSON.stringify(parsedFile);
        //LA FUNCION .SEND ESTA ESPERANDO UN
        res.send(string);
        
    });
})

app.post('/create-post', function (req, res) {
    console.log('estoy mandando un  post')
    var newPost = req.fields;
    console.log('NUEVOPOST',newPost)
    var timestamp = Date.now();
   
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {    
        
        var parsedFile = JSON.parse(file);

        console.log('VIEJOOOOOOO', parsedFile)
        
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify({...parsedFile, [timestamp]:newPost.blogpost}), function (error) {    
            
        });
        
    });

    

})

app.listen(3000, function () {
  console.log('ESCUCHANDO!');
  
});

