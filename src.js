document.addEventListener("DOMContentLoaded", () => {
  const text = document.getElementById("toDoText");
  const button = document.getElementById("addText");
  const list = document.getElementById("list");
  const clearButton = document.getElementById("clearText");
  let todoList = [];

  if (localStorage.getItem("todo")) {
    todoList = JSON.parse(localStorage.getItem("todo"));
    displayMessages();
  }
  clearButton.addEventListener("click", () => {
    todoList = [];
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayMessages();
  });
  button.addEventListener("click", () => {
    let newTodo = {
      list: text.value,
      checked: false,
    };

    todoList.push(newTodo);
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayMessages();
    text.value = "";
  });
  function isCheck(index) {
    todoList[index].checked = !todoList[index].checked;
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayMessages();
  }
  function deleteToDo(index) {
    todoList.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayMessages();
    console.log(index);
  }
  function displayMessages() {
    let displayMessage = "";
    list.innerHTML = "";
    todoList.forEach(function (item, index) {
      displayMessage += `
      <div class="todo_current">
      <div class="todo_text">
      <p>${item.list}</p></div>
      <input type="checkbox" onclick="isCheck(${index})"class="checkbox_input" ${
        item.checked ? "checked" : ""
      } />
      <img onclick="deleteToDo(${index})"class="delete_icon" src="deleteIcon.svg"/>
      </div>
      `;
      list.innerHTML = displayMessage;
    });
  }

  window.deleteToDo = deleteToDo;
  window.isCheck = isCheck;
});
