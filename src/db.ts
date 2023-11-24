import { AddTaskForm } from "./components/AddNewTaskDialog";
import { BoardForm } from "./components/EditBoardDialog";
import { EditTaskForm } from "./components/EditTaskDialog";
import { Board, Status, Subtask, Task } from "./crud";

export const boards: Board[] = [
  {
    id: 1,
    boardName: "Platform Launch",
  },
  {
    id: 2,
    boardName: "Marketing Plan",
  },
];

export let tasks: Task[] = [
  {
    id: 1,
    taskTitle: "firstTask",
    taskDescription: "firstTaskContentdadsadasdasda",
    boardId: 1,
    statusId: 1,
  },
  {
    id: 2,
    taskTitle: "222Task",
    taskDescription: "22222TaskContentdadsadasdasda",
    boardId: 1,
    statusId: 1,
  },
  {
    id: 3,
    taskTitle: "3rdTask",
    taskDescription: "3rdTaskContentdadsadasdasda",
    boardId: 1,
    statusId: 1,
  },
  {
    id: 4,
    taskTitle: "lasttodotask",
    taskDescription: "4TaskContentdadsadasdasda",
    boardId: 1,
    statusId: 1,
  },
  {
    id: 5,
    taskTitle: "firstdoingtask",
    taskDescription: "4TaskContentdadsadasdasda",
    boardId: 1,
    statusId: 2,
  },
  {
    id: 6,
    taskTitle: "seconddoingtask",
    taskDescription: "4TaskContentdadsadasdasda",
    boardId: 1,
    statusId: 2,
  },
  {
    id: 7,
    taskTitle: "donetask",
    taskDescription: "4TaskContentdadsadasdasda",
    boardId: 1,
    statusId: 2,
  },
];

export let subtasks: Subtask[] = [
  {
    id: 1,
    subtaskDescription: "dsfsdfsadfdsfds",
    subtaskStatus: true,
    taskId: 1,
  },
  {
    id: 2,
    subtaskDescription:
      "DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD",
    subtaskStatus: false,
    taskId: 3,
  },
  {
    id: 3,
    subtaskDescription: "krotki tekst",
    subtaskStatus: false,
    taskId: 1,
  },
  {
    id: 4,
    subtaskDescription: "1111111111111111111111",
    subtaskStatus: true,
    taskId: 5,
  },
  {
    id: 5,
    subtaskDescription: "d3333333333333333333333333fds",
    subtaskStatus: false,
    taskId: 2,
  },
  {
    id: 6,
    subtaskDescription: "dzzzzzzzzzzzzzzzzzzzds",
    subtaskStatus: true,
    taskId: 3,
  },
];

export let statuses: Status[] = [
  {
    id: 1,
    statusName: "Todo",
    boardId: 1,
  },
  {
    id: 2,
    statusName: "Doing",
    boardId: 1,
  },
  {
    id: 3,
    statusName: "Done",
    boardId: 1,
  },
];

export function getStatusesByBoardId(boardId: number): Status[] {
  return statuses.filter((status) => status.boardId === boardId);
}

export function getTasksByBoardId(boardId: number): Task[] {
  return tasks.filter((task) => task.boardId === boardId);
}

export function addNewTaskToBoard(localAddTaskForm: AddTaskForm, activeBoard: number) {

  const newTaskId = Date.now() + Math.floor(Math.random())

  tasks.push({
    id: newTaskId,
    taskTitle: localAddTaskForm.localTaskProps.taskTitle as string,
    taskDescription: localAddTaskForm.localTaskProps.taskDescription as string,
    boardId: activeBoard,
    statusId: localAddTaskForm.localTaskProps.statusId as number,
  })
  if (localAddTaskForm.subtasksArray?.length !== 0) {
    const updatedSubtasksArray = localAddTaskForm.subtasksArray?.map((subtask, index) => {
      subtask.id = Date.now() + Math.floor(Math.random()) + index,
      subtask.subtaskDescription,
      subtask.subtaskStatus,
      subtask.taskId = newTaskId
      return subtask
    })
    subtasks = [...subtasks, ...updatedSubtasksArray as Subtask[]] 
  } 
}

export function createNewColumnWithBoardId(localColumnName: string, boardId: number) {
  statuses.push({
    id: Math.floor(Math.random() * 100),
    statusName: localColumnName,
    boardId: boardId
  })
  console.log(statuses)
}

