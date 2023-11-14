import { Dialog, Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Status, Subtask, Task } from "../crud";

export type AddNewTaskDialogProps = {
  newTaskDialogIsOpen: boolean;
  closeNewTask: () => void;
  activeBoardStatusesArray: Status[];
};

export type AddTaskForm = {
  subtasksArray: Partial<Subtask>[] | null;
  localTaskProps: Task;
};

export const AddNewTaskDialog = (props: AddNewTaskDialogProps) => {
  const initialLocalForm: AddTaskForm = {
    subtasksArray: [],
    localTaskProps: {
      id: 0,
      taskTitle: "",
      taskDescription: "",
      boardId: 0,
      statusId: 1,
    },
  };

  // props.activeBoardStatusesArray[0]?.id

  const [localAddTaskForm, setLocalAddTaskForm] =
    useState<AddTaskForm>(initialLocalForm);

  useEffect(() => {
    console.log(localAddTaskForm);
  }, [localAddTaskForm.subtasksArray, localAddTaskForm]);

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
    // tutaj wyslac forma do db
    props.closeNewTask();
  }

  return (
    <Dialog
      className="relative z-1"
      open={props.newTaskDialogIsOpen}
      onClose={() => props.closeNewTask()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg overflow-hidden">
          <Dialog.Title className="text-xl">Add New Task</Dialog.Title>

          <div className="flex flex-col mt-3">
            <label className="text-gray-500">Title</label>
            <input
              className="px-2 py-1 border rounded-md pl-2"
              placeholder="e.g. Take coffee break"
              onChange={(event) => handleTaskTitleChange(event)}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-gray-500">Description</label>
            <input
              className="px-2 py-1 border rounded-md"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
              onChange={(event) => handleTaskDescriptionChange(event)}
            ></input>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-gray-500">Subtasks</label>
            {localAddTaskForm.subtasksArray?.map((subtask, index) => (
              <div className="w-full flex">
                <input
                  value={subtask.subtaskDescription}
                  className="mt-2 px-2 py-1 w-[90%] border border-gray-200 rounded-md"
                  onChange={(event) => handleSubtaskInput(event, index)}
                  placeholder="e.g. Make coffee"
                ></input>
                <button
                  onClick={() => deleteSubtask(index)}
                  className="flex w-[10%] justify-center self-center mt-1"
                >
                  <img src="./assets/icon-cross.svg"></img>
                </button>
              </div>
            ))}
            <button
              onClick={() => newSubtask()}
              className="mt-2 py-1 rounded-2xl bg-purple-100"
            >
              + Add New Subtask
            </button>
          </div>
          <div>
            <h2 className="mt-3 mb-2 text-gray-500 w-full font-semibold">
              Status
            </h2>

            <Listbox value={props.activeBoardStatusesArray}>
              <Listbox.Button className="flex justify-between w-full text-left pl-2 pr-3 items-center h-8 border border-gray-300 rounded-md">
                {
                  props.activeBoardStatusesArray.find(
                    (status) =>
                      status.id === localAddTaskForm.localTaskProps.statusId
                  )?.statusName
                }

                <img src="./assets/icon-chevron-down.svg"></img>
              </Listbox.Button>

              {/* <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl"> */}

              <Listbox.Options className="mt-1 rounded-md border border-gray-300">
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
              className="mt-4 py-1 rounded-2xl bg-[#635FC7] w-full text-white"
            >
              Create Task
            </button>
            <button
              onClick={() => props.closeNewTask()}
              className="mt-4 py-1 rounded-2xl bg-purple-200 w-full text-[#635FC7] font-semibold"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
