let list = [];
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");
let todoItemList = document.getElementsByClassName("todoItem");

function addToList() {
  console.log("sdfghjkl");
  let inputRef = document.getElementById("listInput");
  let item = inputRef.value;
  if (item.length === 0) {
    return alert("input is empty");
  } else {
    list.push(item);
    generateListHTML();
    storeData(list, "todo");
  }
}

function renderData() {
  let loadList = retrieveData("todo");

  list = loadList;
  generateListHTML();
}

function storeData(data, key) {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  localStorage.setItem(key, data);
}

function retrieveData(key) {
  let data = localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  } finally {
    return data;
  }
}

function generateListHTML() {
  let output = "";

  if (list.length === 0) {
    output = "<p>This list is empty</p>";
  }

  for (let i = 0; i < list.length; i++) {
    let item = list[i];

    output += `<p class="todoItem"><h2>${item}</h2>
        <button onclick="editItem(this)">Edit</button>
        <button onclick="deleteItem(this)">Remove</button></p>`;
  }
  todoList.innerHTML = output;
}

function deleteItem(removeButton) {
  console.log(removeButton);
  let todoItem =
    removeButton.previousElementSibling.previousElementSibling.textContent;

  list = list.filter((item) => item !== todoItem);
  console.log(list);
  storeData(list, "todo");
  generateListHTML();
}

function editItem(editButton) 
{
  let inputRef = document.getElementById("listInput");
  inputRef.value = editButton.previousElementSibling.textContent;
  deleteItem(editButton.nextElementSibling)
}
