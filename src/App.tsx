import { useState, useEffect } from "react";
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

  function addNewColumn() {
    setBoardsArray((prevV) => {
      boardsArray[activeBoard].columns?.push({ ...prevV, columnName: "" });
      console.log(boardsArray)
      return boardsArray;
      
    });
  }

  // window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  return (
    <div className="h-full w-full">
      {/* <BoardsNavbar name={name} initialBoards={initialBoards} activeBoard={activeBoard} selectBoard={selectBoard} /> */}
      {/* {windowWidth > 768 ? ( */}
    
    <BoardsNavbar
        boardsArray={boardsArray}
        activeBoard={activeBoard}
        selectBoard={selectBoard}
        mobile={false}
      
        // newBoardDialog={newBoardDialog}
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
        activeBoard={activeBoard}
        addNewColumn={addNewColumn}
      />

      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog> */}
    </div>
  );
}

export default App;

// 1. jak kurwa mac ustawic obok siebie te trzy kropki z przyciskiem z plusem w boardsnavbarze
// 2. czy to ze dalem w tym warunku ze length column jest undefined jest dobrze? bo tylko tak to chcialo zadzialac
