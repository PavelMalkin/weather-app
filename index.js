var http = require('http');
var fs = require('fs')
var mysql = require('mysql');
var request = require('request');
var moment = require('moment');
// var schedule = require('node-schedule');
var port = process.env.PORT || 3000;
var log = 'First log';
var html = fs.readFileSync('index.html');


// var j = schedule.scheduleJob('30 * * * * *', function () {
//   let d = new moment().format('HH:MM');
//   console.log('The answer to life, the universe, and everything!' + d );
// });


// let con = mysql.createConnection({
//     host: "localhost",
//     user: "User1",
//     password: "admintest",
//     database: 'mydb'
// });
//
// let currentweather = {
//     'method': 'GET',
//     'url': 'http://api.openweathermap.org/data/2.5/weather?q=Haifa,il&appid=82d3d463b96e530d4b14b76571e81d3a',
//     'headers': {
//     }
// };
//
// let openweathermap = {
//     'method': 'GET',
//     'url': 'http://api.openweathermap.org/data/2.5/forecast?q=Haifa,il&appid=82d3d463b96e530d4b14b76571e81d3a'
// };
//
// let sql = 'INSERT INTO weather1 (Name, Date, Temperature, WindDirection, WindSpeed, WindGust) VALUES ?';
//
// con.connect(function (err) {
//     if (err) log += err + ';   ';
//     console.log("Connected!");
// });
//
//
// weather();
// forecastopenweathermap();
//
// setInterval(weather, 3600000); //time per 30 min 1800000
// setInterval(forecastopenweathermap, 86400000);
//
// function weather() {
//     request(currentweather, function (error, res) {
//         if (error) console.log(error);
//         let result = JSON.parse(res.body);
//         let date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
//         let values = [['Current weather', date, result.main.temp - 273.15, result.wind.deg, result.wind.speed, result.wind.gust]];
//         con.query(sql, [values], function (err, result, fields) {
//             if (err) log += err;
//             console.log('Current weather: ' + result.affectedRows + date);
//             log += 'Current weather: ' + result.affectedRows + date + ';   ';
//         });
//     });
// }
//
// function forecastopenweathermap() {
//     request(openweathermap, function (error, res) {
//         if (error) console.log(error);
//         let result = JSON.parse(res.body);
//
//         let forecast = result.list.filter(res => {
//             let date = moment.unix(res.dt);
//             return (date >= moment.utc().endOf('day') && date <= moment.utc().add(1,'day').endOf('day'))
//         });
//
//         forecast.map(result => {
//             let date = result.dt_txt;
//             let values = [['Openweathermap forecast', date, result.main.temp - 273.15, result.wind.deg, result.wind.speed, result.wind.gust]];
//             con.query(sql, [values], function (err, result, fields) {
//                 if (err) log += err + ';   ';
//                 console.log('Openweathermap forecast: ' + result.affectedRows + date);
//                 log += 'Openweathermap forecast: ' + result.affectedRows + date + ';   ';
//             });
//         });
//
//     });
// }



http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(html);
    res.end();
}).listen(port);
