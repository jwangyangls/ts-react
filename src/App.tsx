import React, { useState } from 'react'
import { Routes, Route,Link} from 'react-router-dom'
import routes from './router'

import './App.css'

function App():any {
  return (
    <div>
        <div className="navBox">
        {
          routes.map(route=><Link to={route.path} key={route.path} className="nav" >
            {route.name}
          </Link>)
        }
        <p>
          content 区域
        </p>
        </div>
      <br/>
      <Routes>
        {
          routes.map(route=><Route path={route.path} key={route.path} element={<route.component />} >
          </Route>)
        }
      </Routes>
    </div>
  )
}

export default App
