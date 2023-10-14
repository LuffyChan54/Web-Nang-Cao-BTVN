"use client";
import { MouseEventHandler, useState } from "react";
import Styles from "./Square.module.scss";
interface SquareProps {
  value: String | null;
  isWinProp: boolean;
  onSquareClick: MouseEventHandler<HTMLTableCellElement>;
}

const Square = ({ value, isWinProp, onSquareClick }: SquareProps) => {
  // const [isWin, setIsWin] = useState(false);
  return (
    <td
      id={isWinProp ? "win_square" : ""}
      className={Styles.square}
      onClick={onSquareClick}
    >
      {value}
    </td>
  );
};

export default Square;
