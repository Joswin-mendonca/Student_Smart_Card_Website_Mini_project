import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  const WebStyle = {
    color:'white',
    backgroundColor:'black',
    padding:'50 20 50 20',
    margin:50,
    borderRadius:20,
    borderColor:'blue',
    borderWidth:20,
    fontFamily:'monospace',
    fontSize:20
  }
  return (
    <div >
      <center>
      <Link to='/LoginForm'><button style={WebStyle}>Admin Login</button></Link>
      <br/>
      <Link to='/Canteen'><button style={WebStyle}>Canteen Login</button></Link>
      <br/>
      <Link to='/Stationary'><button style={WebStyle}>Stationary Login</button></Link>
      <br/>
      <Link to='/Library_log'><button style={WebStyle}>Library Login</button></Link>
      </center>
    </div>
  )
}
