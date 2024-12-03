import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.get("/", (req, res) => {
            res.send("Hello my name is Akash");
        })
        app.listen(port, () => {
            console.log(`Server is Running on PORT::${port}`);
        });
    })
    .catch((error) => {
        throw new Error(error);
    });