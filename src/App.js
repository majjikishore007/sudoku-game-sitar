import React, { Component } from "react";
import "./App.css";
import generator from "sudoku";
import SudokuBoard from "./components/SudokuBoard";
import produce from "immer";
window.generator = generator;
/*
  basics data structure design
  {rows :[{cols:[{row:0,col:0,value=i, readonly=tue}]}]}
*/
function generateSudoku() {
  const raw = generator.makepuzzle().map((e) => (e != null ? e + 1 : e));
  const result = { rows: [] };
  result.solution = generator.solvepuzzle(raw);
  console.log(result.solution);

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = raw[i * 9 + j];
      const col = {
        row: i,
        col: j,
        value: value,
        readonly: value != null,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  return result;
}
function checkSolution(sudoku) {
  const candidate = sudoku.rows
    .map((row) => row.cols.map((col) => col.value))
    .flat();

  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] != sudoku.solution[i]) {
      return false;
    }
  }
  return true;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku(),
    }));
  }
  handleOnChange = (e) => {
    this.setState(
      produce((state) => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
      })
    );
  };
  solveSudoku = (e) => {
    this.setState(
      produce((state) => {
        state.sudoku.rows.forEach((row) => {
          row.cols.forEach((col) => {
            if (!col.readonly) {
              col.value = state.sudoku.solution[col.row * 9 + col.col];
            }
          });
        });
      })
    );
    console.log(this.state.solution);
  };
  render() {
    return (
      <>
        <div className='App'>
          <header className='App-header'>
            <h1>Sudoku</h1>
          </header>
          <SudokuBoard
            sudoku={this.state.sudoku}
            onChange={this.handleOnChange}
          />

          <button className='solve' onClick={this.solveSudoku}>
            Solve
          </button>
        </div>
      </>
    );
  }
}

export default App;
