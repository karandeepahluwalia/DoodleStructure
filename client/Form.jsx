import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <center>
          <div>
            Insert Element :
            <input type="text" onChange={this.props.saveText} />
            <button onClick={this.props.insertElement}>Submit</button>
          </div>
        </center>
        <div>
          <button onClick={this.props.deleteElement}>Delete Element </button>
        </div>
        <div>
          <button onClick={this.props.deleteTree}>Delete Tree </button>
        </div>
      </div>
    );
  }
}

export default Form;
