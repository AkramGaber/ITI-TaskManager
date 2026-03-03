# ITI Task Manager 📋

A modern, drag-and-drop task management application built with **vanilla JavaScript**, **HTML5**, and **CSS3**. This task demonstrates practical implementation of modern web development concepts including the Drag & Drop API, ES6+ features, and responsive design principles.

## 🎯 Task Overview

ITI Task Manager is a Trello-inspired task board that allows teams to manage tasks efficiently through an intuitive drag-and-drop interface. Users can create team member cards, assign tasks, track progress with status indicators, and seamlessly move tasks between team members.

### ✨ Key Features

- **🎨 Dark/Light Theme Toggle** - Persistent theme preferences using `localStorage`
- **🎭 Modal-Based Team Setup** - Dynamic team member creation with validation
- **🖱️ Drag & Drop Interface** - Smooth task assignment using HTML5 Drag & Drop API
- **📊 Task Status Tracking** - Three-state progress tracking (Not Started, In Progress, Done)
- **🔄 Dynamic Task Management** - Add, delete, and reassign tasks in real-time
- **📱 Responsive Design** - Flexbox and Grid layouts for all screen sizes
- **🎯 Live Task Counters** - Real-time updates for task counts per team member
- **⚡ Smart Validation** - Input validation with helpful error messages
- **♿ Semantic HTML** - Accessible structure with meaningful elements

## 🛠️ Technologies & Concepts

### HTML5 Features
- **Semantic Elements** - `<nav>`, `<main>`, `<dialog>` for better structure and accessibility
- **Drag & Drop API** - Native browser implementation with `draggable` attribute and data transfer
- **Form Elements** - Modern input handling with autocomplete and validation

### CSS3 Techniques
- **CSS Custom Properties** - Theme management with CSS variables for easy customization
- **Flexbox & Grid Layouts** - Responsive card-based layout system
- **CSS Transitions** - Smooth hover effects and state changes
- **Dynamic Theming** - `[data-theme]` attribute for light/dark mode switching
- **Color Functions** - `color-mix()` for dynamic color generation

### Modern JavaScript (ES6+)
- **ES6 Modules** - Modular code organization with `import`/`export`
- **Arrow Functions** - Concise function syntax throughout the application
- **Template Literals** - Dynamic HTML generation with embedded expressions
- **Destructuring** - Clean data extraction from objects and arrays
- **Array Methods** - `map()`, `filter()`, `forEach()`, and `some()` for data manipulation
- **Spread Operator** - Set operations for duplicate detection (`[...new Set()]`)
- **Event Delegation** - Efficient event handling for dynamic elements
- **DOM Manipulation** - `querySelector`, `createElement`, `classList` API
- **Local Storage API** - Persistent theme preferences across sessions

## 📁 Task Structure
```
iti-task-manager/
├── index.html          # Main HTML structure
├── app.js              # Core task management logic
├── modal.js            # Team setup modal functionality
├── theme.js            # Theme toggle implementation
└── style.css           # Styling and theme definitions
```

## 🚀 How to Use

1. **Setup Your Team**
   - Enter team member names separated by commas when the modal appears
   - Names must be unique and under 20 characters

2. **Add Tasks**
   - Type task descriptions in the "Tasks List" input field
   - Click "Add" or press Enter to create a task

3. **Assign Tasks**
   - Drag tasks from the backlog to team member cards
   - Drop them on any member's card to assign

4. **Track Progress**
   - Use the dropdown menu on assigned tasks to update status
   - Tasks marked as "Done" cannot be moved (drag disabled)

5. **Manage Tasks**
   - Click the "x" button on backlog tasks to delete them
   - Click the "x" button on assigned tasks to return them to the backlog

6. **Toggle Theme**
   - Click the moon/sun icon in the navigation to switch between light and dark modes

## 🎓 Learning Outcomes

This project reinforced several critical web development concepts:

### HTML5 & CSS3
- Building accessible interfaces with semantic HTML elements
- Implementing modern layout systems (Flexbox, Grid)
- Creating smooth animations and transitions
- Managing complex theming with CSS variables
- Understanding the HTML5 Drag & Drop API lifecycle

### Modern JavaScript
- Organizing code with ES6 modules for maintainability
- Writing cleaner code with arrow functions and template literals
- Handling asynchronous DOM events efficiently
- Implementing data validation and error handling
- Managing application state with dynamic updates
- Using destructuring for cleaner data operations

### Software Engineering Practices
- Separation of concerns (separate files for modal, theme, core logic)
- Defensive programming with input validation
- User experience considerations (empty states, error messages, visual feedback)
- Code reusability through modular functions
- Event-driven architecture

## 💡 Key Implementation Highlights

### Drag & Drop Implementation
```javascript
// Prevent dragging of completed tasks
task.addEventListener("dragstart", (e) => {
    if(task.dataset.status === "done"){
        e.preventDefault();
        return;
    }
    e.dataTransfer.setData("text/plain", task.dataset.text);
    e.dataTransfer.effectAllowed = "move";
});
```

### Dynamic Theme Switching
```javascript
const isDark = body.getAttribute("data-theme") === "dark";
const next = isDark ? "light" : "dark";
body.setAttribute("data-theme", next);
localStorage.setItem("theme", next);
```

### Smart Validation with Spread Operator
```javascript
const uniqueMembers = [...new Set(members)];
if(uniqueMembers.length !== members.length){
    showError("You have entered a team member's name Twice!");
}
```

## 🎨 Design Decisions

- **Card-Based Layout**: Familiar Trello-like interface for intuitive task management
- **Visual Feedback**: Drag-over states, hover effects, and status colors guide user interactions
- **Empty States**: Helpful messages when no tasks exist to improve UX
- **Theme Toggle**: Accessibility consideration for different lighting preferences
- **Minimal Dependencies**: Pure vanilla JavaScript to demonstrate core concepts

## 🔧 Browser Compatibility

- Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)
- HTML5 Drag & Drop API support required
- CSS Grid and Flexbox support required
- Local Storage API for theme persistence


**Built with dedication by Akram Gaber** 🚀

*Feel free to explore, learn from, and provide feedback on this project!*
