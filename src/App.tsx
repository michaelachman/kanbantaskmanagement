import { useEffect, useState } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";
import { TaskDetails, ViewTaskDialog } from "./components/ViewTaskDialog";
import { Statuses } from "./components/Statuses";
import { Board, Status } from "./crud";
import { boards, getStatusesByBoardId } from "./db";


function App() {



  const [boardsArray, setBoardsArray] = useState<Board[] | null>(boards);
  const [activeBoard, setActiveBoard] = useState<number | null>(boardsArray?.length ? boardsArray[0].id : null);
  const [activeBoardStatusesArray, setActiveBoardStatusesArray] = useState<Status[] | null>(null)
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState<TaskDetails | null>(null);


  function closeEditBoard() {
    setEditBoardIsOpen(false);
  }

  function openEditBoard(){
    setEditBoardIsOpen(true)
  }

  function addNewTask() {}

  function createNewBoard(){}
 

  


  useEffect(() => {
    if (activeBoard !== null) {
    const filteredStatuses = getStatusesByBoardId(activeBoard)
    setActiveBoardStatusesArray(filteredStatuses)
  } }, [activeBoard])


  return (
    <div className="h-full w-full">

      <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        mobile={false}
        addNewTask={addNewTask}
        createNewBoard={createNewBoard}
      />

    <div className="mt-16">
    <Statuses activeBoardStatusesArray={activeBoardStatusesArray} openEditBoard={openEditBoard} />
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

      {/* <ViewTaskDialog
        viewTaskIsOpen={viewTaskIsOpen}
        closeViewTask={closeViewTask}
        clickedTask={clickedTask}
        changeSubtaskStatus={changeSubtaskStatus}
      /> */}
    </div>
  );
}

export default App;


// jak zrobic tak zeby ten scrollbar nie nachodzil na navbara przy scrollowaniu po osi y? (tu bylo robione tak ze navbar fixed a renderowane Columns dostaly margin topa)
