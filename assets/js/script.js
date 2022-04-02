// QuerySelectors
var calenderEl = $("#calendar");
var currentDayEl = $("#currentDay");
var saveEl = $(".save");
var calenderObj; //Globably declared so can be initialized on first run or get from localStorage

// Functions
function init() {
  //Run on page load
  $(currentDayEl).text(moment().format("dddd MMM DD, YYYY")); //Show date at the top
  getTask(); //Look for saved data
  storeTask(); //Try to save data
  buildCalendar(); //Render the calendar
  setEventListeners(); //call event listeners
}

function buildCalendar() {
  //Loop through calendar object and render the calendar
  calenderObj.forEach(function (ele) {
    var currentHour = moment().format("H"); //Get the current hour in 24 format
    var rowHour = moment(ele.hour, "HH").format("LT"); //Get the hour from the calendar object and render in 12 format
    var rowColor = "";
    if (ele.hour < currentHour) {
      //which is shorter? A nested if or a switch? I think nested if
      rowColor = "past";
    } else if (ele.hour > currentHour) {
      rowColor = "future";
    } else {
      rowColor = "present";
    }
    var rowEl = document.createElement("tr");
    rowEl.classList.add(rowColor);
    //Dynamically generate the entire row html complete with classes and append to table body
    rowEl.innerHTML = `<td id="hour-${ele.hour}" class="col-2">${rowHour}</td><td class="editable col-9" contentEditable=true>${ele.task}</td><td class="col-1"><div class="text-center"><button class="save btn btn-primary" type="button"><i fill="currentColor" class="bi bi-save-fill"></i></button><button class="copy btn btn-secondary" type="button"><i fill="currentColor" class="bi bi-clipboard2-plus-fill"></i></button><button class="clear btn btn-danger" type="button"><i fill="currentColor" class="bi bi-trash-fill"></i></button></div></td></tr>`;

    calenderEl.append(rowEl);
  });
}

function saveTask(index) {
  //Store task at index to Calendar object task of same index
  calenderObj[index]["task"] = $(".editable").eq(index).text();
}

function clearTask(index) {
  //Delete task from table (but does not save/store unless save is clicked)
  $(".editable").eq(index).text("");
}

function copyTask(index) {
  //Solution found on Codegrepper.com but is deprecated.
  var $temp = $("<input>"); //Make a temp input tag that does not display and append
  $("body").append($temp);
  $temp.val($(".editable").eq(index).text()).select(); //Set the temp val to task text and select
  document.execCommand("copy"); //copy but is deprecated
  $temp.remove(); //remove temp tag
}

function storeTask() {
  //Json stringify and store to localStorage
  localStorage.setItem("storedTasks", JSON.stringify(calenderObj));
}

function getTask() {
  //Check if there is a stored calendar in localStorage. If so, get it. If not, initialize the Calendar object
  calenderObj = JSON.parse(localStorage.getItem("storedTasks"));
  if (!calenderObj) {
    calenderObj = [
      //Calender object initialized globally here. Hours done in military time to make the
      {
        //calculations easier.
        hour: 9,
        task: "",
      },
      {
        hour: 10,
        task: "",
      },
      {
        hour: 11,
        task: "",
      },
      {
        hour: 12,
        task: "",
      },
      {
        hour: 13,
        task: "",
      },
      {
        hour: 14,
        task: "",
      },
      {
        hour: 15,
        task: "",
      },
      {
        hour: 16,
        task: "",
      },
      {
        hour: 17,
        task: "",
      },
    ];
  }
}

//Event Listeners
//Each click on a button gets the index of the row which corresponds with
//the index of the content in the Calendar object. Passes index to respective function
function setEventListeners() {
  calenderEl.on("click", "button", function (event) {
    //Save button click

    var target = $(event.currentTarget);
    console.log(target);
    if (target.hasClass("save")) {
      console.log("Save Click");
      saveTask($(".save").index(this));
      storeTask(); //Store to local storage
    } else if (target.hasClass("clear")) {
      console.log("Clear Click");
      clearTask($(".clear").index(this));
    } else if (target.hasClass("copy")) {
      console.log("Copy Click");
      copyTask($(".copy").index(this));
    }
  });
}

init();
