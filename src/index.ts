import express from "express";
import config from "config";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
    console.log(`REST API on http://localhost:${port}`);

});