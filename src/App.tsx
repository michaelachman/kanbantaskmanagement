import { useEffect, useState } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog, { BoardForm } from "./components/EditBoardDialog";
import { ViewTaskDialog } from "./components/ViewTaskDialog";
import { Statuses } from "./components/Statuses";
import { Board, Status, Subtask, Task } from "./crud";
import {
  boards,
  changeTaskStatusWithBoardAndTaskId,
  createNewBoardWithLocalForm,
  createNewColumnWithBoardId,
  editBoardWithLocalFormAndBoardId,
  getStatusesByBoardId,
  getSubtasksBySingleTaskId,
  getSubtasksByTasksId,
  getTasksByBoardId,
} from "./db";
import { EditTaskDialog } from "./components/EditTaskDialog";
import { AddNewTaskDialog } from "./components/AddNewTaskDialog";
import { NewBoardDialog } from "./components/NewBoardDialog";
import { DeleteTaskDialog } from "./components/DeleteTaskDialog";
import { root } from "postcss";

function App() {

  const emptyTask: Task = {
    id: 1,
    taskTitle: "",
    taskDescription: "",
    boardId: 1,
    statusId: 1,
  };

  const [boardsArray, setBoardsArray] = useState<Board[] | null>(boards);
  const [activeBoard, setActiveBoard] = useState<number | null>(
    boardsArray?.length ? boardsArray[0].id : null
  );
  const [activeBoardStatusesArray, setActiveBoardStatusesArray] = useState<
    Status[]
  >([]);
  const [activeBoardTasksArray, setActiveBoardTasksArray] = useState<
    Task[] | null
  >(null);
  const [subtasksMap, setSubtasksMap] = useState<Map<number, Subtask[]> | null>(
    null
  );
  const [newBoardDialogIsOpen, setNewBoardDialogIsOpen] = useState(false);
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const [editTaskDialogIsOpen, setEditTaskDialogIsOpen] = useState(false);
  const [newTaskDialogIsOpen, setNewTaskDialogIsOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState<Task>(emptyTask);
  const [clickedTaskSubtasks, setClickedTaskSubtasks] = useState<
    Subtask[] | null
  >(null);
  const [deleteTaskDialogIsOpen, setDeleteTaskDialogIsOpen] = useState(false);
  const [addNewColumnIsOpen, setAddNewColumnIsOpen] = useState(false);
  const [darkTheme, setdarkTheme] = useState(false);
  const [sstatusDependency, setStatusDependency] = useState(true);
  const [dropdownSidebar, setDropdownSidebar] = useState(false);

  function changeBoard(boardId: number) {
    setActiveBoard(boardId);
  }

  function openEditBoard() {
    setEditBoardIsOpen(true);
  }

  function closeEditBoard() {
    setEditBoardIsOpen(false);
  }

  function openNewTaskDialog() {
    setNewTaskDialogIsOpen(true);
  }

  function closeNewTask() {
    setNewTaskDialogIsOpen(false);
  }

  function openCreateNewBoardDialog() {
    setNewBoardDialogIsOpen(true);
  }

  function closeNewBoardDialog() {
    setNewBoardDialogIsOpen(false);
  }

  function createNewBoard(localNewBoardForm: BoardForm) {
    createNewBoardWithLocalForm(localNewBoardForm);
    setNewBoardDialogIsOpen(false);
  }

  function viewTask(task: Task) {
    setClickedTask(task);
    const clickedTaskSubtasksArray = getSubtasksBySingleTaskId(task.id);
    setClickedTaskSubtasks(clickedTaskSubtasksArray);
    setViewTaskIsOpen(true);
  }

  function closeViewTask() {
    setViewTaskIsOpen(false);
  }

  function closeEditTask() {
    setEditTaskDialogIsOpen(false);
  }

  function editTask() {
    setEditTaskDialogIsOpen(true);
  }

  function deleteTaskButton() {
    setDeleteTaskDialogIsOpen(true);
  }

  function closeDeleteTaskDialog() {
    setDeleteTaskDialogIsOpen(false);
  }

  function statusDependency() {
    setStatusDependency(!sstatusDependency);
  }

  function taskStatusChange(
    clickedTaskId: number,
    newStatusId: number,
    boardId: number
  ) {
    if (activeBoard !== null) {
      changeTaskStatusWithBoardAndTaskId(clickedTaskId, newStatusId, boardId);
      const filteredTasks = getTasksByBoardId(activeBoard);
      setActiveBoardTasksArray(filteredTasks);
    }
  }

  function saveEditBoardChanges(
    localNewBoardForm: BoardForm,
    activeBoard: number
  ) {
    editBoardWithLocalFormAndBoardId(localNewBoardForm, activeBoard);
    if (activeBoard !== null) {
      const filteredStatuses = getStatusesByBoardId(activeBoard);
      const filteredTasks = getTasksByBoardId(activeBoard);
      const filteredSubtasks = getSubtasksByTasksId(
        filteredTasks.map((task) => task.id)
      );
      setActiveBoardStatusesArray(filteredStatuses);
      setActiveBoardTasksArray(filteredTasks);
      setSubtasksMap(filteredSubtasks);
    }
    setEditBoardIsOpen(false);
  }

  function createColumn(localColumnName: string, activeBoard: number) {
    createNewColumnWithBoardId(localColumnName, activeBoard);

    setAddNewColumnIsOpen(false);
  }

  function closeAddNewColumn() {
    setAddNewColumnIsOpen(false);
  }

  function openAddNewColumn() {
    setAddNewColumnIsOpen(true);
  }

  function changeTheme() {
    setdarkTheme(!darkTheme);
    if (document.getElementById("html")?.classList.contains("dark")) {
      document.getElementById("html")?.classList.remove("dark")
    } else document.getElementById("html")?.classList.add("dark")
  }

  function dropdownSidebarToggle() {
    setDropdownSidebar((previousState) => !previousState);
  }

  useEffect(() => {
    if (activeBoard !== null) {
      const filteredStatuses = getStatusesByBoardId(activeBoard);
      const filteredTasks = getTasksByBoardId(activeBoard);
      const filteredSubtasks = getSubtasksByTasksId(
        filteredTasks.map((task) => task.id)
      );
      setActiveBoardStatusesArray(filteredStatuses);
      setActiveBoardTasksArray(filteredTasks);
      setSubtasksMap(filteredSubtasks);
    }
  }, [activeBoard]);

  useEffect(() => {
    if (activeBoard !== null) {
      const filteredTasksByIdWithNewStatus = getTasksByBoardId(activeBoard);
      setActiveBoardTasksArray(filteredTasksByIdWithNewStatus);
    }
  }, [activeBoard, sstatusDependency]);

  useEffect(() => {
    if (activeBoard !== null) {
      const filteredStatuses = getStatusesByBoardId(activeBoard);
      const filteredTasks = getTasksByBoardId(activeBoard);
      const filteredSubtasks = getSubtasksByTasksId(
        filteredTasks.map((task) => task.id)
      );
      setActiveBoardStatusesArray(filteredStatuses);
      setActiveBoardTasksArray(filteredTasks);
      setSubtasksMap(filteredSubtasks);
      setBoardsArray(boards);
    }
  }, [
    editTaskDialogIsOpen,
    addNewColumnIsOpen,
    newBoardDialogIsOpen,
    editBoardIsOpen,
    newTaskDialogIsOpen,
    deleteTaskDialogIsOpen,
    activeBoard,
  ]);

  return (
    <div className="w-[100%] h-full">
      <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        mobile={false}
        changeBoard={changeBoard}
        openNewTaskDialog={openNewTaskDialog}
        activeBoardStatusesArray={activeBoardStatusesArray}
        openCreateNewBoardDialog={openCreateNewBoardDialog}
        openEditBoard={openEditBoard}
        darkTheme={darkTheme}
        changeTheme={changeTheme}
        dropdownSidebar={dropdownSidebar}
        dropdownSidebarToggle={dropdownSidebarToggle}
      />

      <div className="pt-16 h-full">
        <Statuses
          activeBoardStatusesArray={activeBoardStatusesArray}
          activeBoardTasksArray={activeBoardTasksArray}
          subtasksMap={subtasksMap}
          openEditBoard={openEditBoard}
          viewTask={viewTask}
          activeBoard={activeBoard}
          openAddNewColumn={openAddNewColumn}
          closeAddNewColumn={closeAddNewColumn}
          addNewColumnIsOpen={addNewColumnIsOpen}
          createColumn={createColumn}
          dropdownSidebar={dropdownSidebar}
        />
      </div>

      {boardsArray && activeBoard && (
        <EditBoardDialog
          boardsArray={boardsArray}
          activeBoard={activeBoard}
          editBoardIsOpen={editBoardIsOpen}
          closeEditBoard={closeEditBoard}
          activeBoardStatusesArray={activeBoardStatusesArray}
          saveEditBoardChanges={saveEditBoardChanges}
        />
      )}

      <NewBoardDialog
        newBoardDialogIsOpen={newBoardDialogIsOpen}
        closeNewBoardDialog={closeNewBoardDialog}
        createNewBoard={createNewBoard}
      />

      <ViewTaskDialog
        activeBoard={activeBoard}
        viewTaskIsOpen={viewTaskIsOpen}
        closeViewTask={closeViewTask}
        clickedTask={clickedTask}
        clickedTaskSubtasks={clickedTaskSubtasks}
        activeBoardStatusesArray={activeBoardStatusesArray}
        editTask={editTask}
        taskStatusChange={taskStatusChange}
        statusDependency={statusDependency}
      />

      <EditTaskDialog
        editTaskDialogIsOpen={editTaskDialogIsOpen}
        closeEditTask={closeEditTask}
        clickedTask={clickedTask}
        clickedTaskSubtasks={clickedTaskSubtasks}
        activeBoardStatusesArray={activeBoardStatusesArray}
        deleteTaskButton={deleteTaskButton}
      />

      <DeleteTaskDialog
        deleteTaskDialogIsOpen={deleteTaskDialogIsOpen}
        closeDeleteTaskDialog={closeDeleteTaskDialog}
        clickedTask={clickedTask}
      />

      <AddNewTaskDialog
        activeBoard={activeBoard}
        newTaskDialogIsOpen={newTaskDialogIsOpen}
        closeNewTask={closeNewTask}
        activeBoardStatusesArray={activeBoardStatusesArray}
      />

      <div className="max-sm:hidden md:fixed md:left-0 md:bottom-8">
        {dropdownSidebar ? (
          <div onClick={() => dropdownSidebarToggle()} className="flex justify-start h-11 w-[100%] cursor-pointer">
          <img className="object-scale-down w-10 pl-5 self-center" src="./assets/icon-hide-sidebar.svg"></img>
          <p className="text-gray-500 text-xs font-bold self-center pl-2">Hide Sidebar</p>
        </div>
        ) : (
          <div onClick={() => dropdownSidebarToggle()} className="flex justify-center h-11 w-12 bg-[#635FC7] hover:bg-[#A8A4FF] rounded-r-3xl cursor-pointer">
            <img className="object-scale-down pr-2" src="./assets/icon-show-sidebar.svg"></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// rozciagajacy sie input w add new tasku jak content przekracza juz miejsce

// dziwnie chodzi to scrollowanie horyzontalne 

// zrobic required inputy

// poprawki kosmetyczne w desktopowej wersji tego co sie z dropdownem dzieje (biale bordery po prawej)

// sprawdzic jak sie sprawy maja jak nie ma boardow zadnych zeby ostylowac tez ten wariant