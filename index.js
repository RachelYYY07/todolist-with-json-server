const APIs = (() => {
    const createTodo = (newTodo) => {
        return fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {"Content-Type": "application/json"},
        }).then((res) => res.json());
    };



    const createComplete = (newTodo) => {
        return fetch("http://localhost:3000/completed", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {"Content-Type": "application/json"},
        }).then((res) => res.json());
    };

    const deleteTodo = (id) => {
        return fetch("http://localhost:3000/todos/" + id, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const deleteComplete = (id) => {
        return fetch("http://localhost:3000/completed/" + id, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const updateTodo = (id, content) => {
        const newProfile = {
            content: content,
        };
        return fetch("http://localhost:3000/todos/" + id, {
            method: "PUT",
            body: JSON.stringify(newProfile),
            headers: {"Content-Type": "application/json"},
        }).then((res) => res.json());
    };


    const updateComplete = (id, content) => {
        const newProfile = {
            content: content,
        };
        return fetch("http://localhost:3000/completed/" + id, {
            method: "PUT",
            body: JSON.stringify(newProfile),
            headers: {"Content-Type": "application/json"},
        }).then((res) => res.json());
    };

    const getTodos = () => {
        return fetch("http://localhost:3000/todos").then((res) => res.json());
    };

    const getComplete = () => {
        return fetch("http://localhost:3000/completed").then((res) => res.json());
    };
    return {createTodo,createComplete, deleteTodo, deleteComplete, getTodos, updateTodo,updateComplete, getComplete};
})();


const Model = (() => {
    class State {
        #todos; //private field
        #completedList; //private field
        #onChange; //function, will be called when setter function todos is called
        #onCompleteChange; //function, will be called when setter function todos is called
        constructor() {
            this.#todos = [];
            this.#completedList = [];
        }

        get todos() {
            return this.#todos;
        }

        set todos(newTodos) {
            // reassign value
            console.log("setter function");
            this.#todos = newTodos;
            this.#onChange?.(); // rendering
        }

        get toCompletedList() {
            return this.#completedList;
        }

        set toCompletedList(newCompletedList) {
            // reassign value
            console.log("setter function");
            this.#completedList = newCompletedList;
            this.#onCompleteChange?.(); // rendering
        }

        subCompleteScribe(callback) {
            //subscribe to the change of the state todos
            this.#onCompleteChange = callback;
        }

        subscribe(callback) {
            //subscribe to the change of the state todos
            this.#onChange = callback;
        }
    }

    const {getTodos, createTodo,createComplete, deleteTodo, deleteComplete, updateTodo, getComplete,updateComplete} = APIs;
    return {
        State,
        getTodos,
        createTodo,
        createComplete,
        deleteTodo,
        deleteComplete,
        updateTodo,
        updateComplete,
        getComplete,
    };
})();

const View = (() => {
    // 在这里执行您的JavaScript代码
    const todolistEl = document.querySelector(".todo-list");
    const completeListEl = document.querySelector(".complete-list");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");

    const renderTodos = (todos) => {
        console.log(todos)

        todos.forEach((todo) => {
            const liTemplate = `

                    <input type="text" class="input-value"  style="width: 300px;outline: none;border: none;background-color: #e8d7c9" value="${todo.content}" onchange="onInputChange(event)">
                    
                    <button class="update-btn" id="${todo.id}" style="background-color: #e8d7c9;border: none;outline: none">
                     <svg style="height: 25px;width: 25px;background-color: #008cba;cursor: pointer;pointer-events: none" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24"  aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </button>
      
                    <button class="delete-btn" id="${todo.id}" style="background-color: #e8d7c9;border: none;outline: none">
                      <svg  style="height: 25px;width: 25px;background-color: #c94c4c;cursor: pointer;pointer-events: none" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </button>
                    
                    <button class="right-btn" id="${todo.id}" style="background-color: #e8d7c9;border: none;outline: none">
                    <svg style="height: 25px;width: 25px;background-color: #4caf50;cursor: pointer;pointer-events: none" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>

                    </button>
                    
                 
             
            `;
            const li = document.createElement('li');
            li.className = `class${todo.id}`
            li.innerHTML = liTemplate
            todolistEl.appendChild(li)

        });

    };


    const renderComplete = (completes) => {
        console.log(completes)
        completes.forEach((complete) => {
            const liTemplate = `

                    <button class="left-btn" id="${complete.id}" style="background-color: #e8d7c9;border: none;outline: none">
                    <svg style="height: 25px;width: 25px;background-color: #4caf50;cursor: pointer;pointer-events: none" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    </button>
                    
                    <input type="text" class="input-value"  style="width: 300px;outline: none;border: none;background-color: #e8d7c9" value="${complete.content}" onchange="onInputChange(event)">
                    
                    <button class="complete-update-btn" id="${complete.id}" style="background-color: #e8d7c9;border: none;outline: none">
                     <svg style="height: 25px;width: 25px;background-color: #008cba;cursor: pointer;pointer-events: none" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24"  aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </button>
      
                    <button class="complete-delete-btn" id="${complete.id}" style="background-color: #e8d7c9;border: none;outline: none">
                      <svg  style="height: 25px;width: 25px;background-color: #c94c4c;cursor: pointer;pointer-events: none" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </button>
                   
             
            `;

            const li = document.createElement('li');
            li.innerHTML = liTemplate
            completeListEl.appendChild(li)
        });

    };

    const clearInput = () => {
        inputEl.value = "";
    };


    return {renderTodos, submitBtnEl, inputEl, clearInput, todolistEl, renderComplete, completeListEl};

})();

const Controller = ((view, model) => {
    const state = new model.State();
    const init = () => {
        model.getTodos().then((todos) => {
            todos.reverse();
            state.todos = todos;
        });


    };
    const initComplete = () => {
        model.getComplete().then((completeList) => {
            completeList.reverse();
            state.toCompletedList = completeList;
        });
    }

    const handleSubmit = () => {
        view.submitBtnEl.addEventListener("click", (event) => {

            const inputValue = view.inputEl.value;
            model.createTodo({content: inputValue}).then((data) => {
                // state.todos = state.todos.push(data);
                console.log(data)
                view.clearInput();
            });
            location.reload()
            // init()

        });
    };


    const handleSubmitRight = () => {
        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "right-btn") {
                const id = event.target.id;
                const inputValue = document.querySelector('.input-value')
                console.log(22222222222)
                console.log(inputValue.value)
                let params={}
                params.id= +id
                params.content=inputValue.value
                model.createComplete(params).then((data) => {

                });
                model.deleteTodo(+id).then((data) => {

                });
                location.reload()
            }
        });


    };


    const handleSubmitLeft = () => {
        view.completeListEl.addEventListener("click", (event) => {
            if (event.target.className === "left-btn") {
                const id = event.target.id;
                const inputValue = document.querySelector('.input-value')
                console.log(22222222222)
                console.log(inputValue.value)
                let params={}
                params.id= +id
                params.content=inputValue.value
                model.createTodo(params).then(() => {

                });
                model.deleteComplete(+id).then(() => {

                });
                location.reload()
            }
        });


    };

    const handleUpdate = () => {
        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "update-btn") {
                const id = event.target.id;
                const inputValue = document.querySelector('.input-value')
                console.log(22222222222)
                console.log(inputValue.value)
                model.updateTodo(+id, inputValue.value).then((data) => {

                });
                location.reload()
            }
        });
    };


    const handleCompleteUpdate = () => {
        view.completeListEl.addEventListener("click", (event) => {
            if (event.target.className === "complete-update-btn") {
                const id = event.target.id;
                const inputValue = document.querySelector('.input-value')
                console.log(22222222222)
                console.log(inputValue.value)
                model.updateComplete(+id, inputValue.value).then((data) => {

                });
                location.reload()
            }
        });
    };

    const handleDelete = () => {

        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = event.target.id;
                console.log("id", typeof id);
                model.deleteTodo(+id).then((data) => {

                });
                location.reload()
            }
        });
    };

    const handleCompleteDelete = () => {

        view.completeListEl.addEventListener("click", (event) => {
            if (event.target.className === "complete-delete-btn") {
                const id = event.target.id;
                console.log("id", typeof id);
                model.deleteComplete(+id).then((data) => {

                });
                location.reload()
            }
        });
    };


    const bootstrap = () => {
        init();
        initComplete();
        state.subscribe(() => {
            view.renderTodos(state.todos);
        });
        state.subCompleteScribe(() => {
            view.renderComplete(state.toCompletedList);
        })
        handleSubmit();
        handleDelete();
        handleCompleteDelete();
        handleUpdate();
        handleCompleteUpdate();
        handleSubmitLeft();
        handleSubmitRight();

    };
    return {
        bootstrap,
    };

})(View, Model); //ViewModel
Controller.bootstrap();

