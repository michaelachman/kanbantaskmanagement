import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";
import { Columns } from "./components/Columns";


export type Column = {
  columnName: string,
  tasks?: {
    taskName: string,
    subtasks?: {
      subtaskName: string;
      subtaskContent: string;
    }[]
  }[]
}

export type BoardType = {
  index: number;
  boardName: string;
  columns?: Column[];
};



function App() {
  const boards: BoardType[] = [
    {
      index: 0,
      boardName: "Platform Launch",
      columns: [
        {
          columnName: "TODO",
          tasks: [
            {
              taskName: "firstTask",
              subtasks: [
                {
                  subtaskName: "firstSubtask",
                  subtaskContent: "content of 1st subtask",
                },
              ],
            },
          ],
        },
        {
          columnName: "DOING",
        },{
          columnName: "3"
        }
      ],
    },
    { index: 1, boardName: "Marketing Plan" },
  ];


 

  const [activeBoard, setActiveBoard] = useState(0);
  const [boardsArray, setBoardsArray] = useState(boards);
  // const [boardColumnsArray, setBoardColumnsArray] = useState(boardsArray[activeBoard].columns)
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  


 

  function closeEditBoard() {
    setEditBoardIsOpen(false);
  }

  

  function saveChanges(columnsArray: Column[], boardName: string) {
    setBoardsArray((previousBoardsArrayState) => {
      // return [...previousBoardsArrayState, columnsArray]
    previousBoardsArrayState[activeBoard].boardName = boardName;
    previousBoardsArrayState[activeBoard].columns = columnsArray
    return previousBoardsArrayState
    });
    setEditBoardIsOpen(false)
    console.log(boardsArray)
  }

  function addNewTask() {

  }

  
    // [...previousBoardsArrayState, previousBoardsArrayState[activeBoard].boardName = event.target.value]
  // window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  return (
    <div className="h-full w-full">
      {/* <BoardsNavbar name={name} initialBoards={initialBoards} activeBoard={activeBoard} selectBoard={selectBoard} /> */}
      {/* {windowWidth > 768 ? ( */}
    
    
    <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        mobile={false}
        addNewTask={addNewTask}
      />
      
      {/* ) : ( */}
      {/* <BoardsNavbar
          name={name}
          boardsArray={boardsArray}
          activeBoard={activeBoard}
          selectBoard={selectBoard}
          mobile={true}
          newBoardDialog={newBoardDialog}
        /> */}
      {/* )} */}
      {boardsArray[activeBoard].columns?.length === undefined ? (
        <div className="h-full flex flex-col items-center justify-center pb-32 bg-[#F4F7FD]">
          <p className="text-[#828FA3] font-bold"> This board is empty. Create a new column to get started. </p>
          <button className="bg-[#635FC7] text-white mt-4 p-3 rounded-3xl text-sm" onClick={() => setEditBoardIsOpen(true)}>
            +Add New Column
          </button>
        </div>
      ) : (
        <Columns boardDetails={boardsArray[activeBoard]} />
      )}

      <EditBoardDialog
        editBoardIsOpen={editBoardIsOpen}
        closeEditBoard={closeEditBoard}
        boardsArray={boardsArray}
        boardColumnsArray={boardsArray[activeBoard].columns || []}
        activeBoard={activeBoard}
        boardName={boardsArray[activeBoard].boardName}
        saveChanges={saveChanges}
      />

    </div>
  );
}

export default App;
