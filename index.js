// TASK: import helper functions from utils
import { getTasks, createNewTask, putTask, deleteTask } from './utils/taskFunctions.js';
// TASK: import initialData
import { initialData } from "./initialData.js";

/*************************************************************************************************************************************************
 * FIX BUGS!!!
 * **********************************************************************************************************************************************/

// Function checks if local storage already has data, if not it loads initialData to localStorage
function initializeData() {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(initialData)); 
    localStorage.setItem('showSideBar', 'true')
  } else {
    console.log('Data already exists in localStorage');
  }
}

// TASK: Get elements from the DOM
const elements = {
// Navigation Sidebar
sideBar: document.getElementById('side-bar-div'),
logo: document.getElementById('logo'),
boardsNavLinksDiv: document.getElementById('boards-nav-links-div'),
headlineSidepanel: document.getElementById('headline-sidepanel'),
hideSideBarBtn: document.getElementById('hide-side-bar-btn'),
showSideBarBtn: document.getElementById('show-side-bar-btn'),
themeSwitchDiv: document.getElementsByClassName('toggle-div')[0],
themeSwitch: document.getElementById('switch'),
iconDark: document.getElementById('icon-dark'),
iconLight: document.getElementById('icon-light'),

// Main Layout
layout: document.getElementById('layout'),
header: document.getElementById('header'),
headerBoardName: document.getElementById('header-board-name'),
dropDownBtn: document.getElementById('dropdownBtn'),
dropDownIcon: document.getElementById('dropDownIcon'),
addNewTaskBtn: document.getElementById('add-new-task-btn'),
editBoardBtn: document.getElementById('edit-board-btn'),
editBoardDiv: document.getElementById('editBoardDiv'),
container: document.querySelector('.container'), // Using querySelector for class

// Task Columns
columnMainDiv: document.querySelector('.card-column-main'),
columnDivs: document.querySelectorAll('.column-div'),
todoColumn: document.querySelector('.column-div[data-status="todo"]'), // Using data attribute selector
todoHeadDiv: document.getElementById('todo-head-div'),
todoText: document.getElementById('toDoText'),
todoTasksContainer: document.querySelector('.column-div[data-status="todo"] .tasks-container'), // Combining selectors
doingColumn: document.querySelector('.column-div[data-status="doing"]'),
doingHeadDiv: document.getElementById('doing-head-div'),
doingText: document.getElementById('doingText'),
doingTasksContainer: document.querySelector('.column-div[data-status="doing"] .tasks-container'),
doneColumn: document.querySelector('.column-div[data-status="done"]'),
doneHeadDiv: document.getElementById('done-head-div'),
doneText: document.getElementById('doneText'),
doneTasksContainer: document.querySelector('.column-div[data-status="done"] .tasks-container'),

// New Task Modal
modalWindow: document.getElementById('new-task-modal-window'),
titleInput: document.getElementById('title-input'),
descInput: document.getElementById('desc-input'),
selectStatus: document.getElementById('select-status'),
cancelAddTaskBtn: document.getElementById('cancel-add-task-btn'),

// Edit Task Modal
editTaskModal: document.querySelector('.edit-task-modal-window'),
editTaskForm: document.getElementById('edit-task-form'),
editTaskTitleInput: document.getElementById('edit-task-title-input'),
editTaskDescInput: document.getElementById('edit-task-desc-input'),
editSelectStatus: document.getElementById('edit-select-status'),

// Additional elements (if needed or delete it)
filterDiv: document.getElementById('filterDiv') // Assuming I will add an element for filtering

}

let activeBoard = ""

// Extracts unique board names from tasks
// TASK: FIX BUGS
function fetchAndDisplayBoardsAndTasks() {
  const tasks = getTasks();
  const boards = [...new Set(tasks.map(task => task.board).filter(Boolean))];
  displayBoards(boards);
  if (boards.length > 0) {
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"))
    activeBoard = localStorageBoard ? localStorageBoard :  boards[0]; // Changed the semi-colon to colons to fix syntax error
    elements.headerBoardName.textContent = activeBoard
    styleActiveBoard(activeBoard)
    refreshTasksUI();
  }
}

// Creates different boards in the DOM
// TASK: Fix Bugs
function displayBoards(boards) {
  const boardsContainer = document.getElementById("boards-nav-links-div");
  boardsContainer.innerHTML = ''; // Clears the container
  boards.forEach(board => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    boardElement.addEventListener('click', () => { // Added an anonymous function here and wrapped the event handler code with the function 
      /* Instead of assigning the click event handler 
    inside the forEach loop, you are immediately invoking the function. */
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board //assigns active board
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard))
      styleActiveBoard(activeBoard)
    });
    boardsContainer.appendChild(boardElement);
  });
}
  

