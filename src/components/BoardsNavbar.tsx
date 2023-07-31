import { BoardType } from "../App";
// import BoardsList from "./BoardsList";


export type BoardsNavbarProps = {
  boardsArray: BoardType[]
  activeBoard: number;
  selectBoard: () => void;
  mobile: boolean;
  // newBoardDialog: () => void;
};

export const BoardsNavbar = (props: BoardsNavbarProps) => {
  return (
    // props.mobile ? (
    <div className="w-full p-4 flex flex-row">
      <img src="./assets/logo-mobile.svg" className="pr-4"></img>
      <div className="flex flex-row" onClick={props.selectBoard}>
      <h1 className="pr-1 self-center"> {props.boardsArray[props.activeBoard].boardName} </h1>
      <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] flex self-center"></img>
      </div>
      <div className="ml-auto flex border w-11 h-8 content-center rounded-2xl bg-purple-100">+</div>
      <img src="./assets/icon-vertical-ellipsis.svg" className="flex ml-auto h-4 self-center"></img>
    </div>
  )
    // ) : (
      // <div className="h-full p-0 flex flex-col w-64">
      //   <img src="./assets/logo-dark.svg" className="mr-0 h-6 w-36"></img>
      //   <p className="text-start">ALL BOARDS ({props.boardsArray.length})</p>
      //   <div className="text-start">
      //   {props.boardsArray.map((board) => (
      //     <BoardsList activeBoard={props.activeBoard} boardName={board.boardName} boardKey={board.key} />
      //   ))}
      //   </div>
      //   <p className="text-start" onClick={props.newBoardDialog}>+ Create New Board</p>
        {/* <div className="flex flex-row" onClick={props.selectBoard}> */}
        {/* <h1 className=""> {props.initialBoards[props.activeBoard - 1].boardName} </h1> */}
        {/* <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] flex self-center"></img> */}
        {/* </div> */}
        {/* <div className="ml-auto flex border w-11 h-8 content-center rounded-2xl bg-purple-100">+</div> */}
        {/* <img src="./assets/icon-vertical-ellipsis.svg" className="flex ml-auto h-4 self-center"></img> */}
      // </div>
      

  
};
export default BoardsNavbar;
