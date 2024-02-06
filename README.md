https://github.com/piotrpdev/airplane-app/assets/99439005/cf6a73b6-4f99-4f15-a883-908760108b52

# Airplane App

This revolutionary app allows you to add airlines and flights, while keeping them saved on the server! You can then access these anywhere you want.

*(CA2 submission for SETU SSD Website Development 2 module.)*

## Features

- Create, Read, Update and Delete airlines and flights
- Sign-up and log-in system
- Comment section on about page
- Airlines, flights, users and comments are persisted on the server
- Can upload images for users and airlines
- Front page shows statistics about the airlines and flights

## Technical Details

- Server uses [Express](https://github.com/expressjs/express)
- UI uses [Handlebars](https://github.com/handlebars-lang/handlebars.js) templates and [Semantic UI](https://github.com/Semantic-Org/Semantic-UI)
- Logging uses [Winston](https://github.com/winstonjs/winston)
- Persistence on the server uses [lowdb](https://github.com/typicode/lowdb) (single locally stored JSON file)
- Image upload and storage uses [Cloudinary](https://github.com/cloudinary/cloudinary_npm)
