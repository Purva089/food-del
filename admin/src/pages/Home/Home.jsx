import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Login/>
      <Navbar setCategory={setCategory} category={category}/>
      <Sidebar category={category}/>
    </>
  )
}

export default Home
