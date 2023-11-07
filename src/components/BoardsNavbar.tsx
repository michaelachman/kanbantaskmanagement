import { useEffect, useState } from "react";
import { BoardSelect } from "./BoardSelect";
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
};

export const BoardsNavbar = (props: BoardsNavbarProps) => {
  const [buttonAvailability, setButtonAvailability] = useState(false);

  useEffect(() => {
    if (props.activeBoardStatusesArray === null) {
      setButtonAvailability(true);
    } else {
      setButtonAvailability(false);
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

          {/* <h1 className="pr-1 self-center">{boardNameFunction()}</h1> */}

          {/* {selectBoardIsOpen ? 
          <img src="./assets/icon-chevron-up.svg" className="w-[8px] h-[7px] flex self-center"></img>
           : 
          <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] flex self-center"></img>} */}
        </div>
      )}

      {/* {props.boardsArray !== null ? 
      (<BoardSelect selectBoardIsOpen={selectBoardIsOpen} boardsArray={props.boardsArray} activeBoard={props.activeBoard} closeBoardSelect={closeBoardSelect} changeBoard={props.changeBoard}/>)
      :
       undefined} */}

      <button
        onClick={() => props.openNewTaskDialog()}
        disabled={buttonAvailability}
        className="flex ml-auto border rounded-2xl w-11 h-8 bg-[#635FC7] text-white font-bold text-xl justify-center"
      >
        +
      </button>
      <img
        src="./assets/icon-vertical-ellipsis.svg"
        className="flex ml-auto h-4 self-center"
      ></img>
    </div>
  );
};
export default BoardsNavbar;
