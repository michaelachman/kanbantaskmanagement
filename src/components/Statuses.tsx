import { useEffect } from "react";
import { Status } from "../crud"
import { getTasksByStatusAndBoardId } from "../db";


export type StatusesProps = {
    activeBoardStatusesArray: Status[] | null
    openEditBoard: () => void; 
}




export const Statuses = (props: StatusesProps) => {


    useEffect(() => getTasksByStatusAndBoardId(), [props.activeBoardStatusesArray])

    return (
        props.activeBoardStatusesArray?.length === 0 ? 
        <div className="h-full mt-5 flex flex-col items-center justify-center pb-32 bg-[#F4F7FD]">
    <p className="text-[#828FA3] font-bold">This board is empty. Create a new column to get started.</p>
    <button
      className="bg-[#635FC7] text-white mt-4 p-3 rounded-3xl text-sm"
      onClick={() => props.openEditBoard()}
    >
      +Add New Column
    </button>
  </div> 
  : 
    <div className="h-full w-full flex flex-row bg-red-500 pt-6 pl-4 text-left overflow-x-scroll flex-nowrap">
        {props.activeBoardStatusesArray?.map((status) => (
            <div className="column min-w-[75%] min-h-[88px] mr-6 mb-5">
         <h1 className="column-title pb-6 text-lg">{status.statusName} (ilosc taskow)</h1>

         </div>
        ))}
    </div>
    )
}