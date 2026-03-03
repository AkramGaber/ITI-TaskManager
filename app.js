// import { modalSubmitBtn } from "./modal.js";

//*Selectors
const membersContainer = document.querySelector(".members-container");
const tasksInput = document.querySelector("#tasks-input");
const taskBtn = document.querySelector("#task-btn");
const tasksContainer = document.querySelector(".tasks-container");
const taskError = document.querySelector(".task-error");



//* EmptyState!
const updateEmptyState = (container, message) => {
    const existing = container.querySelector(".empty-state");
    if (container.querySelectorAll(".task").length === 0) {
        if (!existing) {
            const empty = document.createElement("p");
            empty.classList.add("empty-state");
            empty.textContent = message;
            container.appendChild(empty);
        }
    } else {
        if (existing) existing.remove();
    }
};

//* Counters
const updateBacklogCounter = () => {
    const counter = document.querySelector("#backlog-card .task-counter");
    if (counter) {
      counter.textContent = tasksContainer.querySelectorAll(".task").length;  
    } 
    updateEmptyState(tasksContainer, "No tasks added yet");
};


const updateCounter = (card) => {
    const memberTasks = card.querySelector(".member-tasks");
    if (!memberTasks) return; 
    const counter = card.querySelector(".task-counter");
    if (counter) {
        counter.textContent = memberTasks.querySelectorAll(".task").length;
    }
    updateEmptyState(memberTasks, "No tasks assigned yet");
};

//*create a task element function:
export const createTaskElement = (text, isBacklog = true) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("draggable", "true");
    task.dataset.text = text;

    if(isBacklog){
        //^ we add only text and delete to backlog tasks
        task.innerHTML = `
            <span class="task-text">${text}</span>
            <button class="delete-task" title="Delete Task">x</button>
        `;
        task.querySelector(".delete-task").addEventListener("click", () => {
            task.remove();
            updateBacklogCounter();
        });
    } else {
        //* if task is not in backlog(member card) -> text + select status + delete button
        task.innerHTML = `
            <span class="task-text">${text}</span>
            <select class="task-status">
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <button class="delete-task" title="Return to backlog">x</button>
        `;

        const select = task.querySelector(".task-status");
        const applyStatus = (value) => {
            task.dataset.status = value;
            //^disabling dragging when status === done
            task.setAttribute("draggable", value !== "done");
        };

        select.addEventListener("change", () => applyStatus(select.value));
        applyStatus("not-started");

        //^deleting a task from member card -> back to backlog
        task.querySelector(".delete-task").addEventListener("click", () => {
            const parentCard = task.closest(".member-card");
            task.remove();
            if(parentCard) updateCounter(parentCard);
            returnToBacklog(text);
        });
    }

    attachDragEvents(task);
    return task;
};

//* returning task to backlog function!
const returnToBacklog = (text) => {
    const task = createTaskElement(text, true);
    tasksContainer.appendChild(task);
    updateBacklogCounter();
};

//* Add tasks to backlog function:
export const addingTasks = () => {
    const text = tasksInput.value.trim();
    if(!text) {
        taskError.textContent = "Enter a task first!";
        taskError.classList.remove("hidden");
        return;
    }
    taskError.classList.add("hidden");
    const task = createTaskElement(text, true);
    tasksContainer.appendChild(task);
    tasksInput.value = "";
    updateBacklogCounter();
};

taskBtn.addEventListener("click", addingTasks);
//^ Enter Click to add a task ^//
tasksInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") addingTasks();
});

//* Displaying member Cards:
export const displayingCard = (members) => {
    membersContainer.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card", "member-card");
        card.innerHTML = `
            <div class="heading">
                <h2 class="card-heading">${member}</h2>
                <span class="task-counter">0</span>
            </div>
            <div class="tasks-container member-tasks"></div>
        `;
        membersContainer.appendChild(card);
        setupDropZone(card);
        updateCounter(card);
    });
};

//* Drag and Drop:
//^ dragging first from the selected card
export const attachDragEvents = (task) => {
    task.addEventListener("dragstart", (e) => {
        if(task.dataset.status === "done"){
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData("text/plain", task.dataset.text);
        e.dataTransfer.effectAllowed = "move"; //& changes the browser cursor
        setTimeout(() => task.classList.add("is-dragging"), 0); //~ waits till this event loop to finish and then add the class to prevent what's called drag Ghost Image!
    }); //^ dragstart
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
};

//^ dropping second to the wanted card
const setupDropZone = (card) => {
    card.addEventListener("dragover", (e) => {
        e.preventDefault();
        card.classList.add("drag-over");
    });

    card.addEventListener("dragleave", (e) => {
        if(!card.contains(e.relatedTarget)){
            card.classList.remove("drag-over");
        }
    });

    card.addEventListener("drop", (e) => {
        e.preventDefault();
        card.classList.remove("drag-over");
        const text = e.dataTransfer.getData("text/plain");
        if(!text) return;

        const existing = document.querySelector(`.task[data-text="${CSS.escape(text)}"]`); //^to scape special characters
        if(existing) {
            const oldParent = existing.closest(".card");
            existing.remove();
            if(oldParent) updateCounter(oldParent);
            updateBacklogCounter();
        }

        //^ Add to this member card:
        const isMemberCard = card.classList.contains("member-card");
        const newTask = createTaskElement(text, !isMemberCard);
        const container = card.querySelector(".tasks-container") || card;
        container.appendChild(newTask);
        updateCounter(card);
    });
};


document.addEventListener("DOMContentLoaded", () => {
    updateBacklogCounter();
});

