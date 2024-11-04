### Add calculator without any libraries using pure JS

# Task

[Task description](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.5dt3hghpa22f "Task")

- [x] Webpack config
- [x] Divide function
- [x] Multiply function
- [x] Plus function
- [x] Subtract function
- [x] Precentage function
- [x] Pure JS
- [x] Modules
- [x] Eslint + pre-commit hook
- [x] Theme-management


[Deploy](https://discojordan.github.io/calculator-innowise/dist/index.html "Deploy")
# How to run the App

## 1. Clone local copy of project 

`git clone https://github.com/DiscoJordan/calculator-innowise.git`

## 2. Open project, install dependencies 

```
cd calculator-innowise
code .
npm i
```

## 3. Rebuild project

`npm run build`

## 4. Run project

`npm run start`

# Folder structure:

1. ## dist - Distribution of our bundle.
2. ## src - Main dev folder
    1. ## modules - JS modules of calculator
         1. ## display.js - Function to update Display
         2. ## handlers.js - Handlers for every button on calculator
         3. ## operations.js - Logic of calculator`s buttons and calculations
         4. ## state.js - State of calculator, some variables that holds params
         5. ## theme.js - Theme inicialization and toggling
    2. ## Style - There are all styles for calculator
    3. ## Index.html - HTML Layout 
    4. ## Index.js - Start-point of calculator, theme initialization, Event listeners