// Filters tasks corresponding to the board name and displays them on the DOM.
// TASK: Fix Bugs
function filterAndDisplayTasksByBoard(boardName) {
  const tasks = getTasks(); // Fetch tasks from a simulated local storage function
  const filteredTasks = tasks.filter(task => task.board === boardName); // replaced the assignment operator with the equality operator

  // Ensure the column titles are set outside of this function or correctly initialized before this function runs

  elements.columnDivs.forEach(column => {
    const status = column.getAttribute("data-status");
    // Reset column content while preserving the column title
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${status.toUpperCase()}</h4>
                        </div>`;

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add('tasks-container');
    column.appendChild(tasksContainer);

    filteredTasks.filter(task => task.status === status).forEach(task => { /* replace the assignment operator with the equality operator to avoid
      the filter function to always return true */ 
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-div");
      taskElement.textContent = task.title;
      taskElement.setAttribute('data-task-id', task.id);

      // Listen for a click event on each task and open a modal
      taskElement.addEventListener('click', () => { // Added an Event listener and corrected the arrow function syntax
        openEditTaskModal(task);
      });

      tasksContainer.appendChild(taskElement);
    });
  });
}


function refreshTasksUI() {
  filterAndDisplayTasksByBoard(activeBoard);
  showTasksProgress();
}

// Styles the active board by adding an active class
// TASK: Fix Bugs
function styleActiveBoard(boardName) {
  [...document.querySelectorAll('.board-btn')].map((btn) => {
    btn.classList.toggle('active', btn.textContent === boardName);
  });
  showTasksProgress()
}


function addTaskToUI(task) {
  const column = document.querySelector(`.column-div[data-status="${task.status}"]`); 
  if (!column) {
    console.error(`Column not found for status: ${task.status}`);
    return;
  }

  let tasksContainer = column.querySelector('.tasks-container');
  if (!tasksContainer) {
    console.warn(`Tasks container not found for status: ${task.status}, creating one.`);
    tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasks-container');
    column.appendChild(tasksContainer);
  }

  const taskElement = document.createElement('div');
  taskElement.className = 'task-div';
  taskElement.textContent = task.title; // Modify as needed
  taskElement.setAttribute('data-task-id', task.id);
  
  tasksContainer.appendChild(); 
}



function setupEventListeners() {
  // Cancel editing task event listener
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  cancelEditBtn.addEventListener('click', () => toggleModal(false, elements.editTaskModal));

  // Cancel adding new task event listener
  const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
  cancelAddTaskBtn.addEventListener('click', () => {
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Clicking outside the modal to close it
  elements.filterDiv.addEventListener('click', () => {
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Show sidebar event listener
  elements.hideSideBarBtn.addEventListener('click', () => toggleSidebar(false));
  elements.showSideBarBtn.addEventListener('click', () => toggleSidebar(true));

  // Theme switch event listener
  elements.themeSwitch.addEventListener('change', toggleTheme);

  // Show Add New Task Modal event listener
  elements.createNewTaskBtn.addEventListener('click', () => {
    toggleModal(true);
    elements.filterDiv.style.display = 'block'; // Also show the filter overlay
  });

  // Add new task form submission event listener
  elements.modalWindow.addEventListener('submit',  (event) => {
    addTask(event)
  });
}

// Toggles tasks modal
// Task: Fix bugs
function toggleModal(show, modal = elements.modalWindow) {
  modal.style.display = show ? 'block' : 'none';  // changed used the conditional ternary operator to separate the two possible values of 'modal.style.display'.
}

/*************************************************************************************************************************************************
 * COMPLETE FUNCTION CODE
 * **********************************************************************************************************************************************/

function addTask(event) {
  event.preventDefault(); 

  //Assign user input to the task object
    const task = {
      
    };
    const newTask = createNewTask(task);
    if (newTask) {
      addTaskToUI(newTask);
      toggleModal(false);
      elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
      event.target.reset();
      refreshTasksUI();
    }
}


function toggleSidebar(show) {
 
}

function toggleTheme() {
 
}



function openEditTaskModal(task) {
  // Set task details in modal inputs
  elements.editTaskTitleInput.value = task.title;
  elements.editTaskDescInput.value = task.description;
  elements.editSelectStatus.value = task.status;

  // Get button elements from the task modal
  const saveTaskChangesBtn = document.getElementById('save-task-changes-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const deleteTaskBtn = document.getElementById('delete-task-btn');

  // Call saveTaskChanges upon click of Save Changes button
  saveTaskChangesBtn.addEventListener('click', () => {
    saveTaskChanges(task);
    toggleModal(false, elements.editTaskModal);
  });

  // Delete task using a helper function and close the task modal
  deleteTaskBtn.addEventListener('click', () => toDeleteTask(task.id));
  
  toggleModal(true, elements.editTaskModal); // Show the edit task modal
}

function saveTaskChanges(taskId) {
  // Get new user inputs
  

  // Create an object with the updated task details


  // Update task using a hlper functoin
 

  // Close the modal and refresh the UI to reflect the changes

  refreshTasksUI();
}

/*************************************************************************************************************************************************/

document.addEventListener('DOMContentLoaded', function() {
  init(); // init is called after the DOM is fully loaded
});

function init() {
  setupEventListeners();
  const showSidebar = localStorage.getItem('showSideBar') === 'true';
  toggleSidebar(showSidebar);
  const isLightTheme = localStorage.getItem('light-theme') === 'enabled';
  document.body.classList.toggle('light-theme', isLightTheme);
  fetchAndDisplayBoardsAndTasks(); // Initial display of boards and tasks
}