export function createNewBoardWithLocalForm(localBoardForm: BoardForm){
  const newBoardId = Math.floor(Math.random() * 100)
  boards.push({
    id: newBoardId,
    boardName: localBoardForm.boardName
  })
   const updatedLocalArray = localBoardForm.statusesArray.map((stat, index) => {
    stat.boardId = newBoardId,
    stat.id = Date.now() + index,
    // stat.id = index + 1,
    stat.statusName
    return stat
  })
  console.log(updatedLocalArray)
  statuses = [...statuses, ...updatedLocalArray] as Status[]
}


export function editBoardWithLocalFormAndBoardId(localForm: BoardForm, boardId: number) {
  const foundBoard = boards.find((board) => board.id === boardId)
  if (foundBoard) {
  foundBoard.boardName = localForm.boardName
  }
  
  const updatedLocalArray = localForm.statusesArray.map((stat, index) => {
    if (stat.id) {
      return stat
    } else {
      stat.boardId = boardId,
      stat.id = index++,
      stat.statusName
      return stat
    }
  })
  console.log(updatedLocalArray)
  const statusesWithAnotherBoardId = statuses.filter((stat) => stat.boardId !== boardId)

  statuses = [...updatedLocalArray, ...statusesWithAnotherBoardId] as Status[]

}
  



export function getSubtasksByTasksId(ids: number[]): Map<number, Subtask[]> {
  const subtaskMap: Map<number, Subtask[]> = new Map();
  ids.forEach((id) => {
    subtasks.forEach((subtask) => {
      if (subtask.taskId === id) {
        if (subtaskMap.has(id)) {
          const subtasks = subtaskMap.get(id);
          subtaskMap.set(id, [...subtasks, subtask]);
        } else {
          subtaskMap.set(id, [subtask]);
        }
      }
    });
  });
  return subtaskMap;
  // return subtasks.filter((subtask) => subtask.taskId === id)
}

export function getSubtasksBySingleTaskId(taskId: number) {
  return subtasks.filter((subtask) => subtask.taskId === taskId);
}

export function changeTaskStatusWithBoardAndTaskId(
  clickedTaskId: number,
  newStatusId: number,
  boardId: number
) {
  const foundTask = tasks.find(
    (task) => task.boardId === boardId && task.id === clickedTaskId
  );
  if (foundTask !== undefined) {
    return (foundTask.statusId = newStatusId);
  }
}

export function updateTaskStatus(taskId: number, statusId: number) {
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask !== undefined) {
    console.log((foundTask.statusId = statusId));
    return (foundTask.statusId = statusId);
  }
}

export function changeSubtaskStatus(subtaskId: number, taskId: number) {
  const foundSubtask = subtasks.find(
    (subtask) => subtask.taskId === taskId && subtask.id === subtaskId
  );
  if (foundSubtask !== undefined) {
    return (foundSubtask.subtaskStatus = !foundSubtask?.subtaskStatus);
  }
}

export function deleteTask(clickedTaskProps: Task) {
const tasksArrayWithoutDeletedTask = tasks.filter((task) => task.id !== clickedTaskProps.id && task.boardId === clickedTaskProps.boardId)
tasks = [...tasksArrayWithoutDeletedTask]
const subtasksArrayWithoutDeletedTask = subtasks.filter((subtask) => subtask.taskId !== clickedTaskProps.id)
subtasks = [...subtasksArrayWithoutDeletedTask]
}

export function sendLocalEditTaskForm(localEditTaskForm: EditTaskForm) {
  const foundTask = tasks.find(
    (task) => task.id === localEditTaskForm.localClickedTask.id
  );
  if (foundTask !== undefined) {
    foundTask.taskTitle = localEditTaskForm.localClickedTask.taskTitle;
    foundTask.taskDescription =
      localEditTaskForm.localClickedTask.taskDescription;
    foundTask.statusId = localEditTaskForm.localClickedTask.statusId;

    subtasks.forEach((subtask) => {
      localEditTaskForm.subtasksArray?.forEach((localSubtask) => {
        if (
          localSubtask.id === subtask.id &&
          localSubtask.taskId === subtask.taskId
        ) {
          (subtask.subtaskDescription = localSubtask.subtaskDescription),
            (subtask.subtaskStatus = localSubtask.subtaskStatus),
            (subtask.taskId = localSubtask.taskId);
        } else if (
          localSubtask.id !== subtask.id &&
          localSubtask.taskId === subtask.taskId
        ) {
          const newSubtasksArray: Subtask[] = [
            {
              id: localSubtask.id,
              subtaskDescription: localSubtask.subtaskDescription,
              subtaskStatus: localSubtask.subtaskStatus,
              taskId: localSubtask.taskId,
            },
          ];
          return subtasks.concat(newSubtasksArray);
        }
      });
    });

    // console.log(localEditTaskForm.subtasksArray)
    return foundTask;
  }
}
