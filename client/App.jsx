import React, { Component } from "react";
import Form from "./Form.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      heap: [],
      text: "",
      currIndex: 0,
      deleteEl: false,
      currDel: -1
    };
    this.saveText = this.saveText.bind(this);
    this.insertElement = this.insertElement.bind(this);
    this.updateArray = this.updateArray.bind(this);
    this.updateDelete = this.updateDelete.bind(this);
    this.pop = this.pop.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.deleteTree = this.deleteTree.bind(this);
  }
  saveText(e) {
    this.setState({ text: e.target.value });
  }

  deleteElement() {
    if (this.state.heap.length !== 0) {
      let newArr = [];
      for (let el of this.state.heap) {
        newArr.push(el);
      }
      [newArr[0], newArr[newArr.length - 1]] = [
        newArr[newArr.length - 1],
        newArr[0]
      ];
      this.setState({ heap: newArr, deleteEl: true });
    }
  }
  pop(heap) {
    this.setState({ heap, deleteEl: false, currDel: 0 });
  }
  insertElement() {
    if (this.state.text !== "") {
      let newVal = Number(this.state.text);
      let newArr = [];
      for (let el of this.state.heap) {
        newArr.push(el);
      }
      newArr.push(newVal);
      this.setState({ heap: newArr, currIndex: newArr.length - 1 });
    }
  }
  updateArray(currIndex, heap) {
    this.setState({ currIndex, heap });
  }
  updateDelete(currDel, heap) {
    this.setState({ currDel, heap });
  }
  componentDidMount() {
    fetch("http://localhost:3000/list")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ heap: data });
      })
      .catch(err => {
        console.log("Fetch failed", err);
      });
  }
  deleteTree() {
    this.setState({ heap: [] });
    fetch("http://localhost:3000/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    })
      .then(res => res.json())
      .then(res => console.log("This is the res", res))
      .catch(err => console.log("Delete tree failed", err));
  }
  componentDidUpdate() {
    let { currIndex } = this.state;
    if (currIndex != 0) {
      let newArr = [];
      for (let el of this.state.heap) {
        newArr.push(el);
      }
      let parIndex = Math.floor((currIndex - 1) / 2);
      if (newArr[currIndex] < newArr[parIndex]) {
        [newArr[currIndex], newArr[parIndex]] = [
          newArr[parIndex],
          newArr[currIndex]
        ];
        setTimeout(
          function() {
            this.updateArray(parIndex, newArr);
          }.bind(this),
          1500
        );
      } else {
        this.setState({ currIndex: 0 });
      }
    }
    let { deleteEl } = this.state;
    if (deleteEl) {
      let newArr = [];
      for (let el of this.state.heap) {
        newArr.push(el);
      }
      newArr.pop();
      setTimeout(
        function() {
          this.pop(newArr);
        }.bind(this),
        1500
      );
    }
    let { currDel } = this.state;
    if (currDel !== -1) {
      let leftChild = currDel * 2 + 1;
      if (leftChild >= this.state.heap.length) {
        this.setState({ currDel: -1 });
      } else {
        let newArr = [];
        for (let el of this.state.heap) {
          newArr.push(el);
        }
        let rightChild = leftChild + 1;
        if (rightChild >= this.state.heap.length) {
          if (newArr[leftChild] >= newArr[currDel]) {
            this.setState({ currDel: -1 });
          } else {
            [newArr[leftChild], newArr[currDel]] = [
              newArr[currDel],
              newArr[leftChild]
            ];
            setTimeout(
              function() {
                this.updateDelete(leftChild, newArr);
              }.bind(this),
              1500
            );
          }
        } else {
          if (
            newArr[currDel] <= newArr[leftChild] &&
            newArr[currDel] <= newArr[rightChild]
          ) {
            this.setState({ currDel: -1 });
          } else {
            if (
              newArr[currDel] <= newArr[leftChild] &&
              newArr[currDel] > newArr[rightChild]
            ) {
              [newArr[rightChild], newArr[currDel]] = [
                newArr[currDel],
                newArr[rightChild]
              ];
              setTimeout(
                function() {
                  this.updateDelete(rightChild, newArr);
                }.bind(this),
                1500
              );
            } else if (
              newArr[currDel] > newArr[leftChild] &&
              newArr[currDel] <= newArr[rightChild]
            ) {
              [newArr[leftChild], newArr[currDel]] = [
                newArr[currDel],
                newArr[leftChild]
              ];
              setTimeout(
                function() {
                  this.updateDelete(leftChild, newArr);
                }.bind(this),
                1500
              );
            } else {
              let childToChange = leftChild;
              if (newArr[leftChild] > newArr[rightChild]) {
                childToChange = rightChild;
              }
              [newArr[childToChange], newArr[currDel]] = [
                newArr[currDel],
                newArr[childToChange]
              ];
              setTimeout(
                function() {
                  this.updateDelete(childToChange, newArr);
                }.bind(this),
                1500
              );
            }
          }
        }
      }
    }
  }
  render() {
    return (
      <center>
        <div>
          <Form
            saveText={this.saveText}
            insertElement={this.insertElement}
            deleteElement={this.deleteElement}
            deleteTree={this.deleteTree}
          />
        </div>
        <div>
          <h1>{JSON.stringify(this.state.heap)}</h1>
        </div>
      </center>
    );
  }
}

export default App;
