import { useState } from "react";
import "./App.css";
import BoardsNavbar from "./components/BoardsNavbar";
import EditBoardDialog from "./components/EditBoardDialog";
import { Columns } from "./components/Columns";
import { TaskDetails, ViewTaskDialog } from "./components/ViewTaskDialog";
import { act } from "react-dom/test-utils";

export type Board = {
  id: number;
  boardName: string;
};

export type Task = {
  id: number;
  taskTitle: string;
  taskDescription: string;
  boardId: number;
  statusId: number;
}

export type Subtask = {
  id: number;
  subtaskDescription: string;
  subtaskStatus: boolean;
  taskId: number;
}

export type Status = {
  id: number;
  statusName: string;
  boardId: number;
}

// export type Column = {
//   columnName: string;
//   tasks?: {
//     taskName: string;
//     taskDescription?: string;
//     subtasks?: {
//       subtaskContent: string;
//       subtaskStatus: boolean;
//     }[];
//   }[];
// };



function App() {

  const boards: Board[] = [{
    id: 0,
    boardName: "Platform Launch"
  },
{
  id: 1,
  boardName: "Marketing Plan"
}]

  const tasks: Task[] = [{
    id: 0,
  taskTitle: "firstTask",
  taskDescription: "firstTaskContentdadsadasdasda",
  boardId: 0,
  statusId: 0
  }, {
    id: 1,
  taskTitle: "222Task",
  taskDescription: "22222TaskContentdadsadasdasda",
  boardId: 0,
  statusId: 0
  },
  {
    id: 2,
  taskTitle: "3rdTask",
  taskDescription: "3rdTaskContentdadsadasdasda",
  boardId: 0,
  statusId: 0
  },
  {
    id: 3,
  taskTitle: "4Task",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 0,
  statusId: 0
  }]

  const subtasks: Subtask[] = [{
    id: 0,
    subtaskDescription: "dsfsdfsadfdsfds",
    subtaskStatus: true,
    taskId: 0
  }, {
    id: 1,
    subtaskDescription: "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDs",
    subtaskStatus: true,
    taskId: 0
  },
  {
    id: 2,
    subtaskDescription: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
    subtaskStatus: false,
    taskId: 0
  },
  {
    id: 3,
    subtaskDescription: "1111111111111111111111",
    subtaskStatus: true,
    taskId: 0
  },
  {
    id: 4,
    subtaskDescription: "d3333333333333333333333333fds",
    subtaskStatus: false,
    taskId: 0
  },
  {
    id: 5,
    subtaskDescription: "dzzzzzzzzzzzzzzzzzzzds",
    subtaskStatus: true,
    taskId: 0
  }]

  const statuses: Status[] = [{
    id: 0,
    statusName: "TODO",
    boardId: 0
  },{
    id: 1,
    statusName: "DOING",
    boardId: 0
  },{
    id: 2,
    statusName: "DONE",
    boardId: 0
  }]


  // const boards: BoardType[] = [
  //   {
  //     index: 0,
  //     boardName: "Platform Launch",
  //     columns: [
  //       {
  //         columnName: "TODO",
  //         tasks: [
  //           {
  //             taskName: "firstTask",
  //             taskDescription: "content of the first task in TODO list",
  //             subtasks: [
  //               {
              
  //                 subtaskContent: "content of 1st subtask",
  //                 subtaskStatus: true,
  //               },
  //               {
                  
  //                 subtaskContent: "content of 2nd subtask",
  //                 subtaskStatus: false,
  //               },
  //               {
                  
  //                 subtaskContent: "content of 3rd subtask",
  //                 subtaskStatus: true,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         columnName: "DOING",
  //         tasks: [
  //           {
  //             taskName: "doingFirst",
  //             taskDescription: "content of task dijofijosdfjioasdfijo",
  //             subtasks: [
  //               {
  //                 subtaskContent: "contentttttttttt",
  //                 subtaskStatus: false,
  //               },
  //             ],
  //           },
  //           {
  //             taskName: "doingSecond",
  //             taskDescription: "content of task dijofijosdfjioasdfijo",
  //           },
  //         ],
  //       },
  //       {
  //         columnName: "THIRDBOARD",
  //       },
  //       {
  //         columnName: "4",
  //         tasks: [
  //           {
  //             taskName: "333",
  //             taskDescription: "content of task dijofijosdfjioasdfijo",
  //           },
  //           {
  //             taskName: "444",
  //             taskDescription: "content of task dijofijosdfjioasdfijo",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   { index: 1, boardName: "Marketing Plan" },
  // ];

  const [activeBoard, setActiveBoard] = useState(0);
  setActiveBoard;
  const [boardsArray, setBoardsArray] = useState(boards);
  const [editBoardIsOpen, setEditBoardIsOpen] = useState(false);
  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState<TaskDetails | null>(null);

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

  function viewTask(
    event: React.MouseEvent<HTMLElement>,
    columnIndex: number,
    taskIndex: number
  ) {
    const clickedTask = boardsArray[activeBoard].columns?.[columnIndex].tasks?.[taskIndex];
    // console.log(clickedTask)
    if (clickedTask) {
      setClickedTask(clickedTask);
    }
    setViewTaskIsOpen(true);
  }

  function closeViewTask() {
    setViewTaskIsOpen(false);
  }

  function changeSubtaskStatus(index: number, columnIndex: number, taskIndex: number) {
    index = 0, columnIndex = 0, taskIndex
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
        ) : (
          <div>
            <Columns
              boardDetails={boardsArray[activeBoard]}
              viewTask={viewTask}
            />
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

      <ViewTaskDialog
        viewTaskIsOpen={viewTaskIsOpen}
        closeViewTask={closeViewTask}
        clickedTask={clickedTask}
        changeSubtaskStatus={changeSubtaskStatus}
      />
    </div>
  );
}

export default App;

// jak zrobic tak zeby ten scrollbar nie nachodzil na navbara przy scrollowaniu po osi y? (tu bylo robione tak ze navbar fixed a renderowane Columns dostaly margin topa)
