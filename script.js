const addBtn = document.getElementById("add");
        const clearBtn = document.getElementById("clear");
        const todoInput = document.getElementById("todo-task");
        const todoList = document.getElementById("todo-list");

        document.addEventListener("DOMContentLoaded", loadTodos);

        clearBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            if(todoInput.value === ""){
                return;
            }
            todoInput.value = "";
        });

        addBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            if(todoInput.value === ""){
                alert("Please enter a todo to add");
                return;
            }
            addTodoList(todoInput.value);
            saveTodoToLocalStorage(todoInput.value);
            todoInput.value = "";
        });

        function addTodoList(todoValue){
            const todoListItem = document.createElement("div");
            todoListItem.classList.add("todo-list-item");
            const todoText = document.createElement('p');
            todoText.classList.add("todo-text");
            todoText.textContent = todoValue;
            const clearBtn = document.createElement("button");
            clearBtn.classList.add("cross");
            clearBtn.textContent = "X";
            todoListItem.appendChild(todoText);
            todoListItem.appendChild(clearBtn);
            todoList.appendChild(todoListItem);

            clearBtn.addEventListener("click", (event)=>{
                event.preventDefault();
                todoList.removeChild(todoListItem);
                removeTodoFromLocalStorage(todoValue);
            });
        }

        function saveTodoToLocalStorage(todoValue) {
            let todos = getTodosFromLocalStorage();
            todos.push(todoValue);
            localStorage.setItem("todos", JSON.stringify(todos));
        }

        function getTodosFromLocalStorage() {
            let todos = localStorage.getItem("todos");
            if (todos === null) {
                todos = [];
            } else {
                todos = JSON.parse(todos);
            }
            return todos;
        }

        function loadTodos() {
            let todos = getTodosFromLocalStorage();
            todos.forEach(todo => addTodoList(todo));
        }

        function removeTodoFromLocalStorage(todoValue) {
            let todos = getTodosFromLocalStorage();
            todos = todos.filter(todo => todo !== todoValue);
            localStorage.setItem("todos", JSON.stringify(todos));
        }