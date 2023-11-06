// var task_check = document.getElementsByClassName("task-check");
let TO_DO = document.getElementsByClassName("to-do")[0];
let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octuber",
  "November",
  "December",
];
let theme = 0;
var data_counter = 0;
var main_data = [];
var bottomTaskCount = 0;

function show_msg(title, content) {
  document.getElementById("msg-title").textContent = title;
  document.getElementById("msg-content").textContent = content;
  document.getElementsByClassName("show-msg")[0].style.display = "block";
}

function update(data = "", done = 0) {
  if (data == "") {
    let string = "";
    for (let i of main_data) {
      string += i[1] + ";;" + i[2] + ";;" + i[3] + ";;;";
    }
    localStorage.setItem("data", string);
  } else {
    let old = localStorage.getItem("data");
    localStorage.setItem("data", old + ";;;" + data);
  }
}

function get_time_and_date() {
  var currentdate = new Date();
  var datetime =
    day[currentdate.getDay()] +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ", " +
    currentdate.getDate() +
    " " +
    month[currentdate.getMonth()] +
    " " +
    currentdate.getFullYear();
  return datetime;
}
get_time_and_date();

function bottom_task(value) {
  if (bottomTaskCount == 0) {
    bottomTaskCount = 1;
    let a = document.getElementsByClassName("textar")[0];
    a.value = "";
    let k = 0;
    let bc = setInterval(() => {
      if (k < value.length) {
        a.value += value[k];
        k += 1;
      } else {
        a.disabled = true;
        clearInterval(bc);
      }
    }, 100);
  }
}

document.getElementById("msg-button").addEventListener("click", () => {
  document.getElementsByClassName("show-msg")[0].style.animation = "fade_in 1s";
  setTimeout(() => {
    document.getElementsByClassName("show-msg")[0].style.display = "none";
    document.getElementsByClassName("show-msg")[0].style.animation =
      "fade_out 1s";
  }, 900);
});

