import { Dialog, Listbox } from "@headlessui/react";
import { Status, Subtask, Task } from "../crud";
import { useEffect, useState } from "react";

export type EditTaskDialogProps = {
  editTaskDialogIsOpen: boolean;
  closeEditTask: () => void;
  clickedTask: Task | null;
  clickedTaskSubtasks: Subtask[] | null;
  activeBoardStatusesArray: Status[] | null;
};

export const EditTaskDialog = (props: EditTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [localSubtasksArray, setLocalSubtasksArray] = useState<Subtask[]>([])

  useEffect(() => {
    if (props.clickedTask !== null) {
      setTitle(props.clickedTask?.taskTitle);
      setDescription(props.clickedTask?.taskDescription);
    }
  }, [props.clickedTask]);

  useEffect(() => {
    if (props.clickedTaskSubtasks !== null) {
      setLocalSubtasksArray(props.clickedTaskSubtasks)
    }
  }, [props.clickedTaskSubtasks]);

  function newSubtask() {
    if (props.clickedTask?.id !== undefined) {
      const idOfTask = props.clickedTask.id
      setLocalSubtasksArray((previousArrayState) => {
        if (previousArrayState !== null) {
          previousArrayState.push({
            id: (previousArrayState.length + 1),
            subtaskDescription: "",
            subtaskStatus: false,
            taskId: idOfTask
          })
        }
        return previousArrayState
      })
    }
    
  }

  

  return (
    <Dialog
      className="relative z-50"
      open={props.editTaskDialogIsOpen}
      onClose={() => props.closeEditTask()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg overflow-hidden">
          <Dialog.Title className="text-xl">Edit Task</Dialog.Title>

          <div className="flex flex-col mt-3">
            <label className="text-gray-500">Title</label>
            <input
              className="px-2 py-1 border rounded-md pl-2"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-gray-500">Description</label>
            <input
              className="px-2 py-1 border rounded-md"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></input>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-gray-500">Subtasks</label>
              {localSubtasksArray?.map((subtask) => (
                <div className="w-full flex">
                  <input
                    className="mt-2 px-2 py-1 w-[90%] border border-gray-200 rounded-md"
                    defaultValue={subtask.subtaskDescription}
                  ></input>
                  <button className="flex w-[10%] justify-center self-center mt-1">
                    <img src="./assets/icon-cross.svg"></img>
                  </button>
                </div>
                
              ))}
              <button onClick={() => newSubtask()} className="mt-2 py-1 rounded-2xl bg-purple-100">+ Add New Subtask</button>
            
          </div>
          <div>
            <h2 className="mt-3 mb-2 text-gray-500 w-full font-semibold">
              Status
            </h2>

            <Listbox value={props.activeBoardStatusesArray}>
              <Listbox.Button className="flex justify-between w-full text-left pl-2 pr-3 items-center h-8 border border-gray-300 rounded-md">
                {
                  props.activeBoardStatusesArray?.find(
                    (status) => status.id === props.clickedTask?.statusId
                  )?.statusName
                }
                <img src="./assets/icon-chevron-down.svg"></img>
              </Listbox.Button>

              {/* <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl"> */}

              <Listbox.Options className="mt-1 rounded-md border border-gray-300">
                {props.activeBoardStatusesArray?.map((status) => (
                  <Listbox.Option
                    className={
                      status.id === props.clickedTask?.statusId
                        ? `ml-0 pl-2 bg-purple-500 text-white rounded-r-xl rounded-l-md mr-5`
                        : `pl-2`
                    }
                    key={status.id}
                    value={status.statusName}
                    onClick={() => {
                      if (props.clickedTask?.id) {
                        updateTaskStatus(props.clickedTask.id, status.id);
                      }
                    }}
                    // disabled={person.unavailable}
                  >
                    {status.statusName}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div>
            <button className="mt-4 py-1 rounded-2xl bg-[#635FC7] w-full text-white">Create Task</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
