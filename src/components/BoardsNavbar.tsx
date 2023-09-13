import { useState } from "react";
import { BoardType } from "../App";
import { BoardSelect } from "./BoardSelect";
// import BoardsList from "./BoardsList";


export type BoardsNavbarProps = {
  boardsArray: BoardType[]
  activeBoard: number;
  mobile: boolean;
  addNewTask: () => void;
};

export const BoardsNavbar = (props: BoardsNavbarProps) => {

  const [selectBoardIsOpen, setSelectBoardIsOpen] = useState(false)

  function selectBoard() {
    setSelectBoardIsOpen(true)
  }

  function closeBoardSelect() {
    setSelectBoardIsOpen(false)
  }

  return (
    <div className="fixed bg-white w-full p-4 flex flex-row top-0">
      <img src="./assets/logo-mobile.svg" className="pr-4"></img>
      <div className="flex flex-row" onClick={selectBoard}>
      <h1 className="pr-1 self-center"> {props.boardsArray[props.activeBoard].boardName} </h1>
      <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] flex self-center"></img>
      <BoardSelect selectBoardIsOpen={selectBoardIsOpen} boardsArray={props.boardsArray} activeBoard={props.activeBoard} closeBoardSelect={closeBoardSelect}/>
      </div>
      <div onClick={props.addNewTask} className="ml-auto flex border w-11 h-8 content-center rounded-2xl bg-purple-100">+</div>
      <img src="./assets/icon-vertical-ellipsis.svg" className="flex ml-auto h-4 self-center"></img>
    </div>
  )
      

};
export default BoardsNavbar;
