import { BoardType } from "../App";

export type ColumnsProps = {
  boardDetails: BoardType;
  viewTask: (event: React.MouseEvent<HTMLElement>, columnIndex: number, taskIndex: number) => void;
};

export const Columns = (props: ColumnsProps) => {


  return (
    <div className="h-full w-full flex flex-row bg-red-500 pt-6 pl-4 text-left overflow-x-scroll flex-nowrap">
      {props.boardDetails.columns?.map((columnsIteration, columnIndex) => (
        <div className="column min-w-[75%] min-h-[88px] mr-6 mb-5">
          <h1 className="column-title pb-6">{columnsIteration.columnName} ({columnsIteration.tasks?.length === undefined ? "0" : columnsIteration.tasks?.length})</h1>
          {columnsIteration.tasks?.map((tasksIteration, taskIndex) => (
            <div onClick={(event) => props.viewTask(event, columnIndex, taskIndex)} className="taskdiv px-4 py-6 mb-5 bg-green-500 rounded-lg shadow-xl">
            <p className="task-name font-semibold">{tasksIteration.taskName}</p>
            <p>{tasksIteration.subtasks?.filter(subtask => subtask.subtaskStatus === true).length} of {tasksIteration.subtasks?.length} subtasks</p>
            
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};