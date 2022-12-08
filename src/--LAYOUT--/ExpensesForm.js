import React, { useEffect, useRef, useState } from "react";
import "./ExpensesForm.css";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../--STORE--/ExpensesReducer";
export default function ExpensesForm() {
  const expensesList = useSelector((state) => state.Expense.list);
  console.log(expensesList);
  const premium = useSelector((state) => state.toggle.premiumAccount);
  // const email = useSelector((state) => state.Expense.email);
  let email =  JSON.parse(localStorage.getItem("userEmail"));
  const userEmail = JSON.parse(localStorage.getItem("testObject"));
  const showForm = useSelector    ((state) => state.Expense.showExpenseForm);
  console.log(userEmail);
  console.log(email);
  const toggle = useSelector((state) => state.toggle.lightMode);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(0);
  let amount = useRef();
  let date = useRef();
  let description = useRef();
  let categories = useRef();
  let totalExpense = 0;
  expensesList.map((list) => {
    totalExpense += parseInt(list.userAmount);
  });
  console.log(totalExpense);
  if (totalExpense > 10000) {
    // alert("Activate Premium")
    dispatch(expensesActions.activeButton());
  }
  if (totalExpense <= 10000) {
    dispatch(expensesActions.deactiveButton());
  }
  function input(event) {
    event.preventDefault();
    let enterDate = date.current.value;
    let enterAmount = amount.current.value;
    console.log(enterDate);
    let enterDescription = description.current.value;
    let enterCategories = categories.current.value;
    let item = {
      userAmount: enterAmount,
      userDescription: enterDescription,
      userCategories: enterCategories,
      userDate : enterDate
    };
    fetch(
      `https://expense-logger-19aae-default-rtdb.firebaseio.com/${email}.json`,
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
      `https://expense-logger-19aae-default-rtdb.firebaseio.com/${email}.json`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          let arr = [];
          {
            for (let keys in data) {
              let obj = {
                ...data[keys],
                id: keys,
              };
              arr.push(obj);
            }
            dispatch(expensesActions.updateList([...arr]));
            // console.log(obj);
            setItems((pre) => [...arr]);
          }
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  }, [render]);
  function deleteExpense(id) {
    fetch(
      `https://expense-logger-19aae-default-rtdb.firebaseio.com/${email}/${id}.json`,
      {
        method: "DELETE",
        // body: JSON.stringify(item),
      }
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre - 1);
        alert("Expense successfuly deleted 💸");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  function editExpense(item) {
    amount.current.value = item.userAmount;
    description.current.value = item.userDescription;
    categories.current.value = item.userCategories;
    fetch(
      `https://expense-logger-19aae-default-rtdb.firebaseio.com/${email}/${item.id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre - 1);
        alert("Now edite the Expense 📝");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  function makeCSV(data) {
    console.log(data)
    let arr1 = data.map((obj) => {
    
      let arr2 = [obj.userAmount, obj.userCategories, obj.userDescription ,obj.userDate];
      return arr2.join();
    });
    arr1.unshift(["AMOUNT", "CATEGORY", "DESCRIPTION" ,"DATA"]);
    return arr1.join("\n");
  }
  const blob = new Blob([makeCSV(expensesList)]);

  const mode = !toggle ? "darkmode" : "ExpensesForm";
  return (
    <div className={mode}>
      {showForm && (
        <form clsssName="my-form" onSubmit={input}>
          <div className="a">
            <div>
              <label for="date">Date:</label>
              <input
                type="date"
                clsssName="date"
                ref={date}
                style={{ width: 200, height: 50 }}
              />
            </div>
            <div className="box">
              <label for="amount">Amount:</label>
              <input
                type="number"
                clsssName="amount"
                placeholder="Enter amount..."
                ref={amount}
                style={{ width: 200, height: 50 }}
              />
            </div>

            <div className="box">
              <label for="description">Description:</label>
              <input
                type="text"
                clsssName="description"
                placeholder="Enter text..."
                ref={description}
                style={{ width: 200, height: 50 }}
              />
            </div>
            <div className="box">
              <label for="expense-cat">Categories:</label>
              <select
                name="expense-cat"
                clsssName="expense-cat"
                ref={categories}
                style={{ width: 200, height: 50 }}
              >
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
              <button  style={{ width: 50, height: 50 }}>Add</button>
            </div>
           
          </div>
        </form>
      )}
      {items.map((item) => {
        return (
          <>
         
          <div className="expenseList">
            <h1>
              {item.userDate} :{item.userCategories} : {item.userAmount} 💰 spend at{" "}
              {item.userDescription}
            </h1>
            <img src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png" onClick={() => deleteExpense(item.id)} />
            <img src="https://cdn-icons-png.flaticon.com/128/3131/3131658.png" onClick={() => editExpense(item)}/>
          </div>
          <hr />
          </>
        );
      })}
    </div>
  );
}
