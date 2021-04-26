const { colors } = require("../data/colors");
module.exports.colorReduce = (pixel) => {
	let sum = [];
	Array.prototype.hasMin = function (attrib) {
		return (
			(this.length &&
				this.reduce(function (prev, curr) {
					return prev[attrib] < curr[attrib] ? prev : curr;
				})) ||
			null
		);
	};
	for (let key in colors) {
		let r1 = colors[key].r;
		let g1 = colors[key].g;
		let b1 = colors[key].b;
		let r2 = pixel.r;
		let g2 = pixel.g;
		let b2 = pixel.b;

		let sumOfSquares = 0;
		sumOfSquares += Math.pow(r1 - r2, 2);
		sumOfSquares += Math.pow(g1 - g2, 2);
		sumOfSquares += Math.pow(b1 - b2, 2);
		sum.push({
			color: key,
			value: Math.sqrt(sumOfSquares),
			r: r1,
			g: g1,
			b: b1,
		});
	}
	return sum.hasMin("value");
};
