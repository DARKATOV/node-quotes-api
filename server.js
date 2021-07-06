const { json } = require("express");
const express = require("express");
const app = express();
let fs = require('fs');
const quotes = require("./quotes.json");

/* fynctions fs   normalizada?  */    

let fsAll =  async (ruta, body, cb) => {
  let fss = await fs.writeFile(ruta, body, error => {
      error ? 
      cb('not successful'. error) :
      cb('successful')
  })

}

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

app.get("/quotes/:id", function(request, response){
  let data = quotes;
  let requestValue = request.params.id;
  if ((requestValue >= data.length)){ return response.status(404).send(`"${requestValue}" Does not is a number valid for search by ID`);}
  if (isNaN(requestValue)){ return response.status(400).send(`"${requestValue}" Does not is a value valid for search by ID`);}
  let id = parseInt(requestValue);
  if (id <= 0){response.status(400).send(`${id} Does not is a valid number. Only can be use positivies numbers`);}
  const resultQuote = data.find((quote)=>quote.id === id);
  // resultado de filter si se sabe que solamente un elemento cumplia con la condicion filtro, y acceder luego al valor cero de esa nueva array resltandte 
  response.status(200).send(resultQuote);
});

app.use(express.json());     /*el uso de expresss  */

app.post("/quotes", (request, response) => {
  let data = quotes;
  let idValue = data.length;
  let newQuote = request.body;
  newQuote.id = idValue + 1 ;
  console.log(newQuote);
  data.push(newQuote);                                        
  fs.writeFileSync("./quotes.json", JSON.stringify(data, null, 2)) /* con un console log estaria trasnformandolo en sincrono? paro el servidor ? consistencia a velocidad / por que el null y el dos */
  // fs.writeFile();
  response.status(201).json(quotes);
});

app.put("/quotes/:id", (request, response) => {
  try{
  let data = quotes;
  let idValue = parseInt(request.params.id);
  console.log(idValue);
  let selectQuote = data.find(element => element.id === idValue);
  let newInfo = request.body;
  console.log(newInfo);
  selectQuote.quote = newInfo.quote;
  console.log(selectQuote.quote);
  selectQuote.author = newInfo.author;
  console.log(selectQuote.author);
  selectQuote.id = idValue;
  console.log(selectQuote.id);
  fs.writeFileSync("./quotes.json", JSON.stringify(data, null, 2))
  response.status(201).json(data);
  } catch (err) {
    response.status(400).json(err)
    console.log(err.message)
  }
});




  // let data= quotes;
  // let termId = parseInt(request.params.id);
  // if (termId == number && termId <= 0 ) {
  //   response.status(400).send("Number of ID not valid")
  // } else {
  //   let valueArray = data.filter( quote => quote.id === termId)
  //   valueArray === [] ? response.status(404).send(` ${termId} Does not exist`) : response.status(200).json(valueArray);
  // let selectQuote = quotes.filter( quote => quote.id === request);
  // response.json(selectQuote);

app.listen(3000, () => console.log("Listening on port 3000"));
