const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const titles = ["Day1"] //, , "Day 2" "Home"
const userJournal = ["This is the home page. You can write your journals.This is the home page. You can write your journals.This is the home page. You can write your journals."]//,
let len = titles.length
app.get("/", function (req, res) {
    res.render('list', { headings: titles, journals: userJournal, num: len })
})

app.get("/compose", function (req, res) {
    res.render('compose')
})

app.get("/about", function (req, res) {
    res.render('about')
})

app.get("/contact", function (req, res) {
    res.render('contact')
})


app.get("/:heading", function (req, res) {
    let requestedTitle = req.params.heading
    if (titles.includes(requestedTitle)) {
        let indexofElement = titles.indexOf(requestedTitle)
        res.render("post", { heading: requestedTitle, journal: userJournal[indexofElement] })
    }
})

app.post("/", function (req, res) {
    let journalHeading = String(req.body.cheading)
    let journalText = String(req.body.cjournal)
    titles.push(journalHeading)
    userJournal.push(journalText)
    res.redirect("/")
})

app.listen(3000, function (req, res) {
    console.log("Server is running in the PORT 3000.")
})