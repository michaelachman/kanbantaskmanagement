import { useState } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";
import { TaskDetails, ViewTaskDialog } from "./components/ViewTaskDialog";
import { Statuses } from "./components/Statuses";
import { Board } from "./crud";
import { boards, statuses } from "./db";


function App() {



  const [boardsArray, setBoardsArray] = useState<Board[] | null>(boards);
  const [activeBoard, setActiveBoard] = useState<number | null>(boardsArray?.length ? boardsArray[0].id : null);
  const [statusesArray, setStatusesArray] = useState(statuses)
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState<TaskDetails | null>(null);

  function closeEditBoard() {
    setEditBoardIsOpen(false);
  }

  

  function addNewTask() {}

  function createNewBoard(){}

  
  

  const filteredStatuses = statusesArray.filter((status) => status.boardId === activeBoard)    



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
    

    <Statuses filteredStatuses={filteredStatuses}/>
    </div>

      {/* <div className="mt-16">
        {boardsArray[activeBoard?]}
        {boardsArray?.id !== undefined ? statusesArray[activeBoard?.id].}
        
        {boardsArray[activeBoard].columns?.length === undefined ? (
          <div className="h-full mt-5 flex flex-col items-center justify-center pb-32 bg-[#F4F7FD]">
            <p className="text-[#828FA3] font-bold">
              {" "}
              This board is empty. Create a new column to get started.{" "}
            </p>
            <button
              className="bg-[#635FC7] text-white mt-4 p-3 rounded-3xl text-sm"
              onClick={() => setEditBoardIsOpen(true)}
            >
              +Add New Column
            </button>
          </div>
        ) 
        : (
          <div>
            <Columns
              boardDetails={boardsArray[activeBoard]}
              viewTask={viewTask}
            />
          </div>
        )}
      </div> */}

      {/* <EditBoardDialog
        editBoardIsOpen={editBoardIsOpen}
        closeEditBoard={closeEditBoard}
        boardsArray={boardsArray}
        boardColumnsArray={boardsArray[activeBoard].columns || []}
        activeBoard={activeBoard}
        boardName={boardsArray[activeBoard].boardName}
        saveChanges={saveChanges}
      />

      <ViewTaskDialog
        viewTaskIsOpen={viewTaskIsOpen}
        closeViewTask={closeViewTask}
        clickedTask={clickedTask}
        changeSubtaskStatus={changeSubtaskStatus}
      /> */}
    </div>
  );
}

export default App;


// jak to zaczac robic zakladajac ze board to tez jest cos opcjonalnego bo nie istnieje od samego poczaktu jak user zaczyna z apki korzystac
// jak polaczyc to ze status jest przypisany do danego boarda

// jak zrobic tak zeby ten scrollbar nie nachodzil na navbara przy scrollowaniu po osi y? (tu bylo robione tak ze navbar fixed a renderowane Columns dostaly margin topa)
