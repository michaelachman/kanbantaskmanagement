import { Dialog, Listbox } from "@headlessui/react"
import { ReactComponent as IconCheck } from "../../assets/icon-check.svg";
import { Status, Subtask, Task } from "../crud";
import { changeSubtaskStatus } from "../db";


export type ViewTaskDialogProps = {
    activeBoard: number | null;
    viewTaskIsOpen: boolean;
    closeViewTask: () => void;
    clickedTask: Task | null;
    // changeSubtaskStatus: () => void;
    clickedTaskSubtasks: Subtask[] | null
    activeBoardStatusesArray: Status[] | null
    // chosenStatus: (key: number, clickedTask: Task | null) => void;
    editTask: () => void;
    taskStatusChange: (clickedTaskId: number, newStatusId: number, boardId: number) => void;
    statusDependency: () => void;
}

export const ViewTaskDialog = (props: ViewTaskDialogProps) => {


return (
    <Dialog
      className="relative z-50"
      open={props.viewTaskIsOpen}
      onClose={() => props.closeViewTask()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg overflow-hidden">
          <div className="flex">
          <Dialog.Title className="text-xl w-[90%]">{props.clickedTask?.taskTitle}</Dialog.Title>
          <button onClick={() => props.editTask()} className="h-10 w-10 flex items-center justify-center"><img className="" src="./assets/icon-vertical-ellipsis.svg"></img></button>
          </div>
          <div className="mt-3">
            <p className="text-gray-500">{props.clickedTask?.taskDescription}</p>
          </div>
          {props.clickedTaskSubtasks?.length !== 0 && <><h2 className="mt-3 text-gray-500 w-full font-semibold">{props.clickedTaskSubtasks?.length === 1 ? "Subtask" : "Subtasks"} ({props.clickedTaskSubtasks?.filter((subtask) => subtask.subtaskStatus === true).length} of {props.clickedTaskSubtasks?.length})</h2>
          {props.clickedTaskSubtasks?.length !== 0 && props.clickedTaskSubtasks?.map((subtask) => (
            <div className="mt-3 bg-[#F4F7FD] flex rounded-md">
            <div onClick={() => { if (props.clickedTask?.id !== undefined) {
              changeSubtaskStatus(subtask.id, props.clickedTask?.id)
              props.statusDependency()
              }}}
              className={`flex w-4 h-4 ml-2 justify-center items-center self-center ${subtask.subtaskStatus === true ? `bg-purple-500` : `bg-white border`} rounded-sm`}>
            <IconCheck className="text-white"/>
            </div>
            <p className={`pl-1 break-words overflo w-full ml-3 pr-9 ${subtask.subtaskStatus === true ? `text-gray-500 line-through` : `font-semibold text-black`}`}>{subtask.subtaskDescription}</p>
          </div>
          ))}
          </>}
          <div>
            <h2 className="mt-3 mb-2 text-gray-500 w-full font-semibold">Current Status</h2>
            <Listbox value={props.activeBoardStatusesArray}>
             
      <Listbox.Button className="flex justify-between w-full text-left pl-2 pr-3 items-center h-8 border border-gray-300 rounded-md">
        {props.activeBoardStatusesArray?.find((status) => status.id === props.clickedTask?.statusId)?.statusName}
        <img src="./assets/icon-chevron-down.svg"></img>
        </Listbox.Button>

        {/* <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl"> */}
      
      <Listbox.Options className="mt-1 rounded-md border border-gray-300">
        {props.activeBoardStatusesArray?.map((status) => (
          <Listbox.Option
            className={status.id === props.clickedTask?.statusId ? `ml-0 pl-2 bg-purple-500 text-white rounded-r-xl rounded-l-md mr-5` : `pl-2`}
            key={status.id}
            value={status.statusName}
            onClick = {() => {
              if (props.clickedTask?.id && props.activeBoard !== null) {
              props.taskStatusChange(props.clickedTask.id, status.id, props.activeBoard)
            }}}
            // disabled={person.unavailable}
          >
            {status.statusName}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
    <button
              onClick={() => props.closeViewTask()}
              className="mt-4 py-1 rounded-2xl bg-purple-100 w-full text-[#635FC7] font-semibold"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}