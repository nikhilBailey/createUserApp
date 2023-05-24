import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom"
import {Card} from "reactstrap"
import {BackgroundImage} from "./Images"
import CreateUser from "./CreateUser"
import Login from "./Login"
import Home from "./Home"

import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react"

const App = () => {

    const [currentUser, setCurrentUser] = useState({username: "", password: ""})

    const isCurrentUser = (object) => {
        if (currentUser.username === "" || currentUser.password === "") return false
        if (!object || ! (typeof object === "object")) return false

        if (!object.username || !(typeof object.username === "string") || !object.password || !(typeof object.password === "string")) return false
        return object.username === currentUser.username && object.password === currentUser.password


    }

    const [loggedIn, setLoggedIn] = useState(false)

    const userProps = {
        currentUser,
        setCurrentUser,
        isCurrentUser,
        loggedIn,
        setLoggedIn
    }

  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<PageFrame />}>
                      <Route index path="" element={<Login {...userProps} />} />
                      <Route path="createUser" element={<CreateUser {...userProps} />} />
                      <Route path="home" element={<Home {...userProps} />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  )
}

const PageFrame = () => {
    return (
        <>
            <BackgroundImage />
            <div style={{height: "10vh"}} />
            <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{width: 1000, maxWidth: "95%", marginLeft: "auto", marginRight: "auto", display: "flex"}}>
                <Outlet />
            </Card>
        </>
    )
}


export default App;
