let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// display_task();
display_table();

function add_task(){
    const input = document.getElementById("input_task");
    const task_text = input.value.trim();
    const task_title = document.getElementById("input_task_title").value.trim();
    if(task_title === ""){
        alert("enter valid tasks");
        return;
    }
    if(task_text === ""){
        alert("enter valid tasks");
        return;
    }
    tasks.push({
        Title:task_title,
        Text:task_text,
        is_completed: true
    });
    // display_task();
    setlocal();
    display_table();
    input.value = "";
    document.getElementById("input_task_title").value = "";
    // console.log(tasks);
}
// function toggle_task(index){
//     tasks[index].is_completed = !tasks[index].is_completed;
//     // display_task();
//     display_table();
// }
// function delete_task(index){
//     tasks.splice(index , 1);
//     // display_task();
//     display_table();
// }

function display_table(){
    const heading = document.getElementById('table_heading');
    const table = document.querySelector('table');
    table.innerHTML = "";
    table.appendChild(heading);
    tasks.forEach((task , index) =>{
        const tr = document.createElement("tr");

        const sr = document.createElement("td");
        sr.innerText = index+1;
        const title = document.createElement("td");
        title.innerText = task.Title;
        const text = document.createElement("td");
        text.innerText = task.Text;
        
        const status_td = document.createElement("td");
        const status = document.createElement("button");
        status.innerText = task.is_completed ? "COMPLETE" : "UNDO";
        if(task.is_completed){
            status.style.backgroundColor = "greenyellow";
            tr.style.textDecoration = "";
        } else {
            status.style.backgroundColor = "wheat";
            tr.style.textDecoration = "line-through";
        }
        status.id = "status"
        status_td.append(status);
        status.addEventListener('click' , ()=>{
            task.is_completed = !task.is_completed;
            status.innerText = task.is_completed ? "COMPLETE" : "UNDO";
            if(task.is_completed){
            status.style.backgroundColor = "greenyellow";
            tr.style.textDecoration = "";
            } else {
                status.style.backgroundColor = "wheat";
                tr.style.textDecoration = "line-through";
            }
            setlocal();
        });
        // status.addEventListener('hover' , ()=>{
        //     task.is_completed = !task.is_completed;
        //     status.innerText = task.is_completed ? "COMPLETED" : "PENDING";
        //     if(task.is_completed)status.style.backgroundColor = "greenyellow";
        //     else status.style.backgroundColor = "wheat";
        //     setlocal();
        // });
        const del_td = document.createElement("td");
        const del = document.createElement("button");
        del.innerText = "Delete";
        del.id = "delete"
        del_td.append(del);
        del.addEventListener('click' , ()=>{
            tr.remove();
            tasks.splice(index , 1);
            display_table();
            setlocal();
        });
        
        tr.append(sr);
        tr.append(title);
        tr.append(text);
        tr.append(status_td);
        tr.append(del_td);
        table.append(tr);
    });
}

function setlocal (){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}


// function display_task(){
//     const tasklist = document.getElementById("task_list");
//     tasklist.innerHTML = "";
//     tasks.forEach((task , index) => {
//         const li = document.createElement("li");
//         li.innerHTML = `<span id = "overflow_task" class = "${task.is_completed ? "completed" : "" }"> ${task.Text} </span>
//                         <div class = "button_group">
//                         <button onclick = "${task.is_completed ? '' : `toggle_task(${index})`}" ${task.is_completed ? "disabled" : ''}
//                         class = "${task.is_completed ? 'completed_button' : ''}">
//                         ${task.is_completed ? "Done!" : "To be done"} </button>
//                         <button class = "delete_button" onclick = "delete_task(${index})"> Del </button>
//                         </div>`;
//         tasklist.appendChild(li);
//     });
// }

