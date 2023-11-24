import { Dialog } from "@headlessui/react"
import { Task } from "../crud";
import { deleteTask } from "../db";

export type DeleteTaskDialogProps = {
    deleteTaskDialogIsOpen: boolean
    closeDeleteTaskDialog: () => void;
    clickedTask: Task
}

export const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {



    return <div>
        <Dialog
      className="relative z-50"
      open={props.deleteTaskDialogIsOpen}
      onClose={() => props.closeDeleteTaskDialog()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-[#EA5555]">Delete this task?</Dialog.Title>
          <div className="mt-6">
            <p className="text-gray-500 text-xs mt-6">Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            
          </div>
         
          <div className="flex flex-col mt-1">
            <button
              className="bg-[#EA5555] text-white font-semibold rounded-2xl h-10 mt-6"
              onClick={() => {
                deleteTask(props.clickedTask)
                props.closeDeleteTaskDialog()
              }}
            >
              Delete
            </button>
            <button
              className="bg-purple-100 text-[#635FC7] font-semibold rounded-2xl h-10 mt-4"
              onClick={() => props.closeDeleteTaskDialog()}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
    </div>
}