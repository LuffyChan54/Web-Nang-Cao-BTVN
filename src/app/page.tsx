"use client";
import Board from "@/components/board/Board";
import { useState } from "react";
import Styles from "./page.module.scss";
import HistoryObjectType from "@/types/HistoryObjectType";
import findColRow from "@/utils/findColRow";
const Page = () => {
  const [history, setHistory] = useState<HistoryObjectType[]>([
    { historyArray: Array(9).fill(null) },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [statusSort, setStatusSort] = useState("ascending");
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].historyArray;

  const handlePlay = (nextSquares: String[], index: number) => {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { historyArray: nextSquares, currPosition: findColRow(index) },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((his, move) => {
    let description;
    if (move > 0) {
      if (move == currentMove) {
        description =
          "You are at move #" +
          move +
          ` (${his.currPosition?.row}, ${his.currPosition?.col})`;
        return (
          <li key={move}>
            <div onClick={() => jumpTo(move)}>{description}</div>
          </li>
        );
      } else {
        description =
          "Go to move #" +
          move +
          ` (${his.currPosition?.row}, ${his.currPosition?.col})`;
      }
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = moves.slice().sort((elLI1, elLI2) => {
    if (elLI1.key == null || elLI2.key == null) {
      return -1;
    } else {
      if (statusSort == "ascending") {
        return +elLI1.key - +elLI2.key;
      } else {
        return +elLI2.key - +elLI1.key;
      }
    }
  });

  const handleSort = () => {
    setStatusSort(statusSort == "ascending" ? "descending" : "ascending");
  };

  return (
    <div className={Styles.page}>
      <div className="page_board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares || []}
          onPlay={handlePlay}
        />
      </div>
      <div className="page_info">
        <button className="btn_sort" onClick={() => handleSort()}>
          Change to {statusSort == "ascending" ? "descending" : "ascending"}
        </button>
        <div className="wrap_moves">
          <ul>{sortedMoves}</ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
