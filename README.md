# vue-horizontal-calendar 
[![Build Status](https://travis-ci.org/ewatch/vue-horizontal-calendar.svg?branch=master)](https://travis-ci.org/ewatch/vue-horizontal-calendar)
[![Coverage Status](https://coveralls.io/repos/github/ewatch/vue-horizontal-calendar/badge.svg?branch=master)](https://coveralls.io/github/ewatch/vue-horizontal-calendar?branch=master)

## Why did I start the project ?

A horizontal calendar makes it easy to display resources as rows and visualize a certain status for those resources
for date intervals. The type of visualization is not meant to be used on devices with small screens.
Still the final version will be functionally working fine on devices with small screens by having a scrollable table.
The visualization might make mostly sense in administrational environments.

## Usage ideas

- visualize people and their holidays
- visualize appartments and the days when they are free / booked
- visualize cars for renting

## How to use the comopnent ?

Currently please clone the repository and run "npm run serve".
After that you can visit "http://localhost:8080/"

The VueJS framework must be globally available.

```
<table-calendar :render-days="26" :table-data="tableData" />
```

* render-days: the amount of days as cells the calendar should render
* table-data: an array full of data to render the rows for the calendar

Example:
```
tableData: [
    { 
        'id': 1, 
        'name': 'Something Beautiful', 
        'start-date': new Date(), 
        'end-date': new Date() 
    }, 
    { 
        'id': 2, 
        'name': 
        'Something else', 
        'start-date': new Date(), 
        'end-date': new Date() 
    }
]
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
