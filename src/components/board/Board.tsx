import Square from "@/components/square/Square";
import calculateWinner from "@/utils/calculateWinner";
import React, { Key, useState } from "react";
import Style from "./Board.module.scss";

interface BoardProps {
  xIsNext: boolean;
  squares: (String | null)[];
  onPlay: Function;
}

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (event: React.MouseEvent, i: number) => {
    event.preventDefault();
    if (calculateWinner(squares)?.square || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  };

  let isEndNoWin = !squares.includes(null) ? true : false;

  const winner = calculateWinner(squares)?.square;
  let status;
  if (isEndNoWin && winner == undefined) {
    status = "No winner!";
  } else {
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  const positions = calculateWinner(squares)?.positions;

  const renderSquare = () => {
    let result = [];
    const objectRS: Record<string, React.ReactElement[]> = squares.reduce(
      (prev, curr, index) => {
        const actualIndex: string = Math.floor(index / 3).toString();

        const quareElement: React.ReactElement = (
          <Square
            key={index}
            isWinProp={positions?.includes(index) ? true : false}
            value={curr}
            onSquareClick={(event) => handleClick(event, index)}
          />
        );

        if (prev.hasOwnProperty(actualIndex)) {
          prev[actualIndex].push(quareElement);
        } else {
          prev[actualIndex] = [quareElement];
        }

        return prev;
      },
      {} as Record<string, React.ReactElement[]>
    );
    result = Object.values(objectRS);
    return result;
  };

  return (
    <div className={Style.wrapStatus}>
      <div
        className={`status ${
          status == "No winner!"
            ? "no_winner"
            : status.includes("Winner")
            ? "winner"
            : ""
        }`}
      >
        {status}
      </div>
      <table className="table">
        <tbody>
          {renderSquare().map((arrElement) => (
            <tr key={Math.random()} className={Style.boardrow}>
              {...arrElement}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
