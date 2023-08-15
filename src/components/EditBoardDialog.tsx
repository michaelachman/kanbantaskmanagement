import { Dialog } from "@headlessui/react";
import { BoardType } from "../App";

export type EditBoardDialogType = {
    editBoardIsOpen: boolean,
    closeEditBoard: () => void,
    boardsArray: BoardType[],
    activeBoard: number,
    addNewColumn: () => void
}

export const EditBoardDialog = (props: EditBoardDialogType) => {
  return (
    
    <Dialog className="relative z-50" open={props.editBoardIsOpen} onClose={() => props.closeEditBoard()}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="border">
        <Dialog.Title className="text-2xl">Edit Board</Dialog.Title>

        <label className="bg-red-500 text-gray-500 w-full">Board Name</label>
        <input className="bg-green-500 w-full" type="text" value={props.boardsArray[props.activeBoard].boardName}></input>

        <label className="text-gray-500 w-full ">Board Columns</label>
        {props.boardsArray[props.activeBoard].columns?.map((column) => (
          <div>
            <input className="bg-purple-500 w-full" type="text" value={column.columnName}></input>
            <img src="./assets/icon-cross.svg"></img>
          </div>
        ))}

        <button className="bg-red-500" onClick={() => props.addNewColumn()}>+ Add New Column</button>
        <button onClick={() => props.closeEditBoard()}>Save Changes</button>
      </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditBoardDialog;
