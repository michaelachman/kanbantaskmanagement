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
  editBoardWithLocalFormAndBoardId,
  getStatusesByBoardId,
  getSubtasksBySingleTaskId,
  getSubtasksByTasksId,
  getTasksByBoardId,
  updateTaskStatus,
} from "./db";
import { EditTaskDialog } from "./components/EditTaskDialog";
import { AddNewTaskDialog } from "./components/AddNewTaskDialog";
import { NewBoardDialog } from "./components/NewBoardDialog";
import { DeleteTaskDialog } from "./components/DeleteTaskDialog";

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
  const [activeBoardStatusesArray, setActiveBoardStatusesArray] = useState<Status[]>([]);
  const [activeBoardTasksArray, setActiveBoardTasksArray] = useState<Task[] | null >(null);
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

  function saveEditBoardChanges(localNewBoardForm: BoardForm, activeBoard: number) {
    editBoardWithLocalFormAndBoardId(localNewBoardForm, activeBoard);
    setEditBoardIsOpen(false);
  }

  function createColumn(localColumnName: string, activeBoard: number) {
    // tu wyslac do db activeBoard i nowy columnname
    setAddNewColumnIsOpen(false);
  }

  function closeAddNewColumn() {
    setAddNewColumnIsOpen(false);
  }

  function openAddNewColumn() {
    setAddNewColumnIsOpen(true);
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
  }, [activeBoard]);

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
  }, [editTaskDialogIsOpen, editBoardIsOpen, activeBoard]);

  return (
    <div className="h-full w-full">
      <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        mobile={false}
        changeBoard={changeBoard}
        openNewTaskDialog={openNewTaskDialog}
        activeBoardStatusesArray={activeBoardStatusesArray}
        openCreateNewBoardDialog={openCreateNewBoardDialog}
        openEditBoard={openEditBoard}
      />

      <div className="mt-16">
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
        />
      </div>

      {boardsArray && activeBoard && (
        <EditBoardDialog
        activeBoard={activeBoard}
          editBoardIsOpen={editBoardIsOpen}
          closeEditBoard={closeEditBoard}
          activeBoardStatusesArray={activeBoardStatusesArray}
          boardName={boardsArray[activeBoard - 1].boardName}
          saveEditBoardChanges={saveEditBoardChanges}
        />
      )}

      <NewBoardDialog
        newBoardDialogIsOpen={newBoardDialogIsOpen}
        closeNewBoardDialog={closeNewBoardDialog}
      />

      <ViewTaskDialog
        activeBoard={activeBoard}
        viewTaskIsOpen={viewTaskIsOpen}
        closeViewTask={closeViewTask}
        clickedTask={clickedTask}
        clickedTaskSubtasks={clickedTaskSubtasks}
        // changeSubtaskStatus={changeSubtaskStatus}
        activeBoardStatusesArray={activeBoardStatusesArray}
        // chosenStatus={chosenStatus}
        // updateTaskStatus={updateTaskStatus}
        editTask={editTask}
        taskStatusChange={taskStatusChange}
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
      />

      <AddNewTaskDialog
        newTaskDialogIsOpen={newTaskDialogIsOpen}
        closeNewTask={closeNewTask}
        activeBoardStatusesArray={activeBoardStatusesArray}
      />
    </div>
  );
}

export default App;

// jak zrobic tak zeby ten scrollbar nie nachodzil na navbara przy scrollowaniu po osi y? (tu bylo robione tak ze navbar fixed a renderowane Columns dostaly margin topa)

// strzalka do gory w navbarze jak jest otwarty boardselect bo nie ma teraz atrybutu open w menu jak byl w dialogu

// zmienianie statusow taska naprzemiennie w view i edit tasku dziala dzwiwnie
