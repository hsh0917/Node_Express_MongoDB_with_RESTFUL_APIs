var express = require("express");

var app = express();

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate You human"
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    
        res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:text/:num", function (req, res) {
    console.log(req.params.num);
    var text = req.params.text;
    var num = req.params.num;
    var result = "";
    for (var i = 0; i < num; i++){
        result += " " + text;
    }
    res.send(result);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});

