# Garbage Collector

> A running list of all your trash, uploaded for everyone to see

## Overview

This project is inspired by the description of [Trash Exchange](https://lil.law.harvard.edu/sketches/trash-exchange/), a Sketch by the [Library Innovation Lab](https://lil.law.harvard.edu/) that doesn't seem to exist anywhere.

It's an attempt to create an application that monitors the trashcan on your computer, and every time you throw something away it pushes the name of that file to a server. This creates an ongoing list of every digital thing you've thrown away.

## Instructions

To run this project yourself, first clone this repo and install all the dependencies with

```
npm install
```

Then you'll want to create `config.json` and `db.json` files, following the templates of the `config.example.json` and `db.example.json` files. After that, you're good to go! Just simply:

```
node index.js
```