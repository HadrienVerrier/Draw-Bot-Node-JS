$(document).ready(function () {
	$(".mouse-define button").on("click", function () {
		$.ajax({
			url: "http://localhost:3000/mouse",
			type: "GET",
			success: function (data) {
				console.log(data);
			},
		});
	});

	$("input").on("input", function () {
		let val = $(this).val();
		let data = {};
		data.image = val;
		$.ajax({
			url: "http://localhost:3000/image",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function (data) {
				console.log(data);
			},
		});
	});

	$("div:last-child button").on("click", function () {
		$.ajax({
			url: "http://localhost:3000/draw",
			type: "GET",
			success: function (data) {
				console.log(data);
			},
		});
	});
});
