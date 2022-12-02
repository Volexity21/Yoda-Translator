const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-RapidAPI-Key": "2ffa236209msh40cdcf1eec77dd3p199fb7jsncccb2f0b5456",
    "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
  },
};

fetch(
  "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
  options
)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        console.log(data.value);
        var input = data.value;
        yodaTranslate(input);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function (error) {
    alert("Unable to connect to API");
  });
var yodaTranslate = function (input) {
  var yoda =
    "https://api.funtranslations.com/translate/yoda.json?text=" + input + ".";
  fetch(yoda)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
};
