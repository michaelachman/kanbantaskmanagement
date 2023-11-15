import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Status } from "../crud";

export type BoardForm = {
  boardName: string,
  statusesArray: Partial<Status>[]
}


export type EditBoardDialogProps = {
  activeBoard: number;
  editBoardIsOpen: boolean,
  closeEditBoard: () => void
  boardName: string;
  activeBoardStatusesArray: Status[]
  saveEditBoardChanges: (localEditBoardForm: BoardForm, boardId: number) => void
}

export const EditBoardDialog = (props: EditBoardDialogProps) => {

  const initialNewBoardForm: BoardForm = {
      boardName: "",
      statusesArray: []
  }


  const [localEditBoardForm, setEditBoardForm] = useState(initialNewBoardForm)

  useEffect(() => {
    setEditBoardForm((previousState) => {
      return {...previousState, statusesArray: props.activeBoardStatusesArray}
    })
  }, [props.activeBoardStatusesArray])

  useEffect(() => {
    setEditBoardForm((previousState) => {
      return {...previousState, boardName: props.boardName}
    })
  }, [props.boardName])

  function handleBoardNameInput(event: React.ChangeEvent<HTMLInputElement>) {
      setEditBoardForm((previousState) => {
          return {...previousState, boardName: event.target.value}
      })
  }

  function handleColumnNameInput(event: React.ChangeEvent<HTMLInputElement>, index: number){
      setEditBoardForm((previousState) => {
          previousState.statusesArray[index].statusName = event.target.value
          return {...previousState}
      })
  }

  function deleteColumn(indexToHandle: number) {
      setEditBoardForm((previousState) => {
          const newArray = previousState.statusesArray.filter((element, index) => index !== indexToHandle)
          return {...previousState, statusesArray: newArray}
      })
  }

  function addNewColumn(){
      setEditBoardForm((previousState) => {
          const newStatus = {
              statusName: ""
          }
          return {...previousState, statusesArray: [...previousState.statusesArray, newStatus]}
      })
  }

  return (
    <Dialog
      className="relative z-50"
      open={props.editBoardIsOpen}
      onClose={() => props.closeEditBoard()}
    >
      <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
        <Dialog.Panel className="bg-white border p-4 rounded-md shadow-lg">
          <Dialog.Title className="text-2xl">Edit Board</Dialog.Title>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Board Name
            </label>
            <input
              className="bg-green-500 w-full rounded-md p-1"
              type="text"
              onChange={(event) => handleBoardNameInput(event)}
              value={localEditBoardForm.boardName}
            ></input>
          </div>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Board Columns
            </label>
          </div>
          {localEditBoardForm.statusesArray.map((column, index) => (
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
              onClick={() => props.saveEditBoardChanges(localEditBoardForm, props.activeBoard)}
            >
              Save Changes
            </button>
            <button
              onClick={() => props.closeEditBoard()}
              className="mt-4 py-1 rounded-2xl bg-purple-100 w-full text-[#635FC7] font-semibold"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditBoardDialog;
