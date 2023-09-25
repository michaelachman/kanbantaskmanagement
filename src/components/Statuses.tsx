import { Status, Subtask, Task } from "../crud";

export type StatusesProps = {
  activeBoardStatusesArray: Status[] | null;
  activeBoardTasksArray: Task[] | null;
  subtasksMap: Map<number, Subtask[]> | null;
  openEditBoard: () => void;
};

export const Statuses = (props: StatusesProps) => {
  return props.activeBoardStatusesArray?.length === 0 ? (
    <div className="h-full mt-5 flex flex-col items-center justify-center pb-32 bg-[#F4F7FD]">
      <p className="text-[#828FA3] font-bold">
        This board is empty. Create a new column to get started.
      </p>
      <button
        className="bg-[#635FC7] text-white mt-4 p-3 rounded-3xl text-sm"
        onClick={() => props.openEditBoard()}
      >
        +Add New Column
      </button>
    </div>
  ) : (
    <div className="h-full w-full flex flex-row bg-red-500 pt-6 pl-4 text-left overflow-x-scroll flex-nowrap">
      {props.activeBoardStatusesArray?.map((status) => (
        <div className="column min-w-[75%] min-h-[88px] mr-6 mb-5">
          <h1 className="column-title pb-6 text-lg">
            {status.statusName} (
            {
              props.activeBoardTasksArray?.filter(
                (filteredTask) => filteredTask.statusId === status.id
              ).length
            }
            )
          </h1>
          {props.activeBoardTasksArray
            ?.filter((filteredTask) => filteredTask.statusId === status.id)
            .map((task) => (
              <div className="taskdiv px-4 py-6 mb-5 bg-green-500 rounded-lg shadow-xl">
                <h2 className="bg-blue-500">
                  {task.statusId === status.id && task.taskTitle}
                </h2>
                <h3>
                  {
                    props.subtasksMap?.get(task.id)?.filter(
                      (filteredSubtask) => filteredSubtask.subtaskStatus === true
                    ).length
                  }{" "}
                  of{" "}
                  {
                    props.subtasksMap?.get(task.id)?.length
                  }
                </h3>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

// {props.subtasksArray?.filter((filteredSubtask) => filteredSubtask.taskId === task.id).map((subtask) => (
// <h3 className="bg-purple-500">{subtask.subtaskStatus}</h3>
// ))}
