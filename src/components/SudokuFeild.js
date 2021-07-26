import React, { Component } from "react";

export default class SudokuFeild extends Component {
  handleOnChange = (e) => {
    const value = parseInt(e.target.value);
    this.props.onChange({ ...this.props.feild, value: value });
  };
  render() {
    const { feild } = this.props;
    return (
      <input
        className='feild'
        value={feild.value || " "}
        readOnly={feild.readonly}
        onChange={this.handleOnChange}
      />
    );
  }
}
