import { EditTaskForm } from "./components/EditTaskDialog"
import { Board, Status, Subtask, Task } from "./crud"




export const boards: Board[] = [{
    id: 1,
    boardName: "Platform Launch"
  },
{
  id: 2,
  boardName: "Marketing Plan"
}]

export const tasks: Task[] = [{
    id: 1,
  taskTitle: "firstTask",
  taskDescription: "firstTaskContentdadsadasdasda",
  boardId: 1,
  statusId: 1
  }, {
    id: 2,
  taskTitle: "222Task",
  taskDescription: "22222TaskContentdadsadasdasda",
  boardId: 1,
  statusId: 1
  },
  {
    id: 3,
  taskTitle: "3rdTask",
  taskDescription: "3rdTaskContentdadsadasdasda",
  boardId: 1,
  statusId: 1
  },
  {
    id: 4,
  taskTitle: "lasttodotask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 1,
  statusId: 1
  },{
    id: 5,
  taskTitle: "firstdoingtask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 1,
  statusId: 2
  },{
    id: 6,
  taskTitle: "seconddoingtask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 1,
  statusId: 2
  },{
    id: 7,
  taskTitle: "donetask",
  taskDescription: "4TaskContentdadsadasdasda",
  boardId: 1,
  statusId: 2
  }]

export  const subtasks: Subtask[] = [{
    id: 1,
    subtaskDescription: "dsfsdfsadfdsfds",
    subtaskStatus: true,
    taskId: 1
  }, {
    id: 2,
    subtaskDescription: "DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD DDDDD",
    subtaskStatus: false,
    taskId: 3
  },
  {
    id: 3,
    subtaskDescription: "krotki tekst",
    subtaskStatus: false,
    taskId: 1
  },
  {
    id: 4,
    subtaskDescription: "1111111111111111111111",
    subtaskStatus: true,
    taskId: 5
  },
  {
    id: 5,
    subtaskDescription: "d3333333333333333333333333fds",
    subtaskStatus: false,
    taskId: 2
  },
  {
    id: 6,
    subtaskDescription: "dzzzzzzzzzzzzzzzzzzzds",
    subtaskStatus: true,
    taskId: 3
  }]

 export const statuses: Status[] = [{
    id: 1,
    statusName: "Todo",
    boardId: 1
  },{
    id: 2,
    statusName: "Doing",
    boardId: 1
  },{
    id: 3,
    statusName: "Done",
    boardId: 1
  }]


  export function getStatusesByBoardId(boardId: number): Status[] {
    return statuses.filter((status) => status.boardId === boardId)
  }

  export function getTasksByBoardId(boardId: number): Task[] {
    return tasks.filter((task) => task.boardId === boardId)
  }

  export function getSubtasksByTasksId(ids: number[]): Map<number, Subtask[]> {
    const subtaskMap: Map<number, Subtask[]> = new Map();
    ids.forEach((id) => {
      subtasks.forEach((subtask) => {
        if (subtask.taskId === id) {
          if (subtaskMap.has(id)) {
          const subtasks = subtaskMap.get(id)
          subtaskMap.set(id, [...subtasks, subtask])
          } else {
            subtaskMap.set(id, [subtask])
          }
        }
      })
    })
    return subtaskMap
    // return subtasks.filter((subtask) => subtask.taskId === id)
  }
  
  export function getSubtasksBySingleTaskId(taskId: number) {
    return subtasks.filter((subtask) => subtask.taskId === taskId)
  }

  export function changeTaskStatusWithBoardAndTaskId(clickedTaskId: number, newStatusId: number, boardId: number) {
    const foundTask = tasks.find((task) => task.boardId === boardId && task.id === clickedTaskId)
    if (foundTask !== undefined){
    return foundTask.statusId = newStatusId
  }
  }

  export function updateTaskStatus(taskId: number, statusId: number) {
   const foundTask = tasks.find((task) => task.id === taskId)
    if (foundTask !== undefined) {
      console.log(foundTask.statusId = statusId)
  return foundTask.statusId = statusId
      
  }
}

  export function changeSubtaskStatus(subtaskId: number, taskId: number) {
      const foundSubtask = subtasks.find((subtask) => subtask.taskId === taskId && subtask.id === subtaskId)
      if (foundSubtask !== undefined) {
      return foundSubtask.subtaskStatus = !foundSubtask?.subtaskStatus
    }
  }

  export function addNewTask() {
    
  }


  export function sendLocalEditTaskForm(localEditTaskForm: EditTaskForm) {
    const foundTask = tasks.find((task) => task.id === localEditTaskForm.localClickedTask.id)
    if (foundTask !== undefined) {
    foundTask.taskTitle = localEditTaskForm.localClickedTask.taskTitle
    foundTask.taskDescription = localEditTaskForm.localClickedTask.taskDescription
    foundTask.statusId = localEditTaskForm.localClickedTask.statusId

    subtasks.forEach((subtask) => {
      localEditTaskForm.subtasksArray?.forEach((localSubtask) => {
       if (localSubtask.id === subtask.id && localSubtask.taskId === subtask.taskId) {
        subtask.subtaskDescription = localSubtask.subtaskDescription,
        subtask.subtaskStatus = localSubtask.subtaskStatus,
        subtask.taskId = localSubtask.taskId
       } 

       else if (localSubtask.id !== subtask.id && localSubtask.taskId === subtask.taskId) { 
        const newSubtasksArray: Subtask[] = [{
          id: localSubtask.id,
          subtaskDescription: localSubtask.subtaskDescription,
          subtaskStatus: localSubtask.subtaskStatus,
          taskId: localSubtask.taskId
        }]
       return subtasks.concat(newSubtasksArray)
       }
      })
    })

    // console.log(localEditTaskForm.subtasksArray)
    return foundTask
  }
    
  }