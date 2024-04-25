### [JSL11] Agile Board - Kanban Task Management App

### Overview

This task management system provides a user-friendly interface for organizing and tracking tasks. Users can add, edit, view details, and delete tasks with ease. The system features include a modal window for task editing, easy navigation between task statuses, and immediate UI updates reflecting changes made to tasks.

### Project Presentation
Link - https://www.loom.com/share/f17548e820314809bf4ee060fd6f0e83?sid=c59fcb82-cff4-48d9-b59d-167b9852385b

### Features

1. **Task Interaction and Detail Management**
   - Users can click on individual tasks to view details and make edits as necessary.
   - Modal windows facilitate task editing, making it easy to input and update task information.

2. **Task Status Updates**
   - Users can update the status of tasks (todo, doing, done) to track their progress effectively.

3. **Immediate UI Updates**
   - Changes made to tasks are immediately reflected on the UI without requiring a page refresh.

4. **Deleting Tasks**
   - Users have the ability to delete tasks directly from the edit modal if they are no longer needed.

5. **Canceling Edits**
   - Users can cancel edits and close the modal without saving to avoid accidental changes.

6. **Easy Navigation**
   - Users can easily move tasks between statuses to reflect their current progress.

7. **Viewing Task Details**
   - Detailed information about tasks is accessible to users, allowing them to understand each task's scope and requirements fully.

### Key Functions

1. **initializeData():**
   - Checks if local storage already has data, if not, loads initial data to localStorage.

2. **fetchAndDisplayBoardsAndTasks():**
   - Fetches tasks from localStorage and displays them grouped by unique board names.
   - Sets the active board based on user interaction and updates UI accordingly.

3. **displayBoards():**
   - Dynamically creates buttons for each unique board and adds event listeners to switch between boards.

4. **filterAndDisplayTasksByBoard():**
   - Filters tasks corresponding to the selected board name and displays them on the UI.

5. **styleActiveBoard():**
   - Styles the active board button by adding an 'active' class to it.

6. **addTaskToUI():**
   - Adds a new task to the UI based on the task's status and column division.

7. **toggleModal():**
   - Toggles the visibility of modals for adding and editing tasks.

8. **toggleSidebar():**
   - Toggles the visibility of the sidebar navigation.

9. **toggleTheme():**
   - Toggles between light and dark themes and updates the UI accordingly.

10. **openEditTaskModal():**
    - Populates the edit task modal with task details and adds event listeners for saving changes and deleting tasks.

11. **saveTaskChanges():**
    - Saves changes made to a task, updates it in localStorage, and refreshes the UI.

### Conclusion

This task management system provides a robust solution for organizing and tracking tasks with a user-friendly interface. By leveraging key functions and features like modals, immediate UI updates, and easy navigation, users can efficiently manage their tasks. Additionally, bug fixes and enhancements have been implemented to ensure smooth functionality and an improved user experience.

