import { Dialog } from "@headlessui/react"
import { ReactComponent as IconCheck } from "../../assets/icon-check.svg";
import { useEffect } from "react";

export type TaskDetails = {
    taskName: string,
    taskDescription?: string,
    subtasks?: {
        subtaskContent: string,
        subtaskStatus: boolean
    }[]
}

export type ViewTaskDialogProps = {
    viewTaskIsOpen: boolean;
    closeViewTask: () => void;
    clickedTask: TaskDetails | null
    changeSubtaskStatus: (index: number) => void;
}

export const ViewTaskDialog = (props: ViewTaskDialogProps) => {


  let doneSubtasksArray = props.clickedTask?.subtasks?.filter(doneSubtasks => doneSubtasks.subtaskStatus === true)

  useEffect(() => {
    doneSubtasksArray = props.clickedTask?.subtasks?.filter(doneSubtasks => doneSubtasks.subtaskStatus === true)
    
  }, [props.clickedTask?.subtasks])


// <h2 className="text-gray-500 w-full font-semibold">Subtasks ({props.clickedTask?.subtasks?.filter(doneSubtask => doneSubtask.subtaskStatus === true).length} of {props.clickedTask?.subtasks?.length})</h2>

return (
    <Dialog
      className="relative z-50"
      open={props.viewTaskIsOpen}
      onClose={() => props.closeViewTask()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg">
          <Dialog.Title className="text-xl">{props.clickedTask?.taskName}</Dialog.Title>
          <div className="mt-3">
            <p className="text-gray-500">{props.clickedTask?.taskDescription}</p>
          </div>
          {props.clickedTask?.subtasks === undefined ? undefined : <h2 className="mt-3 text-gray-500 w-full font-semibold">Subtasks ({doneSubtasksArray?.length} of {props.clickedTask?.subtasks?.length})</h2>}
          <div className="mt-3">
            {props.clickedTask?.subtasks?.map((subtasksIteration, index) => (
              <div className={`flex ${subtasksIteration.subtaskStatus === true ? `bg-[#F4F7FD]` : `bg-[#F4F7FD]`} mt-2`}>
            <div onClick={() => props.changeSubtaskStatus(index)} className={`flex w-4 h-4 ml-2 justify-center items-center self-center ${subtasksIteration.subtaskStatus === true ? `bg-purple-500` : `bg-white border`} rounded-sm`}>
            <IconCheck className="text-white"/>
            </div>
            <p className={`pl-1 w-full ml-3 ${subtasksIteration.subtaskStatus === true ? `text-gray-500 line-through` : `font-semibold text-black`}`}>{subtasksIteration.subtaskContent}</p>
            </div>
            ))}
          </div>
            
          
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}