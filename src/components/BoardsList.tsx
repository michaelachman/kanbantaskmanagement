
export type BoardsListProps = {
    activeBoard: number,
    boardName: string,
    boardKey: number
}

export const BoardsList = (props: BoardsListProps) => {

    return (
        <div>{props.boardName}</div>
        
        )
    
}

export default BoardsList