window.addEventListener("load", function () {
	const id = "subscribe-form";
	const form = document.getElementById(id);
	if (form !== null) {
		// create the pristine instance
		const pristine = new window.Pristine(form);

		form.addEventListener("submit", function (e) {
			e.preventDefault();

			//check if the form is valid
			const valid = pristine.validate(); //return true or false
			console.log("form is valid", valid);
		});
	} else {
		console.log(`Form with id "${id}" is not found`);
	}
});
