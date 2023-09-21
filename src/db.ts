import { Board, Status, Subtask, Task } from "./crud"




export const boards: Board[] = [{
    id: 0,
    boardName: "Platform Launch"
  },
{
  id: 1,
  boardName: "Marketing Plan"
}]

export const tasks: Task[] = [{
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
  taskTitle: "lasttodotask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 0,
  statusId: 0
  },{
    id: 4,
  taskTitle: "firstdoingtask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 0,
  statusId: 1
  },{
    id: 5,
  taskTitle: "seconddoingtask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 0,
  statusId: 1
  },{
    id: 6,
  taskTitle: "donetask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 0,
  statusId: 2
  }]

export  const subtasks: Subtask[] = [{
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
    taskId: 1
  },
  {
    id: 5,
    subtaskDescription: "dzzzzzzzzzzzzzzzzzzzds",
    subtaskStatus: true,
    taskId: 1
  }]

 export const statuses: Status[] = [{
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


  export function getStatusesByBoardId(boardId: number): Status[] {
    return statuses.filter((status) => status.boardId === boardId)
  }

  export function getTasksByBoardId(boardId: number): Task[] {
    return tasks.filter((task) => task.boardId === boardId)
  }

  export function getSubtasksByTaskId([{id}]: Task[]): Subtask[] {
    return subtasks.filter((subtask) => subtask.taskId === id)
  }