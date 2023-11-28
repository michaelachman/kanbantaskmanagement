import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Board, Status } from "../crud";


export type BoardForm = {
  boardName: string,
  statusesArray: Partial<Status>[]
}


export type EditBoardDialogProps = {
  boardsArray: Board[] | null;
  activeBoard: number;
  editBoardIsOpen: boolean,
  closeEditBoard: () => void
  activeBoardStatusesArray: Status[]
  saveEditBoardChanges: (localEditBoardForm: BoardForm, boardId: number) => void
  darkTheme: boolean;
}

export const EditBoardDialog = (props: EditBoardDialogProps) => {


  function boardNameFunction() {
    const foundBoard = props.boardsArray?.find(
      (board) => board.id === props.activeBoard
    );
    return foundBoard?.boardName;
  }

  

  const initialNewBoardForm: BoardForm = {
      boardName: boardNameFunction() as string,
      statusesArray: []
  }


  const [localEditBoardForm, setEditBoardForm] = useState(initialNewBoardForm)

  useEffect(() => {
    setEditBoardForm((previousState) => {
      return {...previousState, statusesArray: props.activeBoardStatusesArray}
    })
  }, [props.activeBoardStatusesArray])




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
        <Dialog.Panel className={`${props.darkTheme ? `bg-[#2B2C37]` : `bg-white`} p-4 rounded-md shadow-lg`}>
          <Dialog.Title className={`${props.darkTheme ? `text-white` : `text-black`} text-2xl`}>Edit Board</Dialog.Title>
          <div className="mt-3">
            <label className={`${props.darkTheme ? `text-white` : `text-gray-500`} w-full font-semibold`}>
              Board Name
            </label>
            <input
              className={`${props.darkTheme ? `bg-[#2B2C37] text-white border-2 border-gray-700` : `bg-white border border-gray-300`}  mt-1 w-full rounded-md px-3 py-1 text-sm`}
              type="text"
              onChange={(event) => handleBoardNameInput(event)}
              value={localEditBoardForm.boardName}
            ></input>
          </div>
          <div className="mt-3 mb-1">
            <label className={`${props.darkTheme ? `text-white` : `text-gray-500`} w-full font-semibold`}>
              Board Columns
            </label>
          </div>
          {localEditBoardForm.statusesArray.map((column, index) => (
            <div key={index} className="flex">
              <input
                className={`mb-2 w-full  rounded-md p-1 ${props.darkTheme ? `bg-[#2B2C37] text-white border-2 border-gray-700` : `bg-white border border-gray-300`} px-3 py-1 text-sm`}
                type="text"
                value={column.statusName}
                onChange={(event) => handleColumnNameInput(event, index)}
              ></input>
              <img
                onClick={() => deleteColumn(index)}
                className="pb-3 ml-4 object-scale-down self-center justify-center items-center"
                src="./assets/icon-cross.svg"
              ></img>
            </div>
          ))}
          <div className="flex flex-col mt-3">
            <button
              className="bg-purple-100 text-[#635FC7] font-bold text-sm rounded-3xl h-9"
              onClick={() => addNewColumn()}
            >
              + Add New Column
            </button>
            <button
              className="bg-[#635FC7] text-white font-semibold text-sm mt-4 rounded-3xl h-9"
              onClick={() => props.saveEditBoardChanges(localEditBoardForm, props.activeBoard)}
            >
              Save Changes
            </button>
            <button
              onClick={() => props.closeEditBoard()}
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

export default EditBoardDialog;
