import React, { Component } from "react";

class Node extends Component {
  constructor() {
    super();
    this.determinePosition();
  }
  determinePosition(value) {
    let styles = { position: "absolute", top: 200 };
    let num = 1;
    let depth = -1;
    //console.log(this.props);
    while (num <= value) {
      depth++;
      num *= 2;
    }
    if (num === 1) {
      styles.left = "47.5%";
    } else {
      let divisor = num / 2;
      let offSet = (((value % divisor) * 2 + 1) / num) * 95;
      styles.left = offSet.toString() + "%";
    }
    styles.top += depth * 200;
    return styles;
  }
  render() {
    return (
      <button style={this.determinePosition(this.props.node)} className="nodes">
        <h1>{this.props.value}</h1>
      </button>
    );
  }
}
export default Node;
