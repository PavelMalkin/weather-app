var http = require('http');
var fs = require('fs')
var mysql = require('mysql');
// var request = require('request');
var moment = require('moment');
// var schedule = require('node-schedule');
var port = process.env.PORT || 3000;
var log = 'First log';
var html = fs.readFileSync('index.html');
let axios = require('axios');


// var j = schedule.scheduleJob('30 * * * * *', function () {
//   let d = new moment().format('HH:MM');
//   console.log('The answer to life, the universe, and everything!' + d );
// });

let sql = 'INSERT INTO weather (Name, Date, Temperature, WindDirection, WindSpeed, WindGust) VALUES ?';

let con = mysql.createConnection({
    host: "zwgaqwfn759tj79r.chr7pe7iynqr.eu-west-1.rds.amazonaws.com", //localhost
    user: "u77emh18bkzsdlnq", //User1
    password: "v5b21k3tox0y7w1v", //admintest
    database: 'h69okc72zfnztim4', //mydb
    port: '3306'
});

con.connect(function (err) {
    if (err) log += err + ';   ';
    console.log("Connected!");
});

function currentweather() {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=Haifa,il&appid=82d3d463b96e530d4b14b76571e81d3a')
        .then(res => {
            let result = res.data;
            let date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
            let values = [['Current weather', date, result.main.temp - 273.15, result.wind.deg, result.wind.speed, result.wind.gust]];
            con.query(sql, [values], function (err, result, fields) {
                if (err) log += err;
                console.log('Current weather: ' + result.affectedRows + date);
                log += 'Current weather: ' + result.affectedRows + date + ';   ';
            });

        })
        .catch(err => console.log('Error', err))
}

function openweathermap() {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Haifa,il&appid=82d3d463b96e530d4b14b76571e81d3a')
        .then(res => {
            let result = res.data;

            let forecast = result.list.filter(res => {
                let date = moment.unix(res.dt);
                return (date >= moment.utc().endOf('day') && date <= moment.utc().add(1, 'day').endOf('day'))
            });

            forecast.map(result => {
                let date = result.dt_txt;
                let values = [['Openweathermap forecast', date, result.main.temp - 273.15, result.wind.deg, result.wind.speed, result.wind.gust]];
                con.query(sql, [values], function (err, result, fields) {
                    if (err) log += err + ';   ';
                    console.log('Openweathermap forecast: ' + result.affectedRows + date);
                    log += 'Openweathermap forecast: ' + result.affectedRows + date + ';   ';
                });
            });
        })
        .catch(err => console.log('Error', err))
}

openweathermap();
currentweather();

setInterval(currentweather, 3600000); //time per 30 min 1800000
setInterval(openweathermap, 86400000);



// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type':'text/html'});
//     res.write(log);
//     res.end();
// }).listen(port);



// test code from template
var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200);
        res.write(html);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
