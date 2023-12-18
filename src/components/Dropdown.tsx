import { Menu, Switch } from "@headlessui/react";
import { Board } from "../crud";
import { ReactComponent as IconBoard } from "../../assets/icon-board.svg";
import { useState } from "react";

export type DropdownProps = {
  boardsArray: Board[] | null;
  activeBoard: number | null;
  changeBoard: (boardId: number) => void;
  openCreateNewBoardDialog: () => void;
  darkTheme: boolean;
  changeTheme: () => void;
  dropdownSidebar: boolean;
  dropdownSidebarToggle: () => void;
};

export const Dropdown = (props: DropdownProps) => {
  const [chevronDirection, setChevronDirection] = useState(true);
  // const [checkedDark, setCheckedDark] = useState(true);


  function boardNameFunction() {
    const foundBoard = props.boardsArray?.find(
      (board) => board.id === props.activeBoard
    );
    return foundBoard?.boardName;
  }

  return (
    <Menu>
      {() => (
      <>
        <Menu.Button>
          
        <div
          className="flex md:pl-6"
          onClick={() => {setChevronDirection(!chevronDirection);
          props.dropdownSidebarToggle()
          }}
        >
          <h1 className="pr-2 font-bold">{boardNameFunction()}</h1>
          <img
            src={
              chevronDirection
                ? "./assets/icon-chevron-down.svg"
                : "./assets/icon-chevron-up.svg"
            }
            className="w-[8px] h-[7px] self-center md:hidden"
          ></img>
        </div>
      </Menu.Button>
      {props.dropdownSidebar && (
        <div className="fixed top-20 left-20 w-9/12 mb-4 md:flex md:top-16 md:left-0 md:w-[26%] md:h-[95%]">
        <Menu.Items static className="dark:bg-[#2B2C37] bg-white rounded-md md:rounded-none shadow-lg pr-4 w-10/12 pb-1">
          <h1 className="flex text-xs text-[#828FA3] pl-4 py-3 font-semibold">
            ALL BOARDS ({props.boardsArray?.length})
          </h1>
          {props.boardsArray?.map((board) => (
            <Menu.Item>
              <div
                className={`pl-4 py-2 flex items-center w-full rounded-r-3xl font-medium text-sm hover:bg-[#A8A4FF] hover:text-white cursor-pointer ${
                  board.id === props.activeBoard
                    ? `bg-[#635FC7] text-white`
                    : `text-[#828FA3] `
                }`}
                onClick={() => {
                  props.changeBoard(board.id);
                  setChevronDirection(!chevronDirection);
                }}
              >
                <IconBoard />
                <p className="pl-2">{board?.boardName}</p>
              </div>
            </Menu.Item>
          ))}
          <div
            onClick={() => props.openCreateNewBoardDialog()}
            className="pl-4 py-2 flex items-center w-full rounded-r-xl font-medium text-sm text-[#635FC7] cursor-pointer"
          >
            <IconBoard />
            <p className="pl-2">+ Create New Board</p>
          </div>
          <div className="flex md:bottom-20 md:fixed md:w-[16%] m-4 mr-0 py-2 justify-center rounded-md dark:bg-[#20212C] bg-gray-100">
            <img className="mr-4 object-scale-down" src="./assets/icon-light-theme.svg"></img>
            <Switch
              checked={props.darkTheme}
              onChange={() => {
                props.changeTheme()
                // setCheckedDark((previousState) => !previousState)
              }}
              className="bg-[#635FC7] hover:bg-[#A8A4FF] relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className="dark:translate-x-6 translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
            <img className="ml-4 object-scale-down" src="./assets/icon-dark-theme.svg"></img>
          </div>
        </Menu.Items>
      </div>
      )}
      </>
      )}
    </Menu>
  );
};
