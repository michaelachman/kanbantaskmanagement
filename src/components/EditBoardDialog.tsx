import { Dialog } from "@headlessui/react";
import { BoardType, Column } from "../App";
import { useEffect, useState } from "react";
import { Status } from "../crud";

export type BoardForm = {
  boardName: string,
  statusesArray: Partial<Status>[]
}


export type EditBoardDialogProps = {
  editBoardIsOpen: boolean,
  closeEditBoard: () => void
  boardName: string;
  activeBoardStatusesArray: Status[]
}

export const EditBoardDialog = (props: EditBoardDialogProps) => {

  const initialNewBoardForm: BoardForm = {
      boardName: "",
      statusesArray: []
  }


  const [localNewBoardForm, setLocalNewBoardForm] = useState(initialNewBoardForm)

  useEffect(() => {
    setLocalNewBoardForm((previousState) => {
      return {...previousState, statusesArray: props.activeBoardStatusesArray}
    })
  }, [props.activeBoardStatusesArray])

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

  function saveChanges(localNewBoardForm: BoardForm){
      // tu wyslac do db
      props.closeEditBoard()
  }

  return (
    <Dialog
      className="relative z-50"
      open={props.editBoardIsOpen}
      onClose={() => props.closeEditBoard()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg">
          <Dialog.Title className="text-2xl">Edit New Board</Dialog.Title>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Board Name
            </label>
            <input
              className="bg-green-500 w-full rounded-md p-1"
              type="text"
              onChange={(event) => handleBoardNameInput(event)}
              value=""
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
                className="bg-purple-500 w-full border rounded-md p-1"
                type="text"
                value={column.statusName}
                onChange={(event) => handleColumnNameInput(event, index)}
              ></input>
              <img
                onClick={() => deleteColumn(index)}
                className="p-2"
                src="./assets/icon-cross.svg"
              ></img>
            </div>
          ))}
          <div className="flex flex-col mt-1">
            <button
              className="bg-red-500 rounded-2xl h-10"
              onClick={() => addNewColumn()}
            >
              + Add New Column
            </button>
            <button
              className="bg-red-500 mt-4 rounded-2xl h-10"
              onClick={() => saveChanges(localNewBoardForm)}
            >
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditBoardDialog;
