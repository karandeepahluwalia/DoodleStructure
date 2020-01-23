import React, { Component } from "react";

class Node extends Component {
  constructor() {
    super();
  }
  render() {
    return <button>{this.props}</button>;
  }
}
