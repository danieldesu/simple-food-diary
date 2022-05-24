// Display Week day + Week Number + Hour and Minute on form, later input it with the sent data
const formTimeDisplay = document.getElementById("formTimeDisplay");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = new Date();

let [day, year] = [date.getDay(), date.getFullYear()];
let [hours, minutes] = [date.getHours(), date.getMinutes()];

if (minutes < 10) {
  minutes = "0" + minutes;
}

// Determining what week of the year it is, i.e, Week 2, Week 12, Week 14...
startDate = new Date(date.getFullYear(), 0, 1);
let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
let weekNumber = Math.ceil(days / 7);

// Presenting the current time in a format that's readable (this goes in with the data later)
let cleanCurrentDay = `${
  weekdays[day]
}, ${hours}:${minutes}. Week ${weekNumber} of ${date.getFullYear()}.`;
formTimeDisplay.innerText = cleanCurrentDay;

// Form submit event and input data storage
// Feedback class shows error text, feedback-success confirms data is sent.
const form = document.querySelector(".input-form");
const feedbackDisplay = document.querySelector(".feedback");
const feedbackSuccessDisplay = document.querySelector(".feedback-success");
const listing = document.querySelector(".listing");

// Defining rules for food and calories input fields
const foodsPattern = /[a-zA-Z0-9]{4,30}/;
const caloriesPattern = /^[0-9]{1,10}$/;

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  feedbackDisplay.textContent = "";

  const foods = form.foods.value.trim();
  const calories = form.calories.value.trim();

  if (foodsPattern.test(foods)) {
    //input accepted, no error msg
  } else {
    feedbackDisplay.textContent =
      "Food input must be 4-30 letters and/or numbers";
  }

  if (caloriesPattern.test(calories)) {
    //input accepted, no error msg
  } else {
    //add calories input error msg if it's not already present
    if (
      feedbackDisplay.textContent == "" ||
      feedbackDisplay.textContent ===
        "Food input must be 4-30 letters and/or numbers"
    ) {
      feedbackDisplay.textContent += "\nCalories input must be 1-10 numbers";
    }
  }

  // if no errors, proceed with inserting the data

  if (feedbackDisplay.textContent == "") {
    //multiplier if multiple instances of data is now added

    if (feedbackSuccessDisplay.textContent == "") {
      feedbackSuccessDisplay.textContent = "Data added!";
      dataAddMultiplier = 1;
    } else {
      feedbackSuccessDisplay.textContent = `Data added! X${++dataAddMultiplier}`;
    }
    // inserting the data into the list
    listing.innerHTML += `<li>${foods.toUpperCase()}, ${calories} calories. Time: ${cleanCurrentDay}</li>`;
    form.reset();
  }
});

// real-time food input validation signal, green or red bg depending on validity

form.foods.addEventListener("keyup", (e) => {
  if (foodsPattern.test(e.target.value)) {
    form.foods.setAttribute("class", "input-success-mark");
  } else {
    form.foods.setAttribute("class", "input-error-mark");
  }
});
