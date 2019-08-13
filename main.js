//Func
function createElement(type, className) {
    var el = document.createElement(type);
    if(className) {
        el.classList.add(className)
    }
    return el
}
function createParagraph(text, className) {
    var p = createElement("p", className);
    p.innerHTML = text;
    return p
}
function createUl(className) {
    var ul = createElement('ul', className)
    return ul
}
function createDiv(className) {
    var div = createElement("div", className)
    return div
}
function createBtn(text, className, dataPurpose) {
    var btn = createElement("button", className)
    btn.innerText = text
    btn.setAttribute("data-purpose", dataPurpose)
    return btn
}

let todoArr = [];
function createTodo(text) {
    let storedTodo = JSON.parse(localStorage.getItem("todos"));
    if(storedTodo){
        if(storedTodo.indexOf(text) !== -1){
            alert('It appears the Todo is already there. Create another One');
            return false;
        }else{
            storedTodo.push(text);
            localStorage.setItem("todos",JSON.stringify(storedTodo));
            icon.innerText = "Clear all TODOs";
            var li = createElement("li", "todo");
            var p = createParagraph(text);
            li.append(p)
            var btn_container = createDiv("btn-container")
            var upbtn =  createBtn("Up", "up", "up")
            var downbtn =  createBtn("Down", "down", "down")
            var removebtn =  createBtn("Remove", "remove", "remove")
            btn_container.append(upbtn)
            btn_container.append(downbtn)
            btn_container.append(removebtn)
            li.append(btn_container)
            return li;
        }
    }else{
        todoArr.push(text);
        localStorage.setItem("todos",JSON.stringify(todoArr));
        icon.innerText = "Clear all TODOs";

        var li = createElement("li", "todo");
        var p = createParagraph(text);
        li.append(p)
        var btn_container = createDiv("btn-container")
        var upbtn =  createBtn("Up", "up", "up")
        var downbtn =  createBtn("Down", "down", "down")
        var removebtn =  createBtn("Remove", "remove", "remove")
        btn_container.append(upbtn)
        btn_container.append(downbtn)
        btn_container.append(removebtn)
        li.append(btn_container)
        return li;
    }
}


//Select input and btn
var todoInput = document.getElementById('todo-input');
var btn = document.getElementById('addBtn');
var main = document.getElementById('todo-main');
let icon = document.querySelector(".icon span");
let clearBtn = document.getElementById('clearBtn');

if (typeof localStorage != undefined ) {

    btn.addEventListener("click", function() {
        if(todoInput.value.length > 0) {
            var todo = createTodo(todoInput.value);
            if(todo){
                todo.style.opacity = 0;
                setTimeout(function() {
                    todo.style.opacity = 1;
                },0)
                if(!main.querySelector('.todo')) {
                    var noTodoP = document.querySelector("p.no-todos")
                    main.removeChild(noTodoP);
                    var ul = createUl("todo-list");
                    ul.append(todo);
                    main.append(ul);
                }else {
                    var ul = document.querySelector(".todo-list");
                    ul.append(todo);
                }
            }else{}
            todoInput.value = "";
        }
    })

    todoInput.addEventListener('keyup', function(e) {
        if(todoInput.value.length > 0) {
            if(e.keyCode == 13) {
                var todo = createTodo(todoInput.value);
                if(todo){
                    todo.style.opacity = 0;
                    setTimeout(function() {
                        todo.style.opacity = 1
                    },0)
                    if(!main.querySelector('.todo')) {
                        var noTodoP = document.querySelector("p.no-todos")
                        main.removeChild(noTodoP);
                        var ul = createUl("todo-list")
                        ul.append(todo)
                        main.append(ul)
                    }else {
                        var ul = document.querySelector(".todo-list")
                        ul.append(todo)
                    }
                }else{}
                todoInput.value = ""
            }
        }
    })

    main.addEventListener("click", function(e) {
        if(e.target.nodeName === "BUTTON") {
            var button = e.target;
            var btnType = button.getAttribute("data-purpose");
            var li = button.parentElement.parentElement;
            let todoVal = li.firstChild.innerText;
            var ul = li.parentElement;
            let storedTodo = JSON.parse(localStorage.getItem("todos"));
            let index = storedTodo.indexOf(todoVal);

            switch(btnType) {
                case "remove":
                    storedTodo.splice(index,1);
                    localStorage.setItem("todos",JSON.stringify(storedTodo));

                    li.style.opacity = 1;
                    setTimeout(function() {
                        li.style.opacity = 0
                    },0)
                    ul.removeChild(li)
                    if (ul.children.length < 1) {
                        localStorage.clear();
                        icon.innerText = "Nothing to clean!";
                        var p = createParagraph("Your ToDo is Empty!<br>Add some.", "no-todos")
                        main.removeChild(document.querySelector(".todo-list"));
                        main.append(p)
                    }
                    break;
                case "up":
                    var prevEl = li.previousElementSibling;
                    if(prevEl != null) {
                        let temp = storedTodo[index];
                        storedTodo[index] = storedTodo[index-1];
                        storedTodo[index-1] = temp;
                        localStorage.setItem("todos",JSON.stringify(storedTodo));

                        ul.removeChild(li)
                        ul.insertBefore(li, prevEl)
                    }
                    break;
                case "down":
                    var nextEl = li.nextElementSibling
                    if(nextEl != null) {
                        let temp = storedTodo[index];
                        storedTodo[index] = storedTodo[index+1];
                        storedTodo[index+1] = temp;
                        localStorage.setItem("todos",JSON.stringify(storedTodo));
                        ul.removeChild(li)
                        ul.insertBefore(li, nextEl.nextElementSibling)
                    }
                    break;
            }
        }
    })
//If Block of Local Storage End
}else {
    alert('Update your Browser for Better Experience.');
}


//On START UP
window.onload = () =>{
    let storedTodo = JSON.parse(localStorage.getItem("todos"));
    if(storedTodo){
        // console.dir(storedTodo.length);
        var noTodoP = document.querySelector("p.no-todos");
        main.removeChild(noTodoP);
        let ulData = createUl('todo-list');
        let li = "";
        for(let i = 0; i< storedTodo.length; i++){
        li += `<li class="todo" style="opacity: 1;"><p>${storedTodo[i]}</p><div class="btn-container"><button class="up" data-purpose="up">Up</button><button class="down" data-purpose="down">Down</button><button class="remove" data-purpose="remove">Remove</button></div></li>`;
        }
        ulData.innerHTML = li;
        main.append(ulData);

        clearBtn.addEventListener('click',()=>{
        localStorage.clear();
        main.innerHTML = `<p class="no-todos">Your ToDo is Empty!<br>Add some.</p>`;
        icon.innerText = "Nothing to clean!";
        });
    }else{
        // console.log('Empty');
        icon.innerText = "Nothing to clean!";
    }
}
