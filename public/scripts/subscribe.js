window.addEventListener("load", function () {
	const id = "subscribe-form";
	const form = document.getElementById(id);

	if (form !== null) {
		const fieldset = form.querySelector(".subscribe-form__group");
		const pristine = new window.Pristine(form, {
			classTo: "subscribe-form__group",
			errorClass: "subscribe-form__group--invalid",
			successClass: "subscribe-form__group--valid",
			errorTextParent: "subscribe-form__error",
			errorTextTag: "div",
			errorTextClass: "subscribe-form__error--text",
		});

		const pendingStart = () => {
			if (fieldset !== null) {
				fieldset.setAttribute("disabled", "");
			}
		};
		const pendingStop = () => {
			if (fieldset !== null) {
				fieldset.removeAttribute("disabled");
			}
		};

		const showAlert = (params) => {
			const className = params.success
				? "swal-message--success"
				: "swal-message--error";
			window.Swal.fire({
				title: params.title,
				html: `<p class="swal-message ${className} typography typography--base">${params.message}</p>`,
				showCloseButton: true,
				showConfirmButton: false,
			});
		};

		const resetEmail = () => {
			form.elements.email.value = "";
		};

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			const valid = pristine.validate();
			console.log("form is valid", valid);

			if (valid) {
				const body = new FormData(form);
				pendingStart();
				fetch("https://intensive-f1-rest.vercel.app/api/subscribe", {
					method: "POST",
					body,
				})
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						showAlert({
							title: result.title,
							message: result.message,
							success: result.success,
						});
						if (result.success) {
							resetEmail();
						}
					})
					.catch((error) => {
						showAlert({
							title: "Системна помилка",
							message: err,
							success: false,
						});
					})
					.finally(() => {
						pendingStop();
					});
			}
		});
	} else {
		console.log(`Form with id "${id}" is not found`);
	}
});
