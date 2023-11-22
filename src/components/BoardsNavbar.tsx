import { useEffect, useState } from "react";
import { Board, Status } from "../crud";
import { Dropdown } from "./Dropdown";
// import BoardsList from "./BoardsList";

export type BoardsNavbarProps = {
  boardsArray: Board[] | null;
  activeBoard: number | null;
  mobile: boolean;
  changeBoard: (boardId: number) => void;
  openNewTaskDialog: () => void;
  activeBoardStatusesArray: Status[] | null;
  openCreateNewBoardDialog: () => void;
  openEditBoard: () => void;
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

  return (
    <div className="fixed bg-white w-full p-4 flex flex-row top-0">
      <img src="./assets/logo-mobile.svg" className="pr-4"></img>
      {props.boardsArray === null && props.activeBoard === null ? (
        <div
          className="flex flex-row"
          onClick={() => props.openCreateNewBoardDialog()}
        >
          <h1 className="pr-1 self-center">+ Create New Board</h1>
        </div>
      ) : (
        <div className="flex flex-row">
          <Dropdown
            boardsArray={props.boardsArray}
            activeBoard={props.activeBoard}
            changeBoard={props.changeBoard}
            openCreateNewBoardDialog={props.openCreateNewBoardDialog}
          />

          {/* {selectBoardIsOpen ? 
          <img src="./assets/icon-chevron-up.svg" className="w-[8px] h-[7px] flex self-center"></img>
           : 
          <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] flex self-center"></img>} */}
        </div>
      )}


      <button
        onClick={() => props.openNewTaskDialog()}
        disabled={buttonDisabled}
        className={`flex ml-auto border rounded-2xl w-11 h-8 text-white font-bold text-xl justify-center ${buttonDisabled ? `bg-purple-200` : `bg-[#635FC7]`}`}
      >
        +
      </button>
      <img
        onClick={() => props.openEditBoard()}
        src="./assets/icon-vertical-ellipsis.svg"
        className="flex ml-auto h-4 self-center"
      ></img>
    </div>
  );
};
export default BoardsNavbar;
