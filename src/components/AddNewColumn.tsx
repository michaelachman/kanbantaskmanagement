import { Dialog } from "@headlessui/react";
import { useState } from "react";

export type AddNewColumnProps = {
    addNewColumnIsOpen: boolean;
    closeAddNewColumn: () => void;
    activeBoard: number;
}

export const AddNewColumn = (props: AddNewColumnProps) => {

    const [localColumnName, setLocalColumnName] = useState("")

    function handleColumnNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setLocalColumnName(event.target.value)
    }

    function createColumn(localColumnName: string) {
        // tu wyslac do db activeBoard i nowy columnname
        props.closeAddNewColumn()
    }

    return (
        <Dialog
      className="relative z-50"
      open={props.addNewColumnIsOpen}
      onClose={() => props.closeAddNewColumn()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg">
          <Dialog.Title className="text-2xl">Add New Column</Dialog.Title>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Column Title
            </label>
            <input
              className="bg-green-500 w-full rounded-md p-1"
              type="text"
              onChange={(event) => handleColumnNameInput(event)}
              value={localColumnName}
            ></input>
          </div>
          
          <div className="flex flex-col mt-1">
            <button
              className="mt-4 py-1 rounded-2xl bg-[#635FC7] w-full text-white"
              onClick={() => createColumn(localColumnName)}
            >
              Create Column
            </button>
            <button
            className="bg-purple-100 text-[#635FC7] font-semibold rounded-2xl h-10 mt-4"
            onClick={() => props.closeAddNewColumn()}
            >Cancel</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
    )
}