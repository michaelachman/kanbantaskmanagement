import { Dialog, Listbox } from "@headlessui/react";
import { useState } from "react";
import { Status, Subtask, Task } from "../crud";



export type AddNewTaskDialogProps = {
    newTaskDialogIsOpen: boolean
    closeNewTask: () => void
}

export type AddTaskForm = {
    subtasksArray: Subtask[] | null,
    statusesArray: Status[] | null,
    localClickedTask: Task
  }


export const AddNewTaskDialog = (props: AddNewTaskDialogProps) => {


    const initialLocalForm: AddTaskForm = {
        subtasksArray: [],
        statusesArray: [],
        localClickedTask: {
          id: 0,
          taskTitle: "",
          taskDescription: "",
          boardId: 0,
          statusId: 0
        }
      }

    const [localAddTaskForm, setLocalAddTaskForm] = useState<AddTaskForm>(initialLocalForm)

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
                //   onChange={(event) => handleTaskTitleChange(event)}
                  
                ></input>
              </div>
              <div className="flex flex-col mt-3">
                <label className="text-gray-500">Description</label>
                <input
                  className="px-2 py-1 border rounded-md"
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
                //   onChange={(event) => handleTaskDescriptionChange(event)}
                ></input>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-gray-500">Subtasks</label>
                  {localAddTaskForm.subtasksArray?.map((subtask) => (
                    <div key={subtask.id} className="w-full flex">
                      <input
                        key={subtask.id}
                        id={`${subtask.id}`}
                        className="mt-2 px-2 py-1 w-[90%] border border-gray-200 rounded-md"
                        value={subtask.subtaskDescription}
                        // onChange={(event) => handleSubtaskInput(event, subtask.id)}
                      ></input>
                      <button 
                    //   onClick={() => deleteSubtask(subtask.id)} 
                      className="flex w-[10%] justify-center self-center mt-1">
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
    
                <Listbox value={localAddTaskForm.statusesArray}>
                  <Listbox.Button className="flex justify-between w-full text-left pl-2 pr-3 items-center h-8 border border-gray-300 rounded-md">
                    {
                      localAddTaskForm.statusesArray?.find(
                        (status) => status.id === localAddTaskForm.localClickedTask.statusId
                      )?.statusName
                    }
                    <img src="./assets/icon-chevron-down.svg"></img>
                  </Listbox.Button>
    
                  {/* <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl"> */}
    
                  <Listbox.Options className="mt-1 rounded-md border border-gray-300">
                    {localAddTaskForm.statusesArray?.map((status) => (
                      <Listbox.Option
                        className={
                          status.id === localAddTaskForm.localClickedTask?.statusId
                            ? `ml-0 pl-2 bg-purple-500 text-white rounded-r-xl rounded-l-md mr-5`
                            : `pl-2`
                        }
                        key={status.id}
                        value={status.statusName}
                        // onClick={() => handleStatusClick(status.id)}
                        //   if (localAddTaskForm.localClickedTask?.id) {
                        //     setlocalAddTaskForm((previousState) => {
                        //       return {...previousState, localClickedTask?.localClickedTask?.statusId = status.id}
                        //     });
                        //   }
                        // }}
                        // (localAddTaskForm.localClickedTask.id, status.id);
                        // disabled={person.unavailable}
                      >
                        {status.statusName}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
              <div>
                <button onClick={() => createTaskButton(localAddTaskForm)} className="mt-4 py-1 rounded-2xl bg-[#635FC7] w-full text-white">Create Task</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      );
}