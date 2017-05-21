const https = require('https'); // Requeiring https
const myApiKey = '9e403403ec5a76fd5a354d44e8604726';
const fs = require("fs");

   let objectData ='';
      let stringData = '';

https.get("https://api.darksky.net/forecast/" + myApiKey +"/37.8267,-122.4233?exclude=[minutely,hourly,currently,alerts,flags]",(res)=>{
      console.log("################################## Status ###################################");
      console.log('statusCode:', res.statusCode);

      res.on('data', chunk =>{
            stringData += chunk;
   })

    res.on('end', res=>{
      objectData = JSON.parse(stringData);
            console.log("\n################# When we receive, it is  a string.############################\n");
      console.log (stringData);
      console.log("\n\n\n################################### After Json.parse, it is an object ##################################\n");
      console.log (objectData);

      console.log(`\n\n\nCurrent Weather in ${objectData.timezone}<br>
        - temperature: ${(objectData.daily.temperature-32)/(100/180)} degrees Celsius<br>
        - summary: ${objectData.daily.icon}  \n\n`);


      let stringData2= JSON.stringify(objectData);
      fs.writeFile("data2.csv", stringData2, 'utf8', (err) => {
                  console.log("writing file")
            if (err) throw err;
            console.log('Virus attack!');

    });


   })


}).on('error', (e) => {
    console.log("###################################### Error ######################################");
    console.error(e);
});
