// Partner With Us – Complete Fixed Script
// FULL FILE (ready to paste)
// Validation + Whitespace Trim + Fake Backend + Success Toast

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".partner-form");
    const toast = document.getElementById("partner-success-toast");

    if (!form || !toast) return;

    // Disable native browser tooltips (we use custom validation)
    form.noValidate = true;

    // Required fields
    const requiredFields = [
        "restaurantName",
        "ownerName",
        "email",
        "phone",
        "city",
        "cuisine"
    ];

    // Clear previous inline errors
    function clearErrors() {
        form.querySelectorAll(".field-error").forEach(el => el.remove());
        form.querySelectorAll("[aria-invalid='true']").forEach(el => {
            el.removeAttribute("aria-invalid");
            el.setCustomValidity("");
        });
    }

    // Show an inline error under a field
    function showFieldError(field, message) {
        field.setAttribute("aria-invalid", "true");
        field.setCustomValidity(message);

        const error = document.createElement("div");
        error.className = "field-error";
        error.style.color = "red";
        error.style.fontSize = "13px";
        error.style.marginTop = "4px";
        error.textContent = message;

        field.insertAdjacentElement("afterend", error);
    }

    // Trim values from form
    function getTrimmedData() {
        const data = {};
        new FormData(form).forEach((value, key) => {
            data[key] = value.trim();
        });
        return data;
    }

    // Validate required fields
    function validateForm(data) {
        let valid = true;

        requiredFields.forEach(name => {
            const field = form.querySelector(`[name="${name}"]`);
            const value = data[name];

            if (!value || value.trim().length === 0) {
                showFieldError(field, "This field is required");
                valid = false;
            }
        });

        return valid;
    }

    // Show success toast
    function showToast() {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }

    // Fake backend so success works without server
    async function sendFakeSuccess() {
        return new Response(
            JSON.stringify({ ok: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    // On submit
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearErrors();

        const data = getTrimmedData();

        // Validation
        if (!validateForm(data)) {
            return;
        }

        // Simulated backend (works without server!)
        const resp = await sendFakeSuccess();

        if (resp.ok) {
            form.reset();
            showToast();
        } else {
            console.warn("Submission failed (simulated)");
        }
    });

    // Force caret visibility on click (fix invisible cursor bug)
    form.querySelectorAll("input, textarea").forEach(el => {
        el.addEventListener("mousedown", ev => {
            ev.preventDefault();
            el.focus();
            try {
                const len = el.value.length;
                el.setSelectionRange(len, len);
            } catch (e) {}
        });
    });
});
