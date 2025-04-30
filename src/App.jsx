import { useState ,useEffect} from "react"

import Todoinput from "./components/Todoinput"
import TodoList from "./components/TodoList"
function App() {

const[todos, setTodos] = useState([])
const[todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({'todos': newList} ))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }



   function handleDeleteTodos(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
   }



   
   function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodos(index)

   }




  // useEffect
   useEffect(() => {
    if(!localStorage){
      return
    } 



   let localTodos = localStorage.getItem('todos')
   if(!localTodos){
    return
   }

   localTodos = JSON.parse(localTodos).todos
   setTodos(localTodos)

  },[])


  return (
    <>
      <Todoinput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodo={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodos={handleDeleteTodos} todos={todos}/>
    </>
  )
}
// import React from 'react'
export default App
