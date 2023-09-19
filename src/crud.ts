


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
  };
  
  export type Subtask = {
    id: number;
    subtaskDescription: string;
    subtaskStatus: boolean;
    taskId: number;
  };
  
  export type Status = {
    id: number;
    statusName: string;
    boardId: number;
  };

