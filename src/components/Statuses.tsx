import { Status } from "../crud"


export type StatusesProps = {
    filteredStatuses: Status[]
}



export const Statuses = (props: StatusesProps) => {
    return (
    <div className="h-full w-full flex flex-row bg-red-500 pt-6 pl-4 text-left overflow-x-scroll flex-nowrap">
        {props.filteredStatuses.map((status) => (
            <div className="column min-w-[75%] min-h-[88px] mr-6 mb-5">
         <h1 className="column-title pb-6 text-lg">{status.statusName} (ilosc taskow)</h1>
         </div>
        ))}
    </div>
    )
}