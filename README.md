# Garbage Collector

> Saving all your screenshot trash for future use

## Overview

This project is inspired by the description of [Trash Exchange](https://lil.law.harvard.edu/sketches/trash-exchange/), a Sketch by the [Library Innovation Lab](https://lil.law.harvard.edu/) that doesn't seem to exist anywhere.

It's an attempt to create an application that monitors the trashcan on your computer, and every time you throw a screenshot away it actually saves it in a hidden folder on your computer for future use.

## Instructions

To run this project yourself, first clone this repo and install all the dependencies with

```
npm install
```

Then you'll want to create `config.json` following the template of the `config.example.json`. After that, you'll need to install [pm2](http://pm2.keymetrics.io/), which will allow you to run this process in the background of your computer at all times. Once `pm2` is installed, run

```
pm2 startup
```

and copy the code that's shown in the terminal in order to tell it to always run when your computer starts up. Then:

```
pm2 start trash-collector.js
```

to run the actual program in the background of your computer.