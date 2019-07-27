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
function createTodo(text) {
    var li = createElement("li", "todo")
    var p = createParagraph(text)
    li.append(p)
    var btn_container = createDiv("btn-container")
    var upbtn =  createBtn("Up", "up", "up")
    var downbtn =  createBtn("Down", "down", "down")
    var removebtn =  createBtn("Remove", "remove", "remove")
    btn_container.append(upbtn)
    btn_container.append(downbtn)
    btn_container.append(removebtn)
    li.append(btn_container)
    return li
}


//Select input and btn
var todoInput = document.getElementById('todo-input')
var btn = document.getElementById('addBtn')
var main = document.getElementById('todo-main')


btn.addEventListener("click", function() {
    if(todoInput.value.length > 0) {
        var todo = createTodo(todoInput.value)
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
        todoInput.value = ""
    }
})

todoInput.addEventListener('keyup', function(e) {
    if(todoInput.value.length > 0) {
        if(e.keyCode == 13) {
            var todo = createTodo(todoInput.value)
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
            todoInput.value = ""
        }
    }
})

main.addEventListener("click", function(e) {
    if(e.target.nodeName === "BUTTON") {
        var button = e.target;
        var btnType = button.getAttribute("data-purpose")
        var li = button.parentElement.parentElement
        var ul = li.parentElement

        switch(btnType) {
            case "remove":
                li.style.opacity = 1;
                setTimeout(function() {
                    li.style.opacity = 0
                },0)
                ul.removeChild(li)
                if (ul.children.length < 1) {
                    var p = createParagraph("Your ToDo is Empty!<br>Add some.", "no-todos")
                    main.removeChild(document.querySelector(".todo-list"));
                    main.append(p)
                }
                break;
            case "up":
                var prevEl = li.previousElementSibling;
                if(prevEl != null) {
                    ul.removeChild(li)
                    ul.insertBefore(li, prevEl)
                }
                break;
            case "down":
                var nextEl = li.nextElementSibling
                if(nextEl != null) {
                    ul.removeChild(li)
                    ul.insertBefore(li, nextEl.nextElementSibling)
                }
                break;
        }
    }
})
