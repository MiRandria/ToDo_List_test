import React, { useState } from 'react'
import './ToDo.css';

function ToDo() {
  const [value, setValue] = useState("");
  const [stock, setStock] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  return (
    <>
    <div className='todo'>
        <h1>TODO</h1>
        <input type="text" onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
                setStock([value,...stock])
            }
        }} placeholder={"Task"} className='text'/>
        {stock.map((task) => {
          return (
            <>
              <input type={"checkbox"} onClick={(e) => {
                const index = stock.indexOf(task); 
                const stockCopie = [...stock];
                stockCopie.splice(index,1)
                setStock(stockCopie) 
                setDoneTask([task,...doneTask])
                }} checked={false} className='checkbox' />
              <span>{task}</span>
            </>
          )
        })}
    </div>
    <div className='done'>
        <h1>DONE</h1>
        {doneTask.map((done) => {
          return (
            <>
              <p>{done}</p>
            </>
          )
        })}
    </div>
    </>
  )
}
export default ToDo;
