var DropDowntrigger = document.querySelector(".button");
var dropDownShow = document.querySelector(".dropdown");
var filterBtn = document.querySelector(".filter-btn");
var generateBtn = document.querySelector(".submit-btn");
var backBtn = document.querySelector(".back-btn");
var tagOptions = document.querySelectorAll(".filter-option");
var tempFilterTxt = document.querySelector(".temp-filter");
var tagOpt = null; //place holder to assign local tags
var sad = ["happiness", "cry", "loss", "death", "doing"]; //local tags
var life = ["living", "doinig", "use", "making"];
var friendship = ["family", "love", "hostility", "other", "friend"];
var love = [
  "valentine's day",
  "love",
  "making love",
  "partnership",
  "gauge",
  "romantic",
  "cute",
];
var funny = ["life", "people", "man", "funny", "want", "thing"];
var common = []; //arrat of common tags to be filled later
//API linking options
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2ffa236209msh40cdcf1eec77dd3p199fb7jsncccb2f0b5456",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
};

var DropFunction = function (event) {
  event.preventDefault();

  dropDownShow.classList.add("is-active");
};
//starts searching API after local theme is chose by user and generate button is clicked
if (generateBtn != null) {
  generateBtn.addEventListener("click", function () {
    var chosenTag = tagOpt;
    console.log(chosenTag);
    generateAdjustment();
    displayBlaster();
    displayProgressBar();
    quote(chosenTag);

    setTimeout(function () {
      document.location.href = "./result.html";
    }, 5000);
  });
}

if (backBtn != null) {
  backBtn.addEventListener("click", function () {
    console.log("clicking");
    document.location.href = "./index.html";
  });
}

for (i of tagOptions) {
  i.addEventListener("click", function () {
    var chosenTag = this.textContent.trim();
    tempFilterTxt.textContent = chosenTag;
    dropDownShow.classList.remove("is-active");

    if (chosenTag == "Sad") {
      tagOpt = sad;
    } else if (chosenTag == "Funny") {
      tagOpt = funny;
    } else if (chosenTag == "Friendship") {
      tagOpt = friendship;
    }
    return tagOpt;
  });
}

DropDowntrigger.addEventListener("click", DropFunction);

// Function to return commonElements
function getCommon(tagsL, chosenTag, input) {
  console.log(chosenTag);
  tagsL.sort(); // Sort both the arrays
  chosenTag.sort(); // Array to contain common elements
  var i = 0,
    j = 0; // i points to arr1 and j to arr2
  // Break if one of them runs out
  while (i < tagsL.length && j < chosenTag.length) {
    if (tagsL[i] == chosenTag[j]) {
      // If both are same, add it to result
      common.push(tagsL[i]);
      i++;
      j++;
    } else if (tagsL[i] < chosenTag[j]) {
      // Increment the smaller value so that
      i++; // it could be matched with the larger
    } // element
    else {
      j++;
    }
  }

  //time out function to ensure API #1 is not overcalled
  if (common.length < 1) {
    setTimeout(function () {
      quote(chosenTag);
    }, 1400);
  } else {
    yodaTranslate(input);
    console.log("yes I am three");
  }
}

//Yoda API call after local tags are matched and a generated quote is grabbed in variable 'input'
//stores to local storage and generate quote on secound page while loading said page
var yodaTranslate = function (input) {
  var yoda =
    "https://api.funtranslations.com/translate/yoda.json?text=" + input + ".";
  fetch(yoda)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data.contents.translated);
          var YodaQuote = data.contents.translated;
          localStorage.setItem("wisdom", YodaQuote);
          pg2Quote(YodaQuote);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Yoda Translator API");
    });
};

var displayProgressBar = function () {
  var barPlacement = document.querySelector(".progress-bar");
  var progressBar = document.createElement("progress");
  progressBar.setAttribute(
    "class",
    "progress is-small custom-progress is-danger"
  );
  barPlacement.appendChild(progressBar);
};

var displayBlaster = function () {
  var barPlacement = document.querySelector(".progress-bar");
  var blaster = document.createElement("img");
  blaster.setAttribute("id", "blaster-rifle");
  blaster.setAttribute("src", "./assets/images/han-solo2.png");

  barPlacement.appendChild(blaster);
};

var generateAdjustment = function () {
  generateBtn.textContent = "Yoda-fying!";
};

//filters out special character from quote and carries variables to be used later
function filterbychr(input, chosenTag, tags) {
  input = input.replace(/[^\w\s.&-]+/g, "");
  var tagsL = tags.map((name) => name.toLowerCase());
  getCommon(tagsL, chosenTag, input);
};

//fxn shows translated quote on result.html
window.onload = function pg2Quote(YodaQuote) {
  var mostRecent = localStorage.getItem("wisdom"); 
  var quoteContainer = document.querySelector("#pg2-quote-container"); //select div to append empty <p>
  var quotePara = document.createElement("p"); //create empty <p> to hold quote
    quotePara.setAttribute("id", "pg2-quote"); //set <p> id to #pg2-quote for styling purposes
    quotePara.textContent = '"' + mostRecent + '"';
    quoteContainer.append(quotePara);

    //code below to run only if no quote is translated (i.e. if "wisdom" storage key is empty)
      if (mostRecent == null) {
        quotePara.textContent = '"A problem, there has been. Again you must try, Padawan."'
          var tryAgainEl = document.createElement("p"); //create empty <p> to hold try again message
          var untranslatedEl = document.createElement("p"); //create empty <p> to hold untranslated quote
          var yourRandQuote = document.createElement("p"); //create empty <p> to hold message
          var untranslatedQuote = localStorage.getItem("key"); //retrieve untranslated quote from local storage
        quoteContainer.append(tryAgainEl); 
          tryAgainEl.setAttribute("id", "tryAgain-message"); //set id for styling
            tryAgainEl.textContent = "There's been a problem with the translator. Please try again.";
              tryAgainEl.append(yourRandQuote); 
                yourRandQuote.setAttribute("id", "rand-quote"); //set id for styling
                  yourRandQuote.textContent = "Your untranslated quote was: "; //append before untranslated quote
              yourRandQuote.append(untranslatedEl); 
                untranslatedEl.setAttribute("id", "untranslated-quote"); //set id for styling
                  untranslatedEl.textContent = '"' + untranslatedQuote + '"';
      };
};

//first API function calls for quote and tags
var quote = function (chosenTag) {
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", options)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var tags = data.tags;
          var input = data.content;
            localStorage.setItem("key", input); //set random quote to local storage for later use
            console.log(localStorage);
          filterbychr(input, chosenTag, tags);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
};

// Want to dynamically add filter boxes based on how many filters we decide to use
// Dowm the road wishlist item

var DropFunction = function (event) {
  event.preventDefault();

  dropDownShow.classList.add("is-active");
};

DropDowntrigger.addEventListener("click", DropFunction);
