import { useState } from "react";
import { Status, Subtask, Task } from "../crud";
import { AddNewColumn } from "./AddNewColumn";

export type StatusesProps = {
  activeBoard: number;
  activeBoardStatusesArray: Status[] | null;
  activeBoardTasksArray: Task[] | null;
  subtasksMap: Map<number, Subtask[]> | null;
  openEditBoard: () => void;
  viewTask: (task: Task) => void;
};

export const Statuses = (props: StatusesProps) => {
  const [addNewColumnIsOpen, setAddNewColumnIsOpen] = useState(false);

  function closeAddNewColumn() {
    setAddNewColumnIsOpen(false);
  }

  function openAddNewColumn(){
    setAddNewColumnIsOpen(true)
  }

  return props.activeBoardStatusesArray?.length === 0 ? (
    <div className="h-full mt-5 flex flex-col items-center justify-center pb-32 bg-[#F4F7FD]">
      <p className="text-[#828FA3] font-bold">
        This board is empty. Create a new column to get started.
      </p>
      <button
        className="bg-[#635FC7] text-white mt-4 p-3 rounded-3xl text-sm"
        onClick={() => setAddNewColumnIsOpen(true)}
      >
        +Add New Column
      </button>
      <AddNewColumn
        activeBoard={props.activeBoard}
        addNewColumnIsOpen={addNewColumnIsOpen}
        closeAddNewColumn={closeAddNewColumn}
      />
    </div>
  ) : (
    <div className="h-full w-full flex flex-row bg-gray-100 pt-6 pl-4 text-left overflow-x-scroll flex-nowrap">
      {props.activeBoardStatusesArray?.map((status) => (
        <div className="column min-w-[75%] min-h-[88px] mr-6 mb-5">
          <h1 className="column-title pb-6 text-lg">
            {status.statusName.toUpperCase()} (
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
              <div
                onClick={() => props.viewTask(task)}
                className="taskdiv px-4 py-6 mb-5 bg-white rounded-lg shadow-xl"
              >
                <h2 className="font-bold">
                  {task.statusId === status.id && task.taskTitle}
                </h2>
                {props.subtasksMap?.has(task.id) && (
                  <h3 className="text-gray-500 font-semibold">
                    {
                      props.subtasksMap
                        ?.get(task.id)
                        ?.filter(
                          (filteredSubtask) =>
                            filteredSubtask.subtaskStatus === true
                        ).length
                    }{" "}
                    of {props.subtasksMap?.get(task.id)?.length}{" "}
                    {props.subtasksMap.get(task.id)?.length === 1
                      ? "subtask"
                      : "subtasks"}
                  </h3>
                )}
              </div>
            ))}
        </div>
      ))}
      <div onClick={() => openAddNewColumn()} className="flex px-4 py-6 mb-5 mr-5 min-w-[75%] bg-gray-300 rounded-lg shadow-xl text-center">
        <h1 className="flex w-full justify-center self-center text-gray-500 text-xl font-bold">+New Column</h1>
      </div>
      <AddNewColumn
        activeBoard={props.activeBoard}
        addNewColumnIsOpen={addNewColumnIsOpen}
        closeAddNewColumn={closeAddNewColumn}
      />
    </div>
  );
};
