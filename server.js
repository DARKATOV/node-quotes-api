const express = require("express");
const app = express();

const quotes = require("./quotes.json");

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

app.get("/quotes/:id", function(request, response){
  let data = quotes;
  let id = parseInt(request.params.id);
  const resultQuote = data.find((quote)=>quote.id === id);
  // resultado de filter si se sabe que solamente un elemento cumplia con la condicion filtro, y acceder luego al valor cero de esa nueva array resltandte 
  response.send(resultQuote);
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
