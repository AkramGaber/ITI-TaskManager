import { displayingCard } from "./app.js";

const modalDialog = document.querySelector("#modal-dialog");
const membersInput = modalDialog.querySelector("#members-input");
const modalSubmit = modalDialog.querySelector("#modal-submit");
const modalError = modalDialog.querySelector("#modal-error");

//* show modal when page load!
window.addEventListener("load", () => {
    modalDialog.showModal();
});


//!Displaying and hidding error messages
const showError = (message) => {
    modalError.textContent = message;
    modalError.classList.remove('hidden');
};

const clearError = () => {
    modalError.textContent = '';
    modalError.classList.add('hidden');
};

//* Preventing default escape closing on dialog
modalDialog.addEventListener("cancel", (e) => {
    e.preventDefault();
});

//* Allowing Enter key to submit input
modalSubmit.addEventListener("keydown", (e) => {
    if(e.key === "Enter") modalSubmit.click();
});


modalSubmit.addEventListener("click", () => {
    clearError();
    //^ creating the members array
    const members = membersInput.value.split(",").map(member => member.trim()).filter(member => member.length > 2);
    if(members.length === 0) {
        showError("Please enter at least one team member!");
        return;
    }
    
    const uniqueMembers = [...new Set(members)];
    if(uniqueMembers.length !== members.length){
        console.log(`members: ${members} unique: ${uniqueMembers}`);
        showError("You have entered a team member's name Twice!");
        return;
    }
    
    if(members.some(member => member.length > 20)){
        showError("Name should be 20 characters or fewer!");
        return;
    }
    
    console.log(members);
    
    modalDialog.close();
    displayingCard(members);
});