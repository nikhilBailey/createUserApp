import {Button, Tooltip} from "reactstrap"
import {InputBox, useInput} from "./input"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

const Login = (props) => {

    const [username, setUsername, resetUsername, bindUsername] = useInput("", (prev, userInput) => {
        if (userInput.length > 128) return prev
        return userInput
    })

    const [password, setPassword, resetPassword, bindPassword] = useInput("", (prev, userInput) => {
        if (userInput.length > 128) return prev
        return userInput
    })

    const [usernameTooltip, setUsernameTooltip] = useState("")
    const hideUsernameTooltip = () => setUsernameTooltip("")

    const [passwordTooltip, setPasswordTooltip] = useState("")
    const hidePasswordTooltip = () => setPasswordTooltip("")

    const navigate = useNavigate()

    const login = () => {

        if (props.isCurrentUser({username: username, password: password})) {
            props.setLoggedIn(true)
            navigate("/home")
        }
        else {
            setUsernameTooltip("Username or password is incorrect")
            setPasswordTooltip("Don't have an account? Create a new user!")
        }
    }

    const createUserRedirect = () => navigate("/createUser")
    const buttonProps = {style: {backgroundColor: "#4DAEE9"}}

    return (
        <>
            <h3>Login</h3>
            <InputBox border={usernameTooltip !== ""} id="username" label="Username" width="500px" toBind={bindUsername} inputType="text" onClick={hideUsernameTooltip} noPaste={true} />
            <Tooltip style={{backgroundColor: "coral"}} target="username" placement="top" isOpen={usernameTooltip !== ""} onClick={hideUsernameTooltip}>{usernameTooltip}</Tooltip>
            <InputBox border={passwordTooltip !== ""} id="password" label="Password" width="500px" toBind={bindPassword} inputType="password" onClick={hidePasswordTooltip} noPaste={true} />
            <Tooltip style={{backgroundColor: "coral"}} target="password" placement="bottom" isOpen={passwordTooltip !== ""} onClick={hidePasswordTooltip}>{passwordTooltip}</Tooltip>
            <div style={{display: "flex", flexWrap: "wrap", padding: 10, gap: 20, justifyContent: "start"}}><Button {...buttonProps} onClick={login}>Login</Button><Button {...buttonProps} onClick={createUserRedirect}>CreateUser</Button></div>
        </>
    )
}

export default Login