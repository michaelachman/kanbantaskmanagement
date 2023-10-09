import { useState } from "react";
import { BoardSelect } from "./BoardSelect";
import { Board } from "../crud";
// import BoardsList from "./BoardsList";


export type BoardsNavbarProps = {
  boardsArray: Board[] | null;
  activeBoard: number | null;
  mobile: boolean;
  createNewBoard: () => void;
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
        {props.boardsArray === null && props.activeBoard === null ?
         (<div className="flex flex-row" onClick={props.createNewBoard}>
         <h1 className="pr-1 self-center">+ Create New Board</h1>
         </div>) 
         :
          (<div className="flex flex-row" onClick={selectBoard}>
          <h1 className="pr-1 self-center">{props.boardsArray?.[props.activeBoard === null ? 0 : props.activeBoard].boardName} </h1>
          {selectBoardIsOpen ? 
          <img src="./assets/icon-chevron-up.svg" className="w-[8px] h-[7px] flex self-center"></img>
           : 
          <img src="./assets/icon-chevron-down.svg" className="w-[8px] h-[7px] flex self-center"></img>}
          </div>)}
      
      
      {props.boardsArray !== null ? 
      (<BoardSelect selectBoardIsOpen={selectBoardIsOpen} boardsArray={props.boardsArray} activeBoard={props.activeBoard} closeBoardSelect={closeBoardSelect}/>)
      :
       undefined}
      
      
      <div className="ml-auto flex border w-11 h-8 content-center rounded-2xl bg-purple-100 justify-center">+</div>
      <img src="./assets/icon-vertical-ellipsis.svg" className="flex ml-auto h-4 self-center"></img>
    </div>
  )
      

};
export default BoardsNavbar;
