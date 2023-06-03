const inputText = document.getElementById("inputText");
const addItemButton = document.getElementById("addItem");
const todoList = document.getElementById("todoList");
let items = [];

function handleChange(event) {
  const newValue = event.target.value;
  inputText.value = newValue;
}

let showPlaceholderMessage = false;

function addItem() {
  const text = inputText.value.trim();
  if (text !== "") {
    items.push({ text: text, deleted: false });
    inputText.value = "";
    showPlaceholderMessage = false;
    renderTodoList();
  } else {
    showPlaceholderMessage = true;
    renderTodoList();
  }
}

function handleInputChange(event) {
  const newValue = event.target.value;
  inputText.value = newValue;
  showPlaceholderMessage = false;
  renderTodoList();
}


function handleItemClick(index) {
  const updatedItems = [...items];
  updatedItems[index].deleted = true;

  renderTodoList(updatedItems); // Render the updated list immediately

  setTimeout(() => {
    const filteredItems = updatedItems.filter(item => !item.deleted);
    items = filteredItems;
    renderTodoList(filteredItems); // Render the filtered list after a delay
  }, 500);
}


function renderTodoList(itemsToRender = items) {
  todoList.innerHTML = "";

  itemsToRender.forEach((todoItem, index) => {
    const li = document.createElement("li");
    li.textContent = todoItem.text;
    li.addEventListener("click", () => handleItemClick(index));
    li.style.textDecoration = todoItem.deleted ? "line-through" : "none";
    todoList.appendChild(li);
  });

  if (showPlaceholderMessage) {
    inputText.placeholder = "Empty Item? 👀";
  } else {
    inputText.placeholder = "Enter item";
  }
}




addItemButton.addEventListener("click", addItem);
inputText.addEventListener("input", handleChange);
