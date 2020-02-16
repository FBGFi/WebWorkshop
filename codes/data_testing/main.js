var http = require('http');
var url = 'http://35.217.19.28/sell-games-2020/public/index.php/api/events';
let data = http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var fbResponse = JSON.parse(body);
        console.log("Got a response");
        return fbResponse;
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
      return "";
});
console.log(data);