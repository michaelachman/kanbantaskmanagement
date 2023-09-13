import { Dialog } from "@headlessui/react"

export type TaskDetails = {
    taskName: string,
    subtasks?: {
        subtaskName: string,
        subtaskContent: string,
        subtaskStatus: boolean
    }[]
}

export type ViewTaskDialogProps = {
    viewTaskIsOpen: boolean;
    closeViewTask: () => void;
    clickedTask: TaskDetails | null
}

export const ViewTaskDialog = (props: ViewTaskDialogProps) => {
return (
    <Dialog
      className="relative z-50"
      open={props.viewTaskIsOpen}
      onClose={() => props.closeViewTask()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg">
          <Dialog.Title className="text-2xl">{props.clickedTask?.taskName}</Dialog.Title>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Board Name
            </label>
            <input
              className="bg-green-500 w-full rounded-md p-1"
              type="text"
            ></input>
          </div>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Board Columns
            </label>
          </div>
          
            <div className="flex">
              <input
                className="bg-purple-500 w-full border rounded-md p-1"
                type="text"
              ></input>
              <img
                className="p-2"
                src="./assets/icon-cross.svg"
              ></img>
            </div>
          <div className="flex flex-col mt-1">
            <button
              className="bg-red-500 rounded-2xl"
            >
              + Add New Column
            </button>
            <button
              className="bg-red-500 mt-1 rounded-2xl"
            >
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}