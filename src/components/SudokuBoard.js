import React, { Component } from "react";
import Result from "./Result";
import SudokuFeild from "./SudokuFeild";
import Timer from "./Timer";

export default class SudokuBoard extends Component {
  render() {
    const { sudoku, onChange } = this.props;
    return (
      <>
        <div>
          {!sudoku.solvedTime && <Timer start={sudoku.startTime}></Timer>}
          {sudoku.solvedTime && <Result sudoku={sudoku} />}
          {sudoku.rows.map((row) => {
            return (
              <div className='row' key={row.index}>
                {row.cols.map((feild) => {
                  return (
                    <SudokuFeild
                      feild={feild}
                      key={feild.col}
                      onChange={onChange}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
