import React from 'react'
import AddTodo from './AddTodo/AddTodo'
import ViewTodo from './ViewTodo/ViewTodo'
import './Home.css'
import { Divider } from '@mui/material'

const Home = () => {
  return (
    <div className='home-main-container'>
      <div className='home-add-todo-container'>
        <AddTodo/>
      </div>
      <div className='home-todo-list-container'>
        <ViewTodo/>
      </div>
    </div>
  )
}

export default Home