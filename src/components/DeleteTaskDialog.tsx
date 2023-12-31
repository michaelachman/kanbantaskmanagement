import { Dialog } from "@headlessui/react"
import { Task } from "../crud";
import { deleteTask } from "../db";

export type DeleteTaskDialogProps = {
    deleteTaskDialogIsOpen: boolean
    closeDeleteTaskDialog: () => void;
    clickedTask: Task;
}

export const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {



    return <div>
        <Dialog
      className="relative z-50"
      open={props.deleteTaskDialogIsOpen}
      onClose={() => props.closeDeleteTaskDialog()}
    >
      <div className="fixed inset-0 bg-black/70" aria-hidden="true">
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="dark:bg-[#2B2C37] bg-white p-4 rounded-md shadow-lg max-lg:w-[75%] lg:w-[33%]">
          <Dialog.Title className="text-lg font-semibold text-[#EA5555]">Delete this task?</Dialog.Title>
          <div className="mt-6">
            <p className="text-gray-500 text-xs mt-6">Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            
          </div>
         
          <div className="flex flex-col mt-1">
            <button
              className="bg-[#EA5555] hover:bg-[#FF9898] text-white font-semibold rounded-3xl h-10 mt-6 text-sm"
              onClick={() => {
                deleteTask(props.clickedTask)
                props.closeDeleteTaskDialog()
              }}
            >
              Delete
            </button>
            <button
              className="bg-[#635FC7]/10 hover:bg-[#635FC7]/25 text-[#635FC7] font-semibold rounded-3xl h-10 mt-4 text-sm"
              onClick={() => props.closeDeleteTaskDialog()}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
      </div>
    </Dialog>
    </div>
}