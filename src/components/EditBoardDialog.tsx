import { Dialog } from "@headlessui/react";
import { BoardType, Column } from "../App";
import { useEffect, useState } from "react";

export type EditBoardDialogType = {
  editBoardIsOpen: boolean;
  closeEditBoard: () => void;
  boardsArray: BoardType[];
  boardColumnsArray: Column[];
  activeBoard: number;
  boardName: string;
  saveChanges: (columnsArray: Column[], boardName: string) => void;
};

// localBoardsArray[props.activeBoard].columns?.push({...previousLocalBoardArray, columnName: "New Board"})

export const EditBoardDialog = (props: EditBoardDialogType) => {
  const [columnsArray, setColumnsArray] = useState(props.boardColumnsArray);
  const [boardName, setBoardName] = useState(props.boardName)

  function deleteColumn(indexToDelete: number) {
    console.log(indexToDelete);
    setColumnsArray((previousState) => {
      return previousState.filter((item, index) => index !== indexToDelete);
    });
  }

  function addNewColumn() {
    setColumnsArray((previousColumnsArray) => {
      return [...previousColumnsArray, { columnName: "New column" }];
    });
  }

  function handleBoardNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setBoardName((previousBoardName) => {
      previousBoardName = event.target.value
      return previousBoardName
    })
  }

  function handleColumnNameInput(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    setColumnsArray((previousColumnArray) => {
      previousColumnArray[index].columnName = event.target.value
      console.log(previousColumnArray)
      return [...previousColumnArray]
    })
  }

  useEffect(() => console.log(columnsArray), [columnsArray])

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
              value={boardName}
            ></input>
          </div>
          <div className="mt-3">
            <label className="text-gray-500 w-full font-semibold">
              Board Columns
            </label>
          </div>
          {columnsArray.map((column, index) => (
            <div key={index} className="flex">
              <input
                className="bg-purple-500 w-full border rounded-md p-1"
                type="text"
                value={column.columnName}
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
              className="bg-red-500 rounded-2xl"
              onClick={() => addNewColumn()}
            >
              + Add New Column
            </button>
            <button
              className="bg-red-500 mt-1 rounded-2xl"
              onClick={() => props.saveChanges(columnsArray, boardName)}
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