function deleter(num) {
  num -= 1;
  let new_list = [];
  for (let i of main_data) {
    if (i[0] != num) {
      new_list.push(i);
    }
  }
  main_data = new_list;
  update();
}
function checker(num) {
  num -= 1;
  let new_list = [];
  for (let i of main_data) {
    if (i[0] != num) {
      new_list.push(i);
    } else {
      i[3] = 1;
      new_list.push(i);
    }
  }
  main_data = new_list;
  update();
}
function addTasks(tasks, time = "", done = 0) {
  //     <div class="tasks" name="task-0">
  //     <input type="checkbox" class="task-check" />
  //     <p>
  //       complete this project as soson as possible so that i can focus on
  //       other things like what the hekc is this
  //     </p>
  //     <img src="edit.png" />
  //     <img src="delete.png" name="task-0" />
  //   </div>
  console.log(main_data);
  let times;
  if (time != "") {
    times = time;
  } else {
    times = get_time_and_date();
    update(tasks + ";;" + times, +";;0");
  }

  main_data.push([data_counter, tasks, times, done]);
  data_counter += 1;

  let task = document.createElement("div");
  task.setAttribute("class", "tasks");
  task.setAttribute("num", data_counter);

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("title", "Done ??");
  checkbox.setAttribute("class", "task-check");

  checkbox.addEventListener("click", () => {
    let next = checkbox.nextElementSibling;
    next.innerHTML = next.innerHTML.strike();
    checkbox.disabled = true;
    checkbox.setAttribute("title", ":)");
    checker(task.getAttribute("num"));
  });

  let p = document.createElement("p");
  p.appendChild(document.createTextNode(tasks));

  if (done == 1) {
    checkbox.checked = true;
    checkbox.setAttribute("title", ":)");
    checkbox.disabled = true;
    p.innerHTML = p.innerHTML.strike();
  }

  // let img1 = document.createElement("img");
  // img1.setAttribute("src", "edit.png");
  // img1.setAttribute("num", data_counter);

  let img1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  img1.setAttribute("num", data_counter);
  img1.setAttribute("fill", "none");
  img1.setAttribute("viewBox", "0 0 24 24");
  img1.setAttribute("stroke-width", "1.5");
  let paths = document.createElementNS("http://www.w3.org/2000/svg", "path");
  paths.setAttribute("stroke-linecap", "round");
  paths.setAttribute("stroke-linejoin", "round");
  paths.setAttribute(
    "d",
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
  );
  let tit = document.createElement("title");
  tit.appendChild(document.createTextNode("Edit this To-Do"));
  img1.appendChild(tit);
  img1.appendChild(paths);

  // img1.setAttribute("title", "Edit this To-Do");
  img1.setAttribute("date", times);
  img1.addEventListener("click", () => {
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementsByClassName("edit")[0].style.display = "block";
    document.getElementsByClassName("edit")[0].style.animation = "fade_out 1s";
    document.getElementsByClassName("container")[0].style.animation =
      "fade_in 1s";
    document.getElementById("edit-date").textContent =
      img1.getAttribute("date");
    document.getElementById("edit-text").textContent = p.textContent;
    document
      .getElementById("edit-save")
      .setAttribute("num", task.getAttribute("num"));
  });

  // let img2 = document.createElement("img");
  // img2.setAttribute("num", data_counter);
  // img2.setAttribute("class", "del");
  // img2.setAttribute("title", "Remove this To-Do");
  // if (theme) {
  //   img2.setAttribute("src", "delete1.png");
  // } else {
  //   img2.setAttribute("src", "delete.png");
  // }
  let img2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  img2.setAttribute("num", data_counter);
  img2.setAttribute("fill", "none");
  img2.setAttribute("viewBox", "0 0 24 24");
  img2.setAttribute("class", "del");
  img2.setAttribute("stroke-width", "1.5");
  let paths2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  paths2.setAttribute("stroke-linecap", "round");
  paths2.setAttribute("stroke-linejoin", "round");
  paths2.setAttribute(
    "d",
    "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  );
  img2.appendChild(paths2);

  img2.addEventListener("click", () => {
    p.innerHTML = p.innerHTML.strike();
    task.style.animation = "fade_in 2s";
    deleter(task.getAttribute("num"));
    setTimeout(() => {
      task.remove();
    }, 1800);
  });

  task.appendChild(checkbox);
  task.appendChild(p);
  task.appendChild(img1);
  task.appendChild(img2);

  // task.addEventListener("click", () => {
  //   document.getElementsByClassName("bottom")[0].style.display = "none";
  //   document.getElementsByClassName("bottom-task")[0].style.display = "block";
  // });

  document.addEventListener("mousedown", (event) => {
    if (
      checkbox.contains(event.target) ||
      img1.contains(event.target) ||
      img2.contains(event.target)
    ) {
    } else if (task.contains(event.target)) {
      document.getElementsByClassName("bottom")[0].style.display = "none";
      document.getElementsByClassName("bottom-task")[0].style.display = "block";
      bottom_task(p.textContent);
    }
  });

  TO_DO.appendChild(task);
}

document.getElementById("task-add-button").addEventListener("click", () => {
  let value = document.getElementById("taskAdd").value;
  if (value.length > 0) {
    addTasks(value);
    document.getElementById("taskAdd").value = "";
  } else {
    show_msg(
      "Got an error !",
      "Please write something in inputbox to add a task"
    );
  }
});

document.getElementById("edit-back").addEventListener("click", () => {
  document.getElementsByClassName("edit")[0].style.animation = "fade_in 1s";
  document.getElementsByClassName("container")[0].style.animation =
    "fade_out 1s";
  setTimeout(() => {
    document.getElementsByClassName("edit")[0].style.display = "none";
    document.getElementsByClassName("container")[0].style.display = "block";
  }, 900);
});

document.getElementById("taskAdd").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    let value = document.getElementById("taskAdd").value;
    if (value.length > 0) {
      addTasks(value);
      document.getElementById("taskAdd").value = "";
    } else {
      show_msg(
        "Got an error !",
        "Please write something in inputbox to add a task"
      );
    }
  }
});

function load_data() {
  try {
    let ma = localStorage.getItem("data").split(";;;");
    for (let i of ma) {
      i = i.split(";;");
      if (i[0] != "null") {
        if (i[0].length > 0) {
          addTasks(i[0], i[1], i[2]);
        }
      }
    }
  } catch {}
}

load_data();

document.getElementById("edit-save").addEventListener("click", () => {
  let value = document.getElementById("edit-text").value;
  let num = document.getElementById("edit-save").getAttribute("num");
  num -= 1;
  for (let i in main_data) {
    if (main_data[i][0] == num) {
      main_data[i][1] = value;
      update();
      break;
    }
  }

  document.getElementsByClassName("edit")[0].style.animation = "fade_in 1s";
  document.getElementsByClassName("container")[0].style.animation =
    "fade_out 1s";
  location.reload();
});

