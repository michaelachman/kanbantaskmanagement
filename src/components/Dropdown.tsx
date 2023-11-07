import { Menu } from "@headlessui/react";
import { Board } from "../crud";
import { ReactComponent as IconBoard } from "../../assets/icon-board.svg";

export type DropdownProps = {
  boardsArray: Board[] | null;
  activeBoard: number | null;
  changeBoard: (boardId: number) => void;
  openCreateNewBoardDialog: () => void;
};

export const Dropdown = (props: DropdownProps) => {

  function boardNameFunction() {
    const foundBoard = props.boardsArray?.find(
      (board) => board.id === props.activeBoard
    );
    return foundBoard?.boardName;
  }

  return (
    <Menu>
      <Menu.Button>
        <div className="flex">
        <h1 className="pr-2 font-bold">{boardNameFunction()}</h1>
        <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] self-center"></img>
        </div>
        </Menu.Button>
      
      <div className="fixed top-20 left-20 w-9/12">
        <Menu.Items className="bg-white rounded-md shadow-lg pr-4 w-10/12">
          <h1 className="flex text-xs text-[#828FA3] pl-4 py-3 font-semibold">
            ALL BOARDS ({props.boardsArray?.length})
          </h1>
          {props.boardsArray?.map((board) => (
            <Menu.Item>
              <div
                className={`pl-4 py-2 flex items-center w-full rounded-r-xl font-medium text-sm ${
                  board.id === props.activeBoard
                    ? `bg-[#635FC7] text-white`
                    : `bg-white text-[#828FA3] `
                }`}
                onClick={() => props.changeBoard(board.id)}
              >
                <IconBoard />
                <p className="pl-2">{board?.boardName}</p>
              </div>
            </Menu.Item>
          ))}
          <div onClick={() => props.openCreateNewBoardDialog()} className="pl-4 py-2 flex items-center w-full rounded-r-xl font-medium text-sm text-[#635FC7]">
            <IconBoard />
            <p className="pl-2">+ Create New Board</p>
          </div>
        </Menu.Items>
      </div>
    </Menu>
  );
};
