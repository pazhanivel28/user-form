import React, { useState } from "react";
import "./App.css";

function App() {
  const question = {
    page1: {
      name: "",
      number: "",
    },
    page2: {
      email: "",
      age: "",
    },
  };
  const [value, setValue] = useState(question);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  function pageChange() {
    if (page < 2) {
      setPage(page + 1);
    }
  }

  function onValueChange(e) {
    const pageData = value[`page${page}`];
    const pageValue = { ...pageData, [e.target.name]: e.target.value };
    setValue({ ...value, [`page${page}`]: pageValue });
  }

  function submitValue() {
    data.push(value);
    setValue(question);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>User Form </h2>
        {page === 1 && (
          <div>
            Name{" "}
            <input
              name="name"
              type="text"
              value={value.page1.name}
              onChange={onValueChange}
            ></input>
            <br /> <br />
            Contact No{" "}
            <input
              name="number"
              type="text"
              value={value.page1.number}
              onChange={onValueChange}
            ></input>
          </div>
        )}
        {page === 2 && (
          <div>
            Email{" "}
            <input
              name="email"
              type="text"
              value={value.page2.email}
              onChange={onValueChange}
            ></input>
            <br /> <br />
            Age{" "}
            <input
              name="age"
              type="text"
              value={value.page2.age}
              onChange={onValueChange}
            ></input>
          </div>
        )}
        <br />
        {page !== 2 && <button onClick={pageChange}>Next</button>}
        {page === 2 && <button onClick={submitValue}>Submit Form</button>}
      </header>
    </div>
  );
}

export default App;
