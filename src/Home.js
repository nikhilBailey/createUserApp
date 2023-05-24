import Confetti from "react-confetti";
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

const TEXTS = ["Congrats", "You Solved", "The Password!"]
const colors = ["#4DAEE9", "#A0CD63", "#F0A95E"]

const TypeAnimation = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000 // every 3 seconds
        )
        return () => clearTimeout(intervalId)
    }, [])

    return (
        <h1 style={{color: colors[index % colors.length], fontSize: "20vh"}}>
            {TEXTS[index % TEXTS.length]}
        </h1>
    )
}

const Home = (props) => {

    const navigate = useNavigate()


    useEffect(() => {
        if (!props.loggedIn) navigate("/")
    }, [navigate, props.loggedIn])

    if (!props.loggedIn) return (<div />)
    return (
        <>
            <TypeAnimation className="typeanimation" />
            <Confetti />
        </>
    )
}

export default Home