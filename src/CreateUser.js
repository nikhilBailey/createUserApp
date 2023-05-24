import {InputBox, useInput} from "./input"
import {useState} from "react"
import {Button, Tooltip} from "reactstrap"
import {useNavigate} from "react-router-dom"

//!!Ooooo-word!oooo&

//!!OOOOO-styx31count&

//~AAAaa~COUnt~styxx|xxxxx1xx|
//~aeiOU~COUNT~styx~2346|5789|

const CreateUser = (props) => {

    const levels = {
        CONFIRM_PASSWORD: 0,
        CAPITAL_AND_LOWERCASE_LETTER: 1,
        FOUR_SPECIAL_CHARACTERS: 2,
        NO_SIX_CONSECUTIVE_LETTERS_AND_NUMBERS: 3,
        AT_LEAST_EIGHTEEN_CHARACTERS: 4,
        START_AND_END_DIFFERENT_SPECIALS: 5,
        EVEN_LENGTH: 6,
        FIRST_HALF_HALF_VOWEL: 7,
        CONTAIN_WORD_COUNT_AND_REQUIREMENTS_COUNTER_APPEARS: 8,
        MORE_CAPITALS_THAN_SPECIALS: 9,
        LESS_THAN_EIGHT_CAPITALS: 10,
        NO_PASTE: 11,
        CONTAIN_RIVER_STYX: 12,
        SECOND_HALF_NO_VOWEL: 13,
        ALL_OS_AND_US_CAPITOL: 14,
        INVISIBLE_PASSWORDS: 15,
        CONTAIN_FOUR_TILDES_AND_TWO_PIPES: 16,
        USERNAME_LONGER_THAN_PASSWORD: 17,
        LENGTH_DIVISIBLE_BY_SEVEN: 18,
        NO_MORE_THAN_TWO_OF_EACH_VOWEL: 19,
        PRIME_AND_NOT_PRIME_DIGITS: 20
    }


    const [username, setUsername, resetUsername, bindUsername] = useInput("", (prev, userInput) => {
        hideUsernameTooltip()
        if (userInput.length > 128) return prev
        return userInput
    })

    const [password, setPassword, resetPassword, bindPassword] = useInput("", (prev, userInput) => {
        hidePasswordTooltip()
        if (userInput.length > 128) return prev
        return userInput
    })


    const [ confirmPassword, setConfirmPassword, resetConfirmPassword, bindConfirmPassword] = useInput("", (prev, userInput) => {
        hideConfirmPasswordTooltip()
        if (userInput.length > 128) return prev
        return userInput
    })

    const [level, setLevel] = useState(0)
    const navigate = useNavigate()

    const validateInput = () => {

        hideUsernameTooltip()
        hidePasswordTooltip()
        hideConfirmPasswordTooltip()

        //level 0
        if (level === 0) {
            setLevel(1)
            setConfirmPasswordTooltip("Please confirm your password")
            return
        }
        if (/.*\s.*/.test(password)) {
            setPasswordTooltip("Password may not contain whitespace")
            return
        }
        if (password !== confirmPassword) {
            setPasswordTooltip("Passwords Must Match")
            setConfirmPasswordTooltip("Passwords Must Match")
            return
        }

        //level 1
        const count = countChars(password)
        if (count.capitalLetters < 1 || count.lowercaseLetters < 1) {
            setPasswordTooltip("Password must contain at least 1 capital and 1 lowercase letter")
            return
        }

        //level 2
        if (level < 2) setLevel(2)
        if (count.specials < 4) {
            setPasswordTooltip("Password must contain at least four special characters")
            return
        }

        //level 3
        if (level < 3) setLevel(3)
        if (/.*[A-Za-z0-9]{6,}.*/.test(password)) {
            setPasswordTooltip("Password may not contain a sequence of more than 5 consecutive letters and numbers")
            return
        }

        //level 4
        if (level < 4) setLevel(4)
        if (password.length < 18) {
            setPasswordTooltip("Password must be at least 18 characters long")
            return
        }
        if (password.length > 40) {
            setPasswordTooltip("Password must be less than 40 characters long")
            return
        }

        //level 5
        if (level < 5) setLevel(5)
        const firstChar = password.charAt(0)
        const lastChar = password.charAt(password.length - 1)
        if (!/\W/.test(firstChar) || !/\W/.test(lastChar) || firstChar === lastChar) {
            setPasswordTooltip("First and last characters of password must be distinct special characters")
            return
        }

        //level 6
        if (level < 6) setLevel(6)
        if (password.length % 2 !== 0) {
            setPasswordTooltip("Password must be an even length")
            return
        }

        //level 7
        if (level < 7) setLevel(7)
        const firstHalfCount = countChars(password.slice(0, password.length / 2))
        if (firstHalfCount.vowels < password.length / 4) {
            setPasswordTooltip("First half of password must be at least half vowels")
            return
        }

        //level 8
        if (level < 8) setLevel(8)
        if (!/.*count.*/.test(password.toLowerCase())) {
            setPasswordTooltip('Password must contain the word "count". To assist you, a count has been added.')
            return
        }

        //level 9
        if (level < 9) setLevel(9)
        if (count.capitalLetters <= count.specials) {
            setPasswordTooltip('Password must contain more capital letters than special characters')
            return
        }

        //level 10
        if (level < 10) setLevel(10)
        if (count.capitalLetters >= 8) {
            setPasswordTooltip('Password must contain less than eight capital letters')
            return
        }

        //level 11
        if (level < 11) {
            setLevel(11)
            setUsernameTooltip("You may no longer copy and paste")
        }

        //level 12
        if (level < 12) setLevel(12)
        if (!/.*styx.*/.test(password)) {
            setPasswordTooltip('Password must contain the four-letter name of the river where achilles got his invulnerability, in lower case')
            return
        }

        //level 13
        if (level < 13) setLevel(13)
        const secondHalfCount = countChars(password.slice(password.length / 2, password.length))
        if (secondHalfCount.vowels !== 0) {
            setPasswordTooltip("Second half of password may not contain any vowels")
            return
        }

        //level 14
        if (level < 14) setLevel(14)
        if (count.lowercaseOsAndUs > 0 && count.uppercaseAEIs > 0) {
            setPasswordTooltip("All O's and U's must be capitol, while all other vowels must be lowercase")
            return
        }

        //level 15
        if (level < 15) setLevel(15)

        //level 16
        if (level < 16) setLevel(16)
        if (count.tildeCount !== 4 || count.pipeCount !== 2) {
            setPasswordTooltip("Password must contain four tildes and two pipes")
            return
        }

        //level 17
        if (level < 17) setLevel(17)
        if (username.length <= password.length) {
            setUsernameTooltip("Username must be longer than password")
            return
        }

        //level 18
        if (level < 18) setLevel(18)
        if (password.length % 7 !== 0) {
            setPasswordTooltip("Password must have length divisible by seven")
            return
        }

        //level 19
        if (level < 19) setLevel(19)
        if (count.aCount > 2 || count.eCount > 2 || count.iCount > 2 || count.oCount > 2 || count.uCount > 2) {
            setPasswordTooltip("Password must not have more than two of the same vowel")
            return
        }

        //level 20
        if (level < 20) setLevel(20)
        if (!/[^2357]*23[^2357]+57[^2357]*/.test(password) || !/[^4689]*46[^4689]+89[^4689]*/.test(password)) {
            setPasswordTooltip("Password must contain the digits 2-9 such that the prime digits ascend, the non-prime digits ascend, and the prime and non-prime digits come in groups of size 2")
            return
        }

        if(level < 21) setLevel(21)
        props.setCurrentUser({username: username, password: password})
        navigate("/")
    }

    const countChars = (word) => {
        let capitalLetters = 0
        let lowercaseLetters = 0
        let numbers = 0
        let specials = 0
        let vowels = 0
        let lowercaseOsAndUs = 0
        let uppercaseAEIs = 0
        let tildeCount = 0
        let pipeCount = 0
        let aCount = 0
        let eCount = 0
        let iCount = 0
        let oCount = 0
        let uCount = 0

        //count all characters
        for (let index = 0; index < word.length; index++) {
            const countingChar = word.charAt(index)
            if (/[A-Z]/.test(countingChar)) capitalLetters++
            else if (/[a-z]/.test(countingChar)) lowercaseLetters++
            else if (/[0-9]/.test(countingChar)) numbers++
            else specials++

            if (/[AEIOUaeiou]/.test(countingChar)) vowels++
            if (/[ou]/.test(countingChar)) lowercaseOsAndUs++
            if (/[AEI]/.test(countingChar)) uppercaseAEIs++
            if (/[~]/.test(countingChar)) tildeCount++
            if (/[|]/.test(countingChar)) pipeCount++

            if (/[Aa]/.test(countingChar)) aCount++
            if (/[Ee]/.test(countingChar)) eCount++
            if (/[Ii]/.test(countingChar)) iCount++
            if (/[Oo]/.test(countingChar)) oCount++
            if (/[Uu]/.test(countingChar)) uCount++
        }

        return {
            capitalLetters: capitalLetters,
            lowercaseLetters: lowercaseLetters,
            numbers: numbers,
            specials: specials,
            vowels: vowels,
            lowercaseOsAndUs: lowercaseOsAndUs,
            uppercaseAEIs: uppercaseAEIs,
            tildeCount: tildeCount,
            pipeCount: pipeCount,
            aCount: aCount,
            eCount: eCount,
            iCount: iCount,
            oCount: oCount,
            uCount: uCount
        }
    }

    const [usernameTooltip, setUsernameTooltip] = useState("")
    const hideUsernameTooltip = () => setUsernameTooltip("")

    const [passwordTooltip, setPasswordTooltip] = useState("")
    const hidePasswordTooltip = () => setPasswordTooltip("")

    const [confirmPasswordTooltip, setConfirmPasswordTooltip] = useState("")
    const hideConfirmPasswordTooltip = () => setConfirmPasswordTooltip("")

    const buttonProps = {style: {backgroundColor: "#4DAEE9"}}

    return (
        <>
            <h3>Create a New User</h3>
            <InputBox border={usernameTooltip !== ""} id="username" label="Username" width="500px" toBind={bindUsername} inputType="text" onClick={hideUsernameTooltip} noPaste={level >= levels.NO_PASTE} />
            <Tooltip style={{backgroundColor: "coral"}} target="username" placement="top" isOpen={usernameTooltip !== ""} onClick={hideUsernameTooltip}>{usernameTooltip}</Tooltip>
            <InputBox border={passwordTooltip !== ""} id="password" label="Password" width="500px" toBind={bindPassword} inputType={level >= levels.INVISIBLE_PASSWORDS ? "password" : "text"} onClick={hidePasswordTooltip} noPaste={level >= levels.NO_PASTE} />
            <Tooltip style={{backgroundColor: "coral"}} target="password" placement="right" isOpen={passwordTooltip !== ""} onClick={hidePasswordTooltip}>{passwordTooltip}</Tooltip>
            <InputBox disabled={level === 0} border={confirmPasswordTooltip !== ""} id="confirmPassword" label="Confirm Password" width="500px" toBind={bindConfirmPassword} inputType={level >= levels.INVISIBLE_PASSWORDS ? "password" : "text"} onClick={hideConfirmPasswordTooltip} noPaste={level >= levels.NO_PASTE} />
            {level > 0 && <Tooltip style={{backgroundColor: "coral"}} target="confirmPassword" placement="bottom" isOpen={confirmPasswordTooltip !== ""} onClick={hideConfirmPasswordTooltip}>{confirmPasswordTooltip}</Tooltip>}

            <div style={{display: "flex", flexWrap: "wrap", padding: 10, gap: 20, justifyContent: "start"}}>
                <Button {...buttonProps} onClick={validateInput}>Create</Button>
                {level >= levels.CONTAIN_WORD_COUNT_AND_REQUIREMENTS_COUNTER_APPEARS && <p>{`Requirements: ${level - 1} / 20`}</p>}
            </div>
        </>
    )
}

export default CreateUser