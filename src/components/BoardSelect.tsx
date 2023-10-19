import { Dialog, Menu } from "@headlessui/react";
import { Board } from "../App"
import { ReactComponent as IconBoard } from "../../assets/icon-board.svg";

export type BoardSelectProps = {
    boardsArray: Board[];
    activeBoard: number | null;
    selectBoardIsOpen: boolean,
    closeBoardSelect: () => void;
    changeBoard: (boardId: number) => void;
}


export const BoardSelect = (props: BoardSelectProps) => {

    // return (
    //     <Menu>

    //     </Menu>
    // )

    return (
        <Dialog className="relative z-50" open={props.selectBoardIsOpen} onClose={() => props.closeBoardSelect()}>
        <div className="fixed inset-0 flex items-center justify-center mx-4 px-6">
      <Dialog.Panel className="bg-white border rounded-md shadow-lg pr-4 w-5/6">
        <Dialog.Title className="text-sm text-[#828FA3] pl-4 pt-3 font-semibold">ALL BOARDS ({props.boardsArray.length})</Dialog.Title>
        <div className="mt-3">
        {props.boardsArray.map((board) => (
            <div className={`pl-4 py-2 flex items-center w-full rounded-r-xl ${board.id === props.activeBoard ? `bg-purple-500 text-white` : `bg-white text-black`}`}
            onClick={() => props.changeBoard(board.id)}
            >
                <IconBoard />
                <p className="pl-2">{board?.boardName}</p>
            </div>
           
        ))}
        </div>
        <p className="pl-4 pb-2 font-semibold">+Create new board</p>
        
       
      </Dialog.Panel>
      </div>
    </Dialog>
        
    )
}