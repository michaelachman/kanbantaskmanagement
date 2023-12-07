import { Dialog } from "@headlessui/react";
import { useState } from "react";

export type AddNewColumnProps = {
    addNewColumnIsOpen: boolean;
    closeAddNewColumn: () => void;
    activeBoard: number;
    createColumn: (localColumnName: string, activeBoard: number) => void;
    darkTheme: boolean;
}

export const AddNewColumn = (props: AddNewColumnProps) => {

    const [localColumnName, setLocalColumnName] = useState("")

    function handleColumnNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setLocalColumnName(event.target.value)
    }

    

    return (
        <Dialog
      className="relative z-50"
      open={props.addNewColumnIsOpen}
      onClose={() => props.closeAddNewColumn()}
    >
      <div className="fixed inset-0 bg-black/70" aria-hidden="true">
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className={`${props.darkTheme ? `bg-[#2B2C37]` : `bg-white`} p-4 rounded-md shadow-lg`}>
          <Dialog.Title className={`${props.darkTheme ? `text-white` : `text-black`} text-lg font-semibold`}>Add New Column</Dialog.Title>
          <div className="mt-3">
            <label className={`${props.darkTheme ? `text-white` : `text-gray-500`} w-full font-semibold text-sm`}>
              Column Title
            </label>
            <input
              className={`${props.darkTheme ? `bg-[#2B2C37] border-2 border-gray-700 text-white` : `bg-white`} w-full rounded-md px-2 py-1`}
              type="text"
              onChange={(event) => handleColumnNameInput(event)}
              value={localColumnName}
            ></input>
          </div>
          
          <div className="flex flex-col mt-1">
            <button
              className="mt-4 py-1 rounded-2xl bg-[#635FC7] hover:bg-[#A8A4FF] w-full text-white h-8 text-sm font-semibold"
              onClick={() => {
                props.createColumn(localColumnName, props.activeBoard);
                setLocalColumnName("")
              }}
            >
              Create Column
            </button>
            <button
            className="bg-[#635FC7]/10 hover:bg-[#635FC7]/25 text-[#635FC7] font-semibold rounded-2xl h-8 mt-4 text-sm"
            onClick={() => props.closeAddNewColumn()}
            >Cancel</button>
          </div>
        </Dialog.Panel>
      </div>
      </div>
    </Dialog>
    )
}