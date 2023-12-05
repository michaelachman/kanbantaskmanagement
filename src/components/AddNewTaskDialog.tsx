import { Dialog, Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Status, Subtask, Task } from "../crud";
import { addNewTaskToBoard } from "../db";

export type AddNewTaskDialogProps = {
  activeBoard: number | null;
  newTaskDialogIsOpen: boolean;
  closeNewTask: () => void;
  activeBoardStatusesArray: Status[];
  darkTheme: boolean;
};

export type AddTaskForm = {
  subtasksArray: Partial<Subtask>[] | null;
  localTaskProps: Partial<Task>;
};

export const AddNewTaskDialog = (props: AddNewTaskDialogProps) => {
  const initialLocalForm: AddTaskForm = {
    subtasksArray: [],
    localTaskProps: {
      taskTitle: "",
      taskDescription: "",
      boardId: 0,
      statusId: 1,
    },
  };

  const [localAddTaskForm, setLocalAddTaskForm] =
    useState<AddTaskForm>(initialLocalForm);

  // useEffect(() => {
  //   console.log(localAddTaskForm);
  // }, [localAddTaskForm.subtasksArray, localAddTaskForm]);

  function newSubtask() {
    setLocalAddTaskForm((previousState) => {
      const newSubtask = {
        subtaskDescription: "",
        subtaskStatus: false,
      };
      return {
        ...previousState,
        subtasksArray: [...(previousState.subtasksArray || []), newSubtask],
      };
    });
  }

  function handleTaskTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalAddTaskForm((previousState) => {
      return {
        ...previousState,
        localTaskProps: {
          ...previousState.localTaskProps,
          taskTitle: event.target.value,
        },
      };
    });
  }

  function handleTaskDescriptionChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setLocalAddTaskForm((previousState) => {
      return {
        ...previousState,
        localTaskProps: {
          ...previousState.localTaskProps,
          taskDescription: event.target.value,
        },
      };
    });
  }

  function handleSubtaskInput(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setLocalAddTaskForm((previousState) => {
      if (previousState.subtasksArray !== null) {
        previousState.subtasksArray[index].subtaskDescription =
          event.target.value;
      }
      return {
        ...previousState,
        subtasksArray: [...(previousState.subtasksArray || [])],
      }
    });
  }

  function handleStatusClick(statusId: number) {
    setLocalAddTaskForm((previousState) => {
      return {
        ...previousState,
        localTaskProps: { ...previousState.localTaskProps, statusId: statusId },
      };
    });
  }

  function deleteSubtask(indexToDelete: number) {
    console.log(indexToDelete);

    setLocalAddTaskForm((previousState) => {
      
      console.log(previousState.subtasksArray)
      const newSubtasksArray = previousState.subtasksArray?.filter((element, index) => index !== indexToDelete)//.map((element) => ({...element}))
      return {
        ...previousState,
        subtasksArray: newSubtasksArray || [],
      }
    });
  }

  function closeAndSaveTask(localAddTaskForm: AddTaskForm) {
    if (props.activeBoard)
    addNewTaskToBoard(localAddTaskForm, props.activeBoard)
    setLocalAddTaskForm(initialLocalForm)
    props.closeNewTask();
  }

  return (
    <Dialog
      className="relative z-1"
      open={props.newTaskDialogIsOpen}
      onClose={() => props.closeNewTask()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className={`${props.darkTheme ? `bg-[#2B2C37]` : `bg-white`} max-sm:w-[95%] max-md:w-[75%] max-lg:w-[33%] lg:w-[33%] p-4 rounded-md shadow-lg overflow-hidden`}>
          <Dialog.Title className={`${props.darkTheme ? `text-white` : `text-black`} text-base font-semibold`}>Add New Task</Dialog.Title>

          <div className="flex flex-col mt-3">
            <label className={`text-gray-500 text-xs font-semibold`}>Title</label>
            <input
              className={`${props.darkTheme ? `bg-[#2B2C37] border-2 border-gray-700` : `bg-white`} px-2 py-1 border rounded-md pl-2 text-xs`}
              placeholder="e.g. Take coffee break"
              onChange={(event) => handleTaskTitleChange(event)}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
            <label className={`text-gray-500 text-xs font-semibold`}>Description</label>
            <input
              className={`${props.darkTheme ? `bg-[#2B2C37] border-2 border-gray-700` : `bg-white`} px-2 py-1 border rounded-md  text-xs resize-y`}
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
              onChange={(event) => handleTaskDescriptionChange(event)}
            ></input>
          </div>
          <div className="flex flex-col mt-4">
            <label className={`text-gray-500 font-semibold text-xs`}>Subtasks</label>
            {localAddTaskForm.subtasksArray?.map((subtask, index) => (
              <div className="w-full flex">
                <input
                  value={subtask.subtaskDescription}
                  className={`${props.darkTheme ? `bg-[#2B2C37] border-2 border-gray-700` : `bg-white`} text-sm mt-2 px-2 py-1 w-[90%] border border-gray-200 rounded-md`}
                  onChange={(event) => handleSubtaskInput(event, index)}
                  placeholder="e.g. Make coffee"
                ></input>
                <button
                  onClick={() => deleteSubtask(index)}
                  className={`flex w-[10%] justify-center self-center mt-1`}
                >
                  <img src="./assets/icon-cross.svg"></img>
                </button>
              </div>
            ))}
            <button
              onClick={() => newSubtask()}
              className="mt-2 py-1 rounded-2xl bg-purple-100 text-[#635FC7] font-semibold text-xs"
            >
              + Add New Subtask
            </button>
          </div>
          <div>
            <h2 className={`mt-3 mb-2 text-gray-500 w-full font-semibold text-xs`}>
              Status
            </h2>

            <Listbox value={props.activeBoardStatusesArray}>
              <Listbox.Button className={`${props.darkTheme ? `border-2 border-gray-700 text-white` : `border border-gray-300 text-black`} flex justify-between w-full text-left pl-2 pr-3 items-center h-8 rounded-md text-xs`}>
                {
                  props.activeBoardStatusesArray.find(
                    (status) =>
                      status.id === localAddTaskForm.localTaskProps.statusId
                  )?.statusName
                }

                <img src="./assets/icon-chevron-down.svg"></img>
              </Listbox.Button>

              {/* <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl"> */}

              <Listbox.Options className={`${props.darkTheme ? `border-2 border-gray-700 text-white` : `border border-gray-300 text-black`} text-sm mt-1 rounded-md border border-gray-300`}>
                {props.activeBoardStatusesArray?.map((status) => (
                  <Listbox.Option
                    className={
                      localAddTaskForm.localTaskProps.statusId === status.id
                        ? "pl-2 bg-purple-500 text-white rounded-r-xl rounded-l-md mr-5"
                        : "pl-2"
                    }

                    key={status.id}
                    value={status.statusName}
                    onClick={() => handleStatusClick(status.id)}
                    // disabled={person.unavailable}
                  >
                    {status.statusName}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div>
            <button
              onClick={() => closeAndSaveTask(localAddTaskForm)}
              className="mt-4 py-1 rounded-2xl bg-[#635FC7] w-full text-white text-xs h-8 font-semibold"
            >
              Create Task
            </button>
            <button
              onClick={() => props.closeNewTask()}
              className="mt-4 py-1 rounded-2xl bg-purple-100 w-full text-[#635FC7] text-xs h-8 font-bold"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
