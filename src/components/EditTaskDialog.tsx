import { Dialog, Listbox } from "@headlessui/react";
import { Status, Subtask, Task } from "../crud";
import { useEffect, useState } from "react";
import { sendLocalEditTaskForm } from "../db";

export type EditTaskDialogProps = {
  editTaskDialogIsOpen: boolean;
  closeEditTask: () => void;
  clickedTask: Task;
  clickedTaskSubtasks: Subtask[] | null;
  activeBoardStatusesArray: Status[] | null;
};

export type EditTaskForm = {
  subtasksArray: Partial<Subtask>[] | null,
  statusesArray: Status[] | null,
  localClickedTask: Task
}


export const EditTaskDialog = (props: EditTaskDialogProps) => {


  const initialLocalForm: EditTaskForm = {
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

  const [localEditTaskForm, setLocalEditTaskForm] = useState<EditTaskForm>(initialLocalForm)
  // const [localSubtasksArray, setLocalSubtasksArray] = useState<Subtask[]>([])
  // const [localStatusesArray, setLocalStatusesArray] = useState<Status[]>([])
  // const [localClickedTask, setLocalClickedTask] = useState<Task | null>(props.clickedTask)

  useEffect(() => {
    if (props.clickedTask !== null) {
      setLocalEditTaskForm((previousState) => {
        return {...previousState, localClickedTask: props.clickedTask }
      })
    }
  }, [props.clickedTask])

  useEffect(() => {
    if (props.clickedTaskSubtasks !== null) {
      setLocalEditTaskForm((previousState) => {
        return {...previousState, subtasksArray: props.clickedTaskSubtasks, }
      })
    }
  }, [props.clickedTaskSubtasks]);

  useEffect(() => {
    if (props.activeBoardStatusesArray !== null) {
      setLocalEditTaskForm((previousState) => {
        return {...previousState, statusesArray: props.activeBoardStatusesArray}
      })
    }
  }, [props.activeBoardStatusesArray])

 

  function newSubtask() {
    
     setLocalEditTaskForm((previousState) => {
        const newSubtask = {
          subtaskDescription: "",
        subtaskStatus: false,
        taskId: previousState.localClickedTask.id
        }
        return {...previousState, subtasksArray: [...previousState.subtasksArray || [], newSubtask]}
      })
    }
        
    
     
    


  function handleTaskTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalEditTaskForm((previousState) => {
      return {...previousState, localClickedTask: {...previousState.localClickedTask, taskTitle: event.target.value}}
    })
  }

  function handleTaskDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalEditTaskForm((previousState) => {
      return {...previousState, localClickedTask: {...previousState.localClickedTask, taskDescription: event.target.value}}
    })
  }

  function handleStatusClick(idOfClickedStatus: number) {
    setLocalEditTaskForm((previousState) => {
      return {...previousState, localClickedTask: {...previousState.localClickedTask, statusId: idOfClickedStatus}}
    })
  }

  function handleSubtaskInput(event: React.ChangeEvent<HTMLInputElement>, indexToHandle: number) {
    setLocalEditTaskForm((previousState) => {
      if (previousState.subtasksArray !== null)
      previousState.subtasksArray[indexToHandle].subtaskDescription = event.target.value
      return {...previousState, subtasksArray: [...previousState.subtasksArray || []]}
    })}
  

  function deleteSubtask(indexToDelete: number) {
    setLocalEditTaskForm((previousState) => {
      
      const newArray = previousState.subtasksArray?.filter((subtask, index) => index !== indexToDelete)
      return {...previousState, subtasksArray: newArray || []}
    
    })
  }

  function editTaskButton(localEditTaskForm: EditTaskForm) {
    sendLocalEditTaskForm(localEditTaskForm);
    props.closeEditTask()
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
              value={localEditTaskForm.localClickedTask?.taskTitle}
              onChange={(event) => handleTaskTitleChange(event)}
              
            ></input>
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-gray-500">Description</label>
            <input
              className="px-2 py-1 border rounded-md"
              value={localEditTaskForm.localClickedTask?.taskDescription}
              onChange={(event) => handleTaskDescriptionChange(event)}
            ></input>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-gray-500">Subtasks</label>
              {localEditTaskForm.subtasksArray?.map((subtask, index) => (
                <div key={subtask.id} className="w-full flex">
                  <input
                    key={subtask.id}
                    id={`${subtask.id}`}
                    className="mt-2 px-2 py-1 w-[90%] border border-gray-200 rounded-md"
                    value={subtask.subtaskDescription}
                    onChange={(event) => handleSubtaskInput(event, index)}
                  ></input>
                  <button onClick={() => deleteSubtask(index)} className="flex w-[10%] justify-center self-center mt-1">
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

            <Listbox value={localEditTaskForm.statusesArray}>
              <Listbox.Button className="flex justify-between w-full text-left pl-2 pr-3 items-center h-8 border border-gray-300 rounded-md">
                {
                  localEditTaskForm.statusesArray?.find(
                    (status) => status.id === localEditTaskForm.localClickedTask.statusId
                  )?.statusName
                }
                <img src="./assets/icon-chevron-down.svg"></img>
              </Listbox.Button>

              {/* <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl"> */}

              <Listbox.Options className="mt-1 rounded-md border border-gray-300">
                {localEditTaskForm.statusesArray?.map((status) => (
                  <Listbox.Option
                    className={
                      status.id === localEditTaskForm.localClickedTask?.statusId
                        ? `ml-0 pl-2 bg-purple-500 text-white rounded-r-xl rounded-l-md mr-5`
                        : `pl-2`
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
            <button onClick={() => editTaskButton(localEditTaskForm)} className="mt-4 py-1 rounded-2xl bg-[#635FC7] w-full text-white">Edit Task</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
