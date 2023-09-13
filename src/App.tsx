import { useState } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";
import { Columns } from "./components/Columns";
import { TaskDetails, ViewTaskDialog } from "./components/ViewTaskDialog";

export type Column = {
  columnName: string;
  tasks?: {
    taskName: string;
    subtasks?: {
      subtaskName: string;
      subtaskContent: string;
      subtaskStatus: boolean;
    }[];
  }[];
};

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
                  subtaskStatus: true,
                },{
                  subtaskName: "2ndSubtask",
                  subtaskContent: "content of 2nd subtask",
                  subtaskStatus: false,
                }, {
                  subtaskName: "3rdSubtask",
                  subtaskContent: "content of 3rd subtask",
                  subtaskStatus: true,
                }
              ],
            },
          ],
        },
        {
          columnName: "DOING",
          tasks: [
            {
              taskName: "doingFirst",
              subtasks: [
                {
                  subtaskName: "firstSubtask",
                  subtaskContent: "contentttttttttt",
                  subtaskStatus: false
                }
              ]
            }, {
              taskName: "doingSecond"
            }
          ]
        },
        {
          columnName: "THIRDBOARD",
        },
        {
          columnName: "4",
          tasks: [{ taskName: "333" }, { taskName: "444" }],
        },
      ],
    },
    { index: 1, boardName: "Marketing Plan" },
  ];

  const [activeBoard, setActiveBoard] = useState(0);
  setActiveBoard;
  const [boardsArray, setBoardsArray] = useState(boards);
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState<TaskDetails | null>(null)

  function closeEditBoard() {
    setEditBoardIsOpen(false);
  }

 

  function saveChanges(columnsArray: Column[], boardName: string) {
    setBoardsArray((previousBoardsArrayState) => {
      // return [...previousBoardsArrayState, columnsArray]
      previousBoardsArrayState[activeBoard].boardName = boardName;
      previousBoardsArrayState[activeBoard].columns = columnsArray;
      return previousBoardsArrayState;
    });
    setEditBoardIsOpen(false);
    console.log(boardsArray);
  }

  function addNewTask() {}

  function viewTask(event: React.MouseEvent<HTMLElement>, columnIndex: number, taskIndex: number) {
  const clickedTask = boardsArray[activeBoard].columns?.[columnIndex].tasks?.[taskIndex]
  // console.log(clickedTask)
  if (clickedTask) {
    setClickedTask(clickedTask)
  }
  setViewTaskIsOpen(true)
  }

  function closeViewTask() {
    setViewTaskIsOpen(false)
  }

  return (
    <div className="h-full w-full">
      
        <BoardsNavbar
          boardsArray={boardsArray}
          activeBoard={activeBoard}
          mobile={false}
          addNewTask={addNewTask}
        />

      <div className="mt-16">
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
        ) : (<div>
          <Columns boardDetails={boardsArray[activeBoard]} viewTask={viewTask} />
          </div>
        )}
      </div>

      <EditBoardDialog
        editBoardIsOpen={editBoardIsOpen}
        closeEditBoard={closeEditBoard}
        boardsArray={boardsArray}
        boardColumnsArray={boardsArray[activeBoard].columns || []}
        activeBoard={activeBoard}
        boardName={boardsArray[activeBoard].boardName}
        saveChanges={saveChanges}
      />

      <ViewTaskDialog viewTaskIsOpen={viewTaskIsOpen} closeViewTask={closeViewTask} clickedTask={clickedTask}/>

    </div>
  );
}

export default App;


// jak zrobic tak zeby ten scrollbar nie nachodzil na navbara przy scrollowaniu po osi y? (tu bylo robione tak ze navbar fixed a renderowane Columns dostaly margin topa)