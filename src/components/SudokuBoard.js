import React, { Component } from "react";
import SudokuFeild from "./SudokuFeild";
export default class SudokuBoard extends Component {
  render() {
    const { sudoku, onChange } = this.props;
    return (
      <>
        <div>
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
