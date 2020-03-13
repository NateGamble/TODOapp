import React from 'react';
import './App.css';
// Empty Checkbox
import { MdCheckBoxOutlineBlank } from "react-icons/md";
// Checked Checkbox
import { IoMdCheckboxOutline } from "react-icons/io";
// Database
import firebase from './firebase.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todo />
      </header>
    </div>
  );
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', done: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getItems()
  }

  render() {
    return (
      <div>
        <h3>To do List:</h3>
        <TodoList items={this.state.items} />
        <p>What's on the to do list boss?</p>
        <form onSubmit={this.handleSubmit} id="text1">
            <input
              id="new_todo"
              size="50"
              onChange={this.handleChange}
              value={this.state.text}
            />
        </form>
      </div>
    )
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: "no"
    };
    // Add new items to the database
    const itemsRef = firebase.database().ref('items');
    itemsRef.push(newItem);
    this.setState(state => ({
      text: ''
    }));
    this.getItems();
  }

  // Get tasks from the database and populate local array of items
  getItems(e) {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          text: items[item].text,
          done: items[item].done
        });
      }
      this.setState({
        items: newState
      });
    });
  }
}

// Generates different checkbox icons depending on whether task is finished or not
// Attempted to make icons clickable using buttons
function GenerateCheckbox(props) {
  const done = props.done;
  const id = props.id;
  if (done == "no") {
    return <MdCheckBoxOutlineBlank/>;
    // return <button onClick={CheckItem(id)}><MdCheckBoxOutlineBlank id="icon2"/></button>
  }
  return <IoMdCheckboxOutline/>;
  // return <button onClick={CheckItem(id)}><IoMdCheckboxOutline id="icon2"/></button>
}

// Wait for checkbox to be clicked, then switches whether task is done
function CheckItem(id) {
  console.log("changing id:")
  console.log(id)
  
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      console.log(item)
      if (item == id) {
        if (items[item].done == "yes") {
          items[item].done = "no";
        } else {
          items[item].done = "yes";
        }
        break;
      }
    }
  });
}

// Generates task text
// Strikes through text if task is finished
function GenerateItemText(props) {
  const done = props.done;
  const id = props.id;
  const text = props.text;
  if (done == "no") {
    return <li key={id}>{text}</li>;
  }
  return <li key={id}><del>{text}</del></li>;
}

class TodoList extends React.Component {
  // TODO: format list view, allow items to be editable
  render() {
    console.log(this.props.items);
    return (
      <ul className="list">
        {this.props.items.map(item => (
          <div>
            <div id="button">
                <GenerateCheckbox done={item.done} id={item.id} />
            </div>
            <div id="text2">
              <GenerateItemText id={item.id} text={item.text} done={item.done} />
            </div>
          </div>
        ))}
      </ul>
    );
  }
}

export default App;
