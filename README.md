# Create User App
This is a Password Validation Challenge App - a gamified React application that challenges users to create an account by satisfying 20 levels of increasingly complex password requirements.

Users must progressively unlock and satisfy password validation levels (0-20) to successfully register. The requirements escalate from simple to absurdly complex. At the end, the entire game solves to around 120 unique passwords that users are forced to mathematically deduce.

## Levels Requirements
- 1-4 Basic rules: uppercase/lowercase, special characters, length limits
- 5-10 Structural rules: distinct first/last chars, even length, vowel ratios
- 11-14 Content rules: specific words ("count", "styx"), vowel casing
- 15-20 Advanced rules: specific symbols (~, |), divisibility by 7, prime digit patterns to fill all empty slots

## Key Features

- Progressive unlocking - requirements reveal one at a time
- Real-time validation with tooltip feedback
- Anti-cheat measures - copy/paste disabled at level 11
- Password masking - input becomes hidden at level 15
- Celebration page with confetti animation upon completion

## Tech Stack

React 18 + React Router
Bootstrap/Reactstrap for UI
React Confetti for celebrations

## User Flow

Login page → Navigate to CreateUser
CreateUser → Solve all 21 password levels
Login → Enter your new credentials
Home → Celebrate with confetti!

This is essentially a puzzle game disguised as a registration form - a fun way to demonstrate how complex password requirements can become.
