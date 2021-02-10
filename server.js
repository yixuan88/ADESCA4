const express = require('express'); // DO NOT DELETE
const app = express(); // DO NOT DELETE

app.use("/scripts", express.static('./scripts/'));
app.use("/styles", express.static('./styles/'));
app.use("/img", express.static('./img/'));

app.get("/index", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
  });

const port = 8000;
app.listen(port, () => console.log("App listening on port " + port));