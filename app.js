const form = document.querySelector("form");
const years = document.querySelector(".years");
const months = document.querySelector(".months");
const days = document.querySelector(".days");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // GET USER INPUT
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  // # DAYS IN EACH MONTH THIS YEAR
  const monthsArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // CURRENT DATE, MONTH & YEAR
  let [current_date, current_month, current_year] = [
    new Date().getDate(),
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  ];
  // BIRTH DATE, MONTH & YEAR
  let [birth_date, birth_month, birth_year] = [
    Number(data.day),
    Number(data.month),
    Number(data.year),
  ];
  // VALIDATE INPUTS
  const isValid = validateInputs({
    day: birth_date,
    month: birth_month,
    year: birth_year,
  });
  // IF VALID CALCULATE AGE
  if (isValid) {
    if (birth_date > current_date) {
      current_month -= 1;
      current_date += monthsArr[current_month - 1];
    }

    if (birth_month > current_month) {
      current_year -= 1;
      current_month += 12;
    }

    const noOfDays = current_date - birth_date;
    const noOfMonths = current_month - birth_month;
    const noOfYears = current_year - birth_year;

    years.querySelector("span").textContent = noOfYears;
    months.querySelector("span").textContent = noOfMonths;
    days.querySelector("span").textContent = noOfDays;
  }
});

// FUNCTION TO VALIDATE INPUT DATA
const validateInputs = (data) => {
  let { day, year, month } = data;
  let isValid = true;
  errorStyles("remove", "day");
  errorStyles("remove", "month");
  errorStyles("remove", "year");
  if (!day) {
    errorStyles("add", "day");
  } else if (day < 0 || day > 31) {
    errorStyles("add", "day", "Must be a valid day");
  }
  if (!month) {
    errorStyles("add", "month");
  } else if (month < 0 || month > 12) {
    errorStyles("add", "month", "Must be a valid month");
  }
  if (!year) {
    errorStyles("add", "year");
  } else if (
    year < 0 ||
    year > new Date().getFullYear() ||
    (year === new Date().getFullYear() && month > new Date().getMonth() + 1) ||
    (year === new Date().getFullYear() &&
      month === new Date().getMonth() + 1 &&
      day >= new Date().getDate())
  ) {
    // errorStyles("add", "day", " ");
    // errorStyles("add", "month", " ");
    errorStyles("add", "year", "Must be in the past");
  }
  if (
    isValid &&
    new Date(`${year}-${month}-${day}`).getDate() !== Number(day)
  ) {
    errorStyles("add", "day", "Must be a valid date");
    errorStyles("add", "month", " ");
    errorStyles("add", "year", " ");
  }

  function errorStyles(operation, id, msg) {
    const input = document.querySelector(`#${id}`);
    input.classList[operation]("error-form-input");
    const label = input.parentElement.previousElementSibling;
    label.classList[operation]("error-form-label");
    const errorMessage = input.parentElement.nextElementSibling;
    errorMessage.classList[operation]("show-message");
    if (msg) errorMessage.textContent = msg;
    isValid = operation === "add" ? false : true;
  }
  return isValid;
};
