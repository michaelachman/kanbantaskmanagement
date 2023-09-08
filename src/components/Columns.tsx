import { BoardType } from "../App"

export type ColumnsProps = {
    boardDetails: BoardType
}

export const Columns = (props: ColumnsProps) => {
    return (<div className="h-full flex flex-row bg-[#F4F7FD]">
        {props.boardDetails.columns?.map((iteration) => (
            <div className="w-1/5">{iteration.columnName}</div>
        ))}
        </div>
    )
}