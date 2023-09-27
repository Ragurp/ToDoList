
let input = document.querySelector("input");
let btn = document.querySelector(".button");
let todos = document.querySelector(".todos");
var array = JSON.parse(localStorage.getItem("todos")) || [];

// GET ELMENT IN TO localStorage
window.addEventListener("load", () => {
    array.forEach((todo) => addTodo(todo));
});

//ENTER KEY
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

// SET ELMENT IN TO localStorage
btn.addEventListener("click", () => {
    input.focus();
    if (input.value != "") {
        array.push(input.value);
        localStorage.setItem("todos", JSON.stringify(array));
        addTodo(input.value);
        input.value = "";
    }
});

function addTodo(todo) {
    todos.style.display = "block";
    let div = document.createElement("div");
    div.innerHTML = `<div class="box">
          <p class="para">${todo}</p>
          <div class="inner">
            <i class="fa-solid fa-pen-to-square edit"></i>
            <i class="fa-solid fa-trash del"></i>
          </div>
        </div>`;
    todos.appendChild(div);

    // update.................
    div.querySelector(".edit").addEventListener("click", () => {
        div.querySelector(".para").contentEditable = true;
        div.querySelector(".del").contentEditable = false;
        div.querySelector(".edit").contentEditable = false;
        div.querySelector(".para").focus();
        update();
    });
    function update() {
        div.querySelector(".para").addEventListener("blur", () => {
            for (let i = 0; i < array.length; i++) {
                if (array[i] != document.querySelectorAll(".para")[i].innerText) {
                    array[i] = document.querySelectorAll(".para")[i].innerText;
                    if (array[i] == "") {
                        remove(div.querySelector(".para").innerText);
                        div.removeChild(div.querySelector(".box"));
                    }
                }
            }
            localStorage.setItem("todos", JSON.stringify(array));
        });
    }

    // remove.....................
    div.querySelector(".del").addEventListener("click", () => {
        remove(div.querySelector(".para").innerText);
        div.removeChild(div.querySelector(".box"));
    });
}
function remove(todo) {
    let index = array.indexOf(todo);
    if (index > -1) {
        array.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(array));
    }
}
