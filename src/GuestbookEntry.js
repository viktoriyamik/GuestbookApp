"use strict";
// GuestbookEntry class
class GuestbookEntry {
    constructor(username, country, date, message) {
		this.username = username;
        this.country = country;
		this.date = date;
        this.message = message;
    }
}


module.exports = GuestbookEntry;