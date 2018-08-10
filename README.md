# David Piçarra - Toy Robot
[![CircleCI](https://img.shields.io/circleci/project/github/davidpicarra/toy-robot.svg)](https://circleci.com/gh/davidpicarra/toy-robot)
[![Coverage Status](https://img.shields.io/codecov/c/github/davidpicarra/toy-robot.svg)](https://codecov.io/github/davidpicarra/toy-robot?branch=master)
[![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg)](https://vuejs.org/)

> A Vue.js project to solve the Toy Robot challenge

## Table of Contents
- [Demo](#demo)
- [What was done](#what-was-done)
- [How to run the app](#how-to-run-the-app)
- [Build setup](#build-setup)

## Demo
[__Demo__](https://davidpicarra.github.io/toy-robot/dist/)

## What was done

A component called `ToyRobot.vue` was created to allow a Robot to be place in a 5x5 grid. The following commands are available:

```javascript
help() // shows available commands
place(x, y, facing) // place the robot at x, y location and facing the direction provided
move() // moves the robot 1 unit forward in the direction it's facing
left() // rotate left 90 degrees anti-clockwise
right() // rotate right 90 degrees clockwise
report() // outputs current robots location and direction
clear() // clear the messages
```

Created unit test with 100% coverage and added specific test to try the scenario provided:
> [should execute the sample test correctly](https://github.com/davidpicarra/toy-robot/blob/master/test/unit/specs/ToyRobot.spec.js#L47)

## How to run the app

In order to run the app locally, the following commands must be executed:
```bash
# npm
$ npm install
$ npm run dev

# yarn
$ yarn
$ yarn dev
```

## Build setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