let unlocked_path =
  "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z";
let locked_path =
  "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z";

let day_path =
  "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z";
let night_path =
  "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z";

let themes = localStorage.getItem("theme");
var r = document.querySelector(":root");
function dark_theme() {
  // dark theme then
  document.getElementById("theme").children[0].setAttribute("d", night_path);

  r.style.setProperty("--background", "#212121");
  r.style.setProperty("--areas", "#383838");
  r.style.setProperty("--color", "#fff");
  r.style.setProperty("--darkblue", "lightblue");
  r.style.setProperty("--task-hover", "rgba(0, 0, 0, 0.4)");
  theme = 1;
}
function light_theme() {
  // dark theme then
  document.getElementById("theme").children[0].setAttribute("d", day_path);
  r.style.setProperty("--background", "white");
  r.style.setProperty("--areas", "#ebecef");
  r.style.setProperty("--color", "black");
  r.style.setProperty("--darkblue", "darkblue");
  r.style.setProperty("--task-hover", "rgba(0, 0, 0, 0.1)");
  theme = 0;
}
if (themes == "1") {
  document.getElementById("thum").textContent = "Dark Mode";
  dark_theme();
}

document.getElementById("theme").addEventListener("click", () => {
  if (theme == 0) {
    dark_theme();
    localStorage.setItem("theme", "1");
    document.getElementById("thum").textContent = "Dark Mode";
  } else {
    light_theme();
    localStorage.setItem("theme", "0");
    document.getElementById("thum").textContent = "Light Mode";
  }
});

let login_status = 0;
if (localStorage.getItem("login") == null) {
  console.log("hhey");
  login_status = 1;
}

document.getElementById("login").addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username.length > 0 && password.length > 0) {
    localStorage.setItem("login", "1");
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("container")[0].style.display = "block";
    load_user();
  } else {
    show_msg("Empty!", "The input fields cannot be empty..");
  }
});

let lock = localStorage.getItem("lock");
let lock_status = false;
if (lock == "1") {
  document.getElementById("look").textContent = "Lock ON";
  lock_status = true;
}
function lock_off() {
  lock_status = false;
  localStorage.setItem("lock", "0");
  document.getElementById("look").textContent = "Lock Off";
  document.getElementById("lock").children[0].setAttribute("d", unlocked_path);
}
function lock_on() {
  lock_status = true;
  localStorage.setItem("lock", "1");
  document.getElementById("look").textContent = "Lock ON";
  document.getElementById("lock").children[0].setAttribute("d", locked_path);
}
document.getElementById("lock").addEventListener("click", () => {
  if (lock_status == false) {
    lock_on();
  } else {
    lock_off();
  }
});

document
  .getElementById("lock-input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      let pass = localStorage.getItem("password");
      if (document.getElementById("lock-input").value == pass) {
        document.getElementsByClassName("container")[0].style.display = "block";
        document.getElementsByClassName("lock")[0].style.display = "none";
      } else {
        document.getElementById("lock-input").style.color = "red";
        setTimeout(() => {
          document.getElementById("lock-input").value = "";
          document.getElementById("lock-input").style.color = "var(--color)";
        }, 500);
      }
    }
  });
function load_user() {
  try {
    document.getElementById("welcome").textContent =
      "WELCOME " + localStorage.getItem("username").toUpperCase() + "!";
  } catch {}
}
load_user();
if (login_status == 1) {
  document.getElementsByClassName("login")[0].style.display = "block";
} else if (lock_status == 1) {
  document.getElementsByClassName("lock")[0].style.display = "block";
  if (lock_status == true) {
    lock_on();
  } else {
    lock_off();
  }
} else {
  document.getElementsByClassName("container")[0].style.display = "block";
}
// localstorage items
// 1) login => value can be 0 or 1 depending upon if it is login or not
// 2) username & password
// 3) theme => theme of the application
// 4) data => contains all data or the todos
// 5) lock => it is to that next timme you have to enter password or not

document
  .getElementsByClassName("bottom-back")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("bottom")[0].style.display = "block";
    document.getElementsByClassName("bottom-task")[0].style.display = "none";
    bottomTaskCount = 0;
    a.disabled = false;
  });
