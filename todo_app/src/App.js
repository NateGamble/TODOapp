import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IoIosAddCircleOutline } from "react-icons/io"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <HelloMessage name="Nate" />
        <Todo />
      </header>
    </div>
  );
}

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      // Icon and text box need to be aligned
      <div>
        <h3>To do List:</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <div id="icon1">
            <IoIosAddCircleOutline />
          </div>
          <div id="text2">
            <input
              id="new_todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
          </div>
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
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  // TODO: format list view, allow items to be editable
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default App;
