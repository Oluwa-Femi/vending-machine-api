import express from "express";

const app = express();

app.listen(7000, () => {
    console.log(`REST API on 7000`);
})