import { useEffect, useState } from "react";
import { Board, Status } from "../crud";
import { Dropdown } from "./Dropdown";

export type BoardsNavbarProps = {
  boardsArray: Board[] | null;
  activeBoard: number | null;
  mobile: boolean;
  changeBoard: (boardId: number) => void;
  openNewTaskDialog: () => void;
  activeBoardStatusesArray: Status[] | null;
  openCreateNewBoardDialog: () => void;
  openEditBoard: () => void;
  darkTheme: boolean;
  changeTheme: () => void;
  dropdownSidebar: boolean;
  dropdownSidebarToggle: () => void;
};

export const BoardsNavbar = (props: BoardsNavbarProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (props.activeBoardStatusesArray?.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [props.activeBoardStatusesArray]);

  const imgSrcDependingOnTheme = props.darkTheme ? "./assets/logo-light.svg" : "./assets/logo-dark.svg"

  return (
    <div className={`fixed top-0 h-16 w-full flex flex-row ${props.darkTheme ? `bg-[#2B2C37] text-white` : `bg-white`}`}>
      <div className="flex p-4 pr-3 justify-center place-self-center md:hidden">
      <img src="./assets/logo-mobile.svg" className="flex h-[75%] w-[100%]"></img>
      </div>
      <div className="hidden md:flex md:w-[21%] md:place-self-center md:pl-4">
      <img className="md:w-36 md:h-6" src={imgSrcDependingOnTheme}></img>
      </div>
      {props.boardsArray === null && props.activeBoard === null ? (
        <div
          className="flex flex-row md:border-l-2 md:border-gray-100"
          onClick={() => props.openCreateNewBoardDialog()}
        >
          <h1 className="pr-1 self-center">+ Create New Board</h1>
        </div>
      ) : (
        <div className="flex flex-row md:border-l-2 md:border-gray-100">
          <Dropdown
            boardsArray={props.boardsArray}
            activeBoard={props.activeBoard}
            changeBoard={props.changeBoard}
            openCreateNewBoardDialog={props.openCreateNewBoardDialog}
            darkTheme={props.darkTheme}
            changeTheme={props.changeTheme}
            dropdownSidebar={props.dropdownSidebar}
            dropdownSidebarToggle={props.dropdownSidebarToggle}
          />
        </div>
      )}

          <div className="flex ml-auto">
      <button
        onClick={() => props.openNewTaskDialog()}
        disabled={buttonDisabled}
        className={`flex md:hidden ml-auto mr-4 rounded-2xl w-12 h-8 text-white font-bold text-xl justify-center place-self-center ${buttonDisabled ? `bg-purple-300` : `bg-[#635FC7]`}`}
      > 
        +
      </button>
      <button
        onClick={() => props.openNewTaskDialog()}
        disabled={buttonDisabled}
        className={`hidden md:flex ml-auto mr-4 rounded-3xl w-48 h-11 text-white font-bold text-base justify-center place-self-center items-center ${buttonDisabled ? `bg-purple-300` : `bg-[#635FC7]`}`}
      > 
        + Add New Task
      </button>
      <img
        onClick={() => props.openEditBoard()}
        src="./assets/icon-vertical-ellipsis.svg"
        className="flex ml-auto h-4 self-center pr-4"
      ></img>
      </div>
    </div>
  );
};
export default BoardsNavbar;
