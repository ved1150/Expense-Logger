import React, { useContext, useEffect, useRef, useState } from "react";
import "./ExpensesForm.css";
import globalContext from "../--CONTEXT--/globalContext";
export default function ExpensesForm() {
  let globalStore = useContext(globalContext);
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(0);
  let amount = useRef();
  let description = useRef();
  let categories = useRef();
  console.log(items);
  function input(event) {
    event.preventDefault();
    let enterAmount = amount.current.value;
    let enterDescription = description.current.value;
    let enterCategories = categories.current.value;
    let item = {
      userAmount: enterAmount,
      userDescription: enterDescription,
      userCategories: enterCategories,
    };
    globalStore.expensesList.push(item);
    fetch(
      "https://expense-tracker-react-ap-c4771-default-rtdb.firebaseio.com/listInfo.json",
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre + 1);
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  useEffect(() => {
    fetch(
      "https://expense-tracker-react-ap-c4771-default-rtdb.firebaseio.com/listInfo.json"
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          let arr = [];
          for (let keys in data) {
            arr.push(data[keys]);
            console.log(data[keys]);
            setItems((pre) => [...arr]);
          }
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  }, [render]);

  return (
    <div className="ExpensesForm">
      <h1>Expense Tracker</h1>
      <form clsssName="my-form" onSubmit={input}>
        <div className="box">
          <label for="amount">Choose Amount:</label>
          <input
            type="number"
            clsssName="amount"
            placeholder="Enter amount..."
            ref={amount}
          />
        </div>
        <div className="box">
          <label for="description">Choose Description:</label>
          <input
            type="text"
            clsssName="description"
            placeholder="Enter text..."
            ref={description}
          />
        </div>
        <div className="box">
          <label for="expense-cat">Choose a Categories:</label>
          <select name="expense-cat" clsssName="expense-cat" ref={categories}>
            <optgroup label="categories">
              <option value="housing">Housing</option>
              <option value="transportation">Transportation</option>
              <option value="food">Food</option>
              <option value="medical">Medical & Healthcare</option>
              <option value="personal spending">
                Personal Spending & Entertainment
              </option>
            </optgroup>
          </select>
        </div>
        <div className="box">
          <button>Submit</button>
        </div>
      </form>
      {items.map((item) => {
        return (
          <h1>
            {item.userCategories} : {item.userAmount} 💰 spend at{" "}
            {item.userDescription}
          </h1>
        );
      })}
    </div>
  );
}
