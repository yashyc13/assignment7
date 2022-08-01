import express from "express";
const app = express();
import route from "./src/route.js";
app.use(express.static('./dist/public'));
//app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', route);
export const myURL = `http://localhost:5000`;
app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});
//# sourceMappingURL=app.js.map