import { Dialog } from "@headlessui/react";
import { BoardType } from "../App";
import { useEffect } from "react";

export type EditBoardDialogType = {
    editBoardIsOpen: boolean,
    closeEditBoard: () => void,
    boardsArray: BoardType[]
    boardColumnsArray: Column[],
    activeBoard: number,
    addNewColumn: () => void
    handleBoardNameInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    saveChanges: (localBoardsArray: BoardType[]) => void
}

type Column = {
  columnName: string,
  tasks?: {
    taskName: string,
    subtasks: {
      taskName: string;
      subtasks: {
        subtaskName: string;
        subtaskContent: string;
      }}
  }
}

// localBoardsArray[props.activeBoard].columns?.push({...previousLocalBoardArray, columnName: "New Board"})

export const EditBoardDialog = (props: EditBoardDialogType) => {

  // const [localBoardsArray, setLocalBoardsArray] = useState(props.boardsArray)

  // function addNewColumn() {
  //   setLocalBoardsArray((previousLocalBoardArray) => {
  //   previousLocalBoardArray[props.activeBoard].columns?.push({columnName: ""})
  //   console.log(localBoardsArray)
  //   return localBoardsArray
  // })
  // }

  function deleteColumn() {
    
  }

  useEffect(()=> console.log(props.boardColumnsArray), [props.boardColumnsArray])


  return (
    
    <Dialog className="relative z-50" open={props.editBoardIsOpen} onClose={() => props.closeEditBoard()}>
        <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
      <Dialog.Panel className="border p-4 rounded-md shadow-lg">
        <Dialog.Title className="text-2xl">Edit Board</Dialog.Title>
        <div className="mt-3">
        <label className="text-gray-500 w-full font-semibold">Board Name</label>
        <input className="bg-green-500 w-full rounded-md p-1" type="text" onChange={(event) => props.handleBoardNameInput(event)} defaultValue={props.boardsArray[props.activeBoard].boardName}></input>
        </div>
        <div className="mt-3">
        <label className="text-gray-500 w-full font-semibold">Board Columns</label>
        </div>
        {props.boardColumnsArray.map((column) => (
          <div className="flex">
            <input className="bg-purple-500 w-full border rounded-md p-1" type="text" defaultValue={column.columnName}></input>
            <img onClick={() => deleteColumn()} className="p-2" src="./assets/icon-cross.svg"></img>
          </div>
        ))}
        <div className="flex flex-col mt-1">
        <button className="bg-red-500 rounded-2xl" onClick={() => props.addNewColumn()}>+ Add New Column</button>
        <button className="bg-red-500 mt-1 rounded-2xl" onClick={() => props.closeEditBoard()}>Save Changes</button>
        </div>
      </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditBoardDialog;
