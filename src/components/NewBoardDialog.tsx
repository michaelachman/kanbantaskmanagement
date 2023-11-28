import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Status } from "../crud";

export type BoardForm = {
    boardName: string,
    statusesArray: Partial<Status>[]
}


export type NewBoardDialogProps = {
    newBoardDialogIsOpen: boolean,
    closeNewBoardDialog: () => void,
    createNewBoard: (localNewBoardForm: BoardForm) => void;
    darkTheme: boolean;
}

export const NewBoardDialog = (props: NewBoardDialogProps) => {

    const initialNewBoardForm: BoardForm = {
        boardName: "",
        statusesArray: []
    }


    const [localNewBoardForm, setLocalNewBoardForm] = useState(initialNewBoardForm)

    function handleBoardNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setLocalNewBoardForm((previousState) => {
            return {...previousState, boardName: event.target.value}
        })
    }

    function handleColumnNameInput(event: React.ChangeEvent<HTMLInputElement>, index: number){
        setLocalNewBoardForm((previousState) => {
            previousState.statusesArray[index].statusName = event.target.value
            return {...previousState}
        })
    }

    function deleteColumn(indexToHandle: number) {
        setLocalNewBoardForm((previousState) => {
            const newArray = previousState.statusesArray.filter((element, index) => index !== indexToHandle)
            return {...previousState, statusesArray: newArray}
        })
    }

    function addNewColumn(){
        setLocalNewBoardForm((previousState) => {
            const newStatus = {
                statusName: ""
            }
            return {...previousState, statusesArray: [...previousState.statusesArray, newStatus]}
        })
    }


    return (
        <Dialog
          className="relative z-50"
          open={props.newBoardDialogIsOpen}
          onClose={() => props.closeNewBoardDialog()}
        >
          <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
            <Dialog.Panel className={`${props.darkTheme ? `bg-[#2B2C37] text-white` : `bg-white`} p-4 rounded-md shadow-lg`}>
              <Dialog.Title className="text-2xl">Add New Board</Dialog.Title>
              <div className="mt-3">
                <label className="text-gray-500 w-full font-semibold">
                  Board Name
                </label>
                <input
                  className={`${props.darkTheme ? `bg-[#2B2C37] text-white border-2 border-gray-700` : `bg-white border border-gray-300`} border w-full rounded-md p-1`}
                  type="text"
                  onChange={(event) => handleBoardNameInput(event)}
                  value={localNewBoardForm.boardName}
                ></input>
              </div>
              <div className="mt-3">
                <label className="text-gray-500 w-full font-semibold">
                  Board Columns
                </label>
              </div>
              {localNewBoardForm.statusesArray.map((column, index) => (
                <div key={index} className="flex">
                  <input
                    className={`${props.darkTheme ? `bg-[#2B2C37] text-white border-2 border-gray-700` : `bg-white border border-gray-300`} w-full border rounded-md p-1 mt-2`}
                    type="text"
                    value={column.statusName}
                    onChange={(event) => handleColumnNameInput(event, index)}
                  ></input>
                  <img
                    onClick={() => deleteColumn(index)}
                    className="p-2 ml-1 object-scale-down"
                    src="./assets/icon-cross.svg"
                  ></img>
                </div>
              ))}
              <div className="flex flex-col mt-2">
                <button
                  className="bg-purple-100 font-bold text-[#635FC7]  rounded-3xl h-8 text-sm"
                  onClick={() => addNewColumn()}
                >
                  + Add New Column
                </button>
                <button
                  className="bg-[#635FC7] text-white font-semibold mt-4 rounded-3xl h-8 text-sm"
                  onClick={() => {
                    props.createNewBoard(localNewBoardForm)
                    setLocalNewBoardForm(initialNewBoardForm)
                  }}
                >
                  Create New Board
                </button>
                <button
              onClick={() => props.closeNewBoardDialog()}
              className="mt-4 py-1 rounded-3xl bg-purple-100 w-full text-[#635FC7] font-semibold"
            >
              Cancel
            </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      );
    };
    
    export default NewBoardDialog;
