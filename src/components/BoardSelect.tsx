import { Dialog } from "@headlessui/react";
import { Board } from "../App"
import { ReactComponent as IconBoard } from "../../assets/icon-board.svg";

export type BoardSelectProps = {
    boardsArray: Board[];
    activeBoard: number | null;
    selectBoardIsOpen: boolean,
    closeBoardSelect: () => void;
}


export const BoardSelect = (props: BoardSelectProps) => {
    return (
        <Dialog className="relative z-50" open={props.selectBoardIsOpen} onClose={() => props.closeBoardSelect()}>
        <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
      <Dialog.Panel className="border rounded-md shadow-lg pr-4 w-5/6">
        <Dialog.Title className="text-sm text-[#828FA3] pl-4 pt-3 font-semibold">ALL BOARDS ({props.boardsArray.length})</Dialog.Title>
        
        {props.boardsArray.map((boardname) => (
            <div className="bg-purple-500 mt-3 pl-4 flex items-center w-full text-white rounded-r-xl">
                <IconBoard />
                <p className="pl-2">{boardname?.boardName}</p>
                
            </div>
        ))}

<p>+ create new board</p>
        
       
      </Dialog.Panel>
      </div>
    </Dialog>
        
    )
}