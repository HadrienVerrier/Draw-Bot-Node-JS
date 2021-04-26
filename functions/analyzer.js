const Jimp = require("jimp");
const { colorReduce } = require("./colors");
const robot = require("robotjs");

robot.setMouseDelay(1);
module.exports.analyzer = (
	src = "https://i.redd.it/t17a50cz0h321.png",
	cursor1 = { x: 800, y: 380 },
	cursor2 = { x: 1394, y: 796 }
) => {
	let width = cursor2.x - cursor1.x;
	let height = cursor2.y - cursor1.y;
	let windows = {
		leftTop: {
			x: cursor1.x,
			y: cursor1.y,
		},
	};
	Jimp.read(
		{
			url: src,
		},
		(err, img) => {
			if (err) throw err;
			img.scaleToFit(width, height);
			let raw = {
				blue: { position: {}, color: { x: 432, y: 411 } },
				cyan: { position: {}, color: { x: 432, y: 460 } },
				darkGreen: { position: {}, color: { x: 342, y: 504 } },
				maroon: { position: {}, color: { x: 388, y: 504 } },
				brown: { position: {}, color: { x: 432, y: 504 } },
				green: { position: {}, color: { x: 342, y: 551 } },
				red: { position: {}, color: { x: 388, y: 551 } },
				orange: { position: {}, color: { x: 432, y: 551 } },
				ocre: { position: {}, color: { x: 342, y: 598 } },
				magenta: { position: {}, color: { x: 388, y: 598 } },
				purple: { position: {}, color: { x: 432, y: 598 } },
				yellow: { position: {}, color: { x: 342, y: 654 } },
				pink: { position: {}, color: { x: 388, y: 654 } },
				lightPink: { position: {}, color: { x: 432, y: 654 } },
				black: { position: {}, color: { x: 342, y: 411 } },
				darkGrey: { position: {}, color: { x: 388, y: 411 } },
				lightGrey: { position: {}, color: { x: 388, y: 460 } },
				white: { position: {}, color: { x: 342, y: 460 } },
			};
			for (let pixelH = 0; pixelH < img.bitmap.height; pixelH++) {
				Object.defineProperty(raw.blue.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.cyan.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.darkGreen.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.maroon.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.brown.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.green.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.red.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.orange.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.ocre.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.magenta.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.purple.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.yellow.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.pink.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.lightPink.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.black.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.darkGrey.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.lightGrey.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});
				Object.defineProperty(raw.white.position, "line_" + pixelH, {
					value: [],
					configurable: true,
					enumerable: true,
					writable: true,
				});

				for (let pixelW = 0; pixelW < img.bitmap.width; pixelW++) {
					let c = Jimp.intToRGBA(img.getPixelColor(pixelW, pixelH));

					if (c.a > 10) {
						let pixel = colorReduce(c);
						raw[pixel.color].position["line_" + pixelH].push(pixelW);
					}
				}
			}

			// let t0 = Date.now();
			// let t1;
			for (key in raw) {
				let color = raw[key];
				let { x, y } = color.color;

				robot.moveMouse(x, y);
				robot.mouseClick();

				for (kKey in color.position) {
					let mode = 2;
					let line = color.position[kKey];
					let y = kKey.split("_")[1];
					y = parseInt(y);
					if (line.length === 0) {
						delete raw[key].position[kKey];
					} else {
						let i = 0;
						while (i < line.length) {
							let start = line[i];
							if (line[i] + mode == line[i + mode]) {
								while (line[i] + mode == line[i + mode]) {
									i = i + mode;
								}
								robot.moveMouse(windows.leftTop.x + start, windows.leftTop.y + y);
								robot.mouseToggle("down");
								robot.dragMouse(windows.leftTop.x + line[i], windows.leftTop.y + y);
								robot.mouseToggle("up");
							} else {
								robot.moveMouse(windows.leftTop.x + start, windows.leftTop.y + y);
								robot.mouseClick();
								i = i + mode;
							}
							// t1 = Math.floor((Date.now() - t0) / 1000);
							// t1 > 30 ? process.exit(1) : true;
						}
					}
				}
			}
		}
	);
};
