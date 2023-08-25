import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";

export type BoardType = {
  index: number;
  boardName: string;
  columns?: {
    columnName: string;
    tasks?: {
      taskName: string;
      subtasks: {
        subtaskName: string;
        subtaskContent: string;
      }[];
    }[];
  }[];
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
        },
      ],
    },
    { index: 1, boardName: "Marketing Plan" },
  ];

  const [activeBoard, setActiveBoard] = useState(0);
  const [boardsArray, setBoardsArray] = useState(boards);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(true);


  function selectBoard() {}

  function closeEditBoard() {
    setEditBoardIsOpen(false);
  }

  function saveChanges(localBoardsArray: BoardType[]) {
    setBoardsArray(localBoardsArray)
    setEditBoardIsOpen(false)
  }

  // function addNewColumn() {
  //   setBoardsArray((prevV) => {
  //     boardsArray[activeBoard].columns?.push({ ...prevV, columnName: "" });
  //     console.log(boardsArray)
  //     return boardsArray;
      
  //   });
  // }

  function addNewColumn() {
    setBoardsArray((previousBoardsArray) => {
      previousBoardsArray[activeBoard].columns?.push({columnName: "New Column"})
      console.log(previousBoardsArray)
      return previousBoardsArray
    })
  }

  // useEffect(() => console.log(boardsArray), [boardsArray])

  function handleBoardNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setBoardsArray((previousBoardsArrayState) => {
      previousBoardsArrayState[activeBoard].boardName = event.target.value
      return boardsArray
    })
  }
    // [...previousBoardsArrayState, previousBoardsArrayState[activeBoard].boardName = event.target.value]
  // window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  return (
    <div className="h-full w-full">
      {/* <BoardsNavbar name={name} initialBoards={initialBoards} activeBoard={activeBoard} selectBoard={selectBoard} /> */}
      {/* {windowWidth > 768 ? ( */}
    
    <div>
    <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        selectBoard={selectBoard}
        mobile={false}
      />
      </div>
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
        <div className="h-10 bg-green-500">
          <p> This board is empty. Create a new column to get started. </p>
          <button onClick={() => setEditBoardIsOpen(true)}>
            Add New Column
          </button>
        </div>
      ) : (
        <div className="h-10 bg-red-500"></div>
      )}

      <EditBoardDialog
        editBoardIsOpen={editBoardIsOpen}
        closeEditBoard={closeEditBoard}
        boardsArray={boardsArray}
        boardColumnsArray={boardsArray[activeBoard].columns}
        activeBoard={activeBoard}
        addNewColumn={addNewColumn}
        handleBoardNameInput={handleBoardNameInput}
        saveChanges={saveChanges}
      />

    </div>
  );
}

export default App;
