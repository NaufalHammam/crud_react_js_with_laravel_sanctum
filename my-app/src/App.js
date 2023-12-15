import './App.css';
import Create from './components/Create';
import Read_data from './components/Read_data';
import Update from './components/Update';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const logout = () => {
  localStorage.clear();

  window.location.href = "/"
}
console.log(localStorage.getItem("token"));

if(localStorage.getItem("token") == null){
  var return_variable = (
    <Router>
      <div className="main">
        <div className="main-2">
          <h2 className="main-header">React <Link to='/login'>Login</Link> and CRUD Operations</h2>
          <br></br>
          <Routes>
            <Route path='/create' element={<Create/>} />
            <Route exact path='/read' element={<Read_data/>} />
            <Route exact path='/update' element={<Update/>} />
            <Route exact path='/login' element={<Login/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}else{
  var return_variable = (
    <Router>
      <div className="main">
        <label><b>Token type:</b> {localStorage.getItem("token_type")}</label> <br></br>
        <label><b>Token:</b> {localStorage.getItem("token")}</label> <br></br>
        <label><b>Expired at:</b> {localStorage.getItem("expired_at")}</label> <br></br>
        <Button class="ui primary button" onClick={logout}>Logout</Button>
        <div className="main-2">
          <h2 className="main-header">React Login and <Link to='/create'>C</Link><Link to='/read'>R</Link>UD Operations</h2>
          <Routes>
            <Route path='/create' element={<Create/>} />
            <Route exact path='/read' element={<Read_data/>} />
            <Route exact path='/update' element={<Update/>} />
            <Route exact path='/login' element={<Login/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
function App() {
  return return_variable
}

export default App;
