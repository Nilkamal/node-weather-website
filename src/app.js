const path = require("path");
const hbs = require("hbs");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;
const partialPath = path.join(__dirname, "../templates/partials");
//Set up handlebar for template engine and change view path for template to lookup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(partialPath);
//Set path for static resource
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "My Weather",
    name: "Nilkamal Shah"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nilkamal Shah"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "You will get more help on this page",
    title: "Help",
    name: "Nilkamal Shah"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "Please provide address"
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nilkamal Shah",
    error: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nilkamal Shah",
    error: "Page not found"
  });
});
app.listen(port, () => {
  console.log("Application up and running on port " + port);
});
