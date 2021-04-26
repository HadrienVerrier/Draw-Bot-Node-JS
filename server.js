const { analyzer } = require("./functions/analyzer");
const express = require("express");
const app = express();
const cors = require("cors");
const iohook = require("iohook");
app.use(express.json());

//CORS
const corsOptions = {
	origin: "http://127.0.0.1:5500",
	credentials: true,
	allowedheaders: ["sessionId", "Content-Type"],
	exposedHeaders: ["sessionId"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
};
let src, cursor1, cursor2;

app.use(cors(corsOptions));

const start = async () => {
	console.log("Start");
	await analyzer(src, cursor1, cursor2);
	console.log("fin");
};

app.get("/mouse", (req, res) => {
	let first = true;
	iohook.start();
	iohook.on("mousedown", (event) => {
		if (first && first != "undefined") {
			cursor1 = { x: event.x, y: event.y };
			first = false;
		} else if (!first && first != "undefined") {
			first = "undefined";
			cursor2 = { x: event.x, y: event.y };
		} else {
			iohook.stop();
		}
	});

	cursor2 = req.body.cursor2;
	res.status(200).send("ok");
});

app.post("/image", (req, res) => {
	src = req.body.image;
	res.status(200).send("Image acquise");
});

app.get("/draw", (req, res) => {
	setTimeout(() => {
		start();
		res.status(200).send("ok");
	}, 1000);
});
app.listen(3000, () => {
	console.log("Listening on port 3000");
});
