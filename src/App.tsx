import { useEffect, useState } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";
import { TaskDetails, ViewTaskDialog } from "./components/ViewTaskDialog";
import { Statuses } from "./components/Statuses";
import { Board, Status, Subtask, Task } from "./crud";
import { boards, getStatusesByBoardId, getSubtasksBySingleTaskId, getSubtasksByTasksId, getTasksByBoardId, updateTaskStatus } from "./db";
import { act } from "react-dom/test-utils";
import { EditTaskDialog, TaskDialog } from "./components/EditTaskDialog";


function App() {

  const emptyTask: Task = {
    id: 0,
    taskTitle: "",
    taskDescription: "",
    boardId: 0,
    statusId: 0
  }



  const [boardsArray, setBoardsArray] = useState<Board[] | null>(boards);
  const [activeBoard, setActiveBoard] = useState<number | null>(boardsArray?.length ? boardsArray[0].id : null);
  const [activeBoardStatusesArray, setActiveBoardStatusesArray] = useState<Status[] | null>(null)
  const [activeBoardTasksArray, setActiveBoardTasksArray] = useState<Task[] | null>(null)
  const [subtasksMap, setSubtasksMap] = useState<Map<number, Subtask[]> | null>(null)
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const [editTaskDialogIsOpen, setEditTaskDialogIsOpen] = useState(false)
  const [clickedTask, setClickedTask] = useState<Task>(emptyTask);
  const [clickedTaskSubtasks, setClickedTaskSubtasks] = useState<Subtask[] | null>(null)
  // const [clickedTask, setClickedTask] = useState<TaskDetails | null>(null);


  // function closeEditBoard() {
  //   setEditBoardIsOpen(false);
  // }

  function openEditBoard(){
    setEditBoardIsOpen(true)
  }

  function addNewTask() {}


  function createNewBoard(){}
 

  function viewTask(task: Task) {
    setClickedTask(task);
    const clickedTaskSubtasksArray = getSubtasksBySingleTaskId(task.id)
    setClickedTaskSubtasks(clickedTaskSubtasksArray)
    setViewTaskIsOpen(true)
  }

  function closeViewTask() {
    setViewTaskIsOpen(false)
  }

  function closeEditTask() {
    setEditTaskDialogIsOpen(false)
  }

  function changeSubtaskStatus() {
    
  }

  function changeStatus() {
    
  }

  function editTask() {
    setEditTaskDialogIsOpen(true)
  }


  useEffect(() => {
    if (activeBoard !== null) {
    const filteredStatuses = getStatusesByBoardId(activeBoard)
    const filteredTasks = getTasksByBoardId(activeBoard)
    const filteredSubtasks = getSubtasksByTasksId(filteredTasks.map((task) => task.id))
    setActiveBoardStatusesArray(filteredStatuses)
    setActiveBoardTasksArray(filteredTasks)
    setSubtasksMap(filteredSubtasks)
  } }, [activeBoard])

  useEffect(() => {
    if (activeBoard !== null) {
    const filteredTasksByIdWithNewStatus = getTasksByBoardId(activeBoard)
    setActiveBoardTasksArray(filteredTasksByIdWithNewStatus)
  }}, [activeBoardTasksArray, activeBoard])



  return (
    <div className="h-full w-full">

      <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        mobile={false}
        createNewBoard={createNewBoard}
      />

    <div className="mt-16">
    <Statuses activeBoardStatusesArray={activeBoardStatusesArray} activeBoardTasksArray={activeBoardTasksArray} subtasksMap={subtasksMap} openEditBoard={openEditBoard} viewTask={viewTask} />
    </div>

     

      {/* <EditBoardDialog
        editBoardIsOpen={editBoardIsOpen}
        closeEditBoard={closeEditBoard}
        boardsArray={boardsArray}
        boardColumnsArray={boardsArray[activeBoard].columns || []}
        activeBoard={activeBoard}
        boardName={boardsArray[activeBoard].boardName}
        saveChanges={saveChanges}
      /> */}

      <ViewTaskDialog
        viewTaskIsOpen={viewTaskIsOpen}
        closeViewTask={closeViewTask}
        clickedTask={clickedTask}
        clickedTaskSubtasks={clickedTaskSubtasks}
        // changeSubtaskStatus={changeSubtaskStatus}
        activeBoardStatusesArray={activeBoardStatusesArray}
        // chosenStatus={chosenStatus}
        // updateTaskStatus={updateTaskStatus}
        editTask={editTask}
      />

        <EditTaskDialog
        editTaskDialogIsOpen={editTaskDialogIsOpen}
        closeEditTask={closeEditTask}
        clickedTask={clickedTask}
        clickedTaskSubtasks={clickedTaskSubtasks}
        activeBoardStatusesArray={activeBoardStatusesArray}
        />


    </div>
  );
}

export default App;


// jak zrobic tak zeby ten scrollbar nie nachodzil na navbara przy scrollowaniu po osi y? (tu bylo robione tak ze navbar fixed a renderowane Columns dostaly margin topa)
// pierwszego taska nie moge przeniesc do innego statusu, kiedy kazdy inny task bez problemu sie przenosi