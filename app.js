"use strict";
// Load libraries
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let GuestbookEntry = require("./src/GuestbookEntry");

// read json file into array
fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    let d = JSON.parse(data);

    let entries = [];
    for (let entry of d) {
        entries.push(new GuestbookEntry(entry.username, entry.country, entry.date, entry.message));
    }

    //Start server
    let app = express();
    app.set("view engine", "ejs");
    app.set("views", "./views");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("./public"));

    // route /
    app.get("/", (req, res) => {			
        // console.log('Start');
        res.render("index", {
            entries: entries
        });
    });
	// GET route guestbook
	app.get("/guestbook", (req, res) => {			
        // console.log('Start1');
        res.render("guestbook", {
            entries: entries
        });
    });
	// GET route newmessage
	app.get("/newmessage", (req, res) => {			
        // console.log('Snewmessage/get');
        res.render("newmessage");
    });
	// GET route ajaxmessage
	app.get("/ajaxmessage", (req, res) => {			
        // console.log('ajaxmessage/get');
        res.render("ajaxmessage");
    });
    // new message route POST
    app.post("/newmessage", (req, res) => {
        let message = req.body.content;
        let country = req.body.country;
		let username = req.body.title;
		console.log('New message post');
        // create newentry
        let newEntry = new GuestbookEntry(username, country, Date(), message);
        // push newentry into array entries
        entries.push(newEntry);
        // write to json file array entries
        fs.writeFile("./data.json", JSON.stringify(entries), () => { err, data });
        
        // redirect to /
        res.redirect("/");
    });
	// ajaxmessage route, POST
	app.post("/ajaxmessage", (req, res) => {
        let message = req.body.content;
        let country = req.body.country;
		let username = req.body.title;
		console.log('Ajax message post');
        // create new entry
        let newEntry = new GuestbookEntry(username, country, Date(), message);
        // push newentry into array entries
        entries.push(newEntry);
        // write array entries to json file
        fs.writeFile("./data.json", JSON.stringify(entries), () => { err, data });
        
        // redirect to /
        res.redirect("/");
    });

// listen localhost:3000
    app.listen(3000, () => {
        console.log("App started at http://localhost:3000");
    })


});