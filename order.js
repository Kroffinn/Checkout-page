document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.querySelector(".btn-form-2 button"); 
    const addressBox = document.querySelector(".delivery-discription"); 
    const deliveryDetails = document.querySelector(".delivery-details");
    let summaryBox = null; 

    function saveToLocalStorage(data) {
        localStorage.setItem("formData", JSON.stringify(data));
    }
    
    function loadFromLocalStorage() {
        const storedData = localStorage.getItem("formData");
        return storedData ? JSON.parse(storedData) : null;
    }

    saveButton.addEventListener("click", function () {
        const formData = {
            firstName: document.querySelector('input[placeholder="First Name"]').value.trim(),
            lastName: document.querySelector('input[placeholder="Last Name"]').value.trim(),
            email: document.querySelector('input[placeholder="E-mail"]').value.trim(),
            phone: document.querySelector('input[placeholder="Phone Number"]').value.trim(),
            address: document.querySelector('textarea[placeholder="Address (Area & Street)"]').value.trim(),
            city: document.querySelector('input[placeholder="City/District/Town"]').value.trim(),
            pincode: document.querySelector('input[placeholder="Pincode"]').value.trim(),
            remark: document.querySelector('textarea[placeholder="Remark"]').value.trim()
        };

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
            alert("Please fill in all required fields!");
            return;
        }

        saveToLocalStorage(formData);

        if (summaryBox) {
            summaryBox.remove();
        }

        summaryBox = document.createElement("div");
        summaryBox.classList.add("summary-box");
        summaryBox.innerHTML = `
            <div class="summary-content">
                <div class="after-change">
                    <p><strong>${formData.firstName} ${formData.lastName}</strong>, ${formData.address}, ${formData.city} - <strong>${formData.pincode}</strong>, Phone: ${formData.phone}, Email: ${formData.email}</p>
                    <p><em>Remark:</em> ${formData.remark || "No remark added"}</p>
                </div>
                <div class="change-btn"><button class="edit-address">Change</button></div>
            </div>
        `;

        addressBox.style.display = "none";
        deliveryDetails.appendChild(summaryBox);

        document.querySelector(".edit-address").addEventListener("click", function () {
            addressBox.style.display = "block"; 
            summaryBox.remove();
        });
    });

    const storedData = loadFromLocalStorage();
    if (storedData) {
        document.querySelector('input[placeholder="First Name"]').value = storedData.firstName;
        document.querySelector('input[placeholder="Last Name"]').value = storedData.lastName;
        document.querySelector('input[placeholder="E-mail"]').value = storedData.email;
        document.querySelector('input[placeholder="Phone Number"]').value = storedData.phone;
        document.querySelector('textarea[placeholder="Address (Area & Street)"]').value = storedData.address;
        document.querySelector('input[placeholder="City/District/Town"]').value = storedData.city;
        document.querySelector('input[placeholder="Pincode"]').value = storedData.pincode;
        document.querySelector('textarea[placeholder="Remark"]').value = storedData.remark;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");
    const quantityInput = document.getElementById("quantity");

    increaseBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    decreaseBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("quantity-btn")) {
            const quantityInput = event.target.closest(".inc-dec").querySelector(".quantity-input");
            let currentValue = parseInt(quantityInput.value);

            if (event.target.id === "increase") {
                quantityInput.value = currentValue + 1;
            } else if (event.target.id === "decrease" && currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        }
        if (event.target.classList.contains("btn-delete")) {
            const summaryBox = event.target.closest(".summary-details"); 
            if (summaryBox) {
                summaryBox.remove(); 
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const continueBtnContainer = document.querySelector(".continue-btn-class");
    const continueBtn = document.querySelector(".continue-btn");
    const summaryDetails = document.querySelectorAll(".summary-details");

    continueBtn.addEventListener("click", function () {
        const count = summaryDetails.length;

        summaryDetails.forEach(detail => {
            detail.style.display = "none";
        });

        continueBtnContainer.style.display = "none";

        const summaryBox = document.createElement("div");
        summaryBox.classList.add("summary-box");
        summaryBox.innerHTML = `
            <div class="summary-content">
                <div class="summary-content">
                <p>Order Summary (${count} items)</p>
            </div>
            <div><button class="change-btn edit-address">Change</button></div>
            </div>
        `;

        const parentContainer = document.querySelector(".order-summary");
        parentContainer.appendChild(summaryBox);

        summaryBox.querySelector(".change-btn").addEventListener("click", function () {
            summaryDetails.forEach(detail => {
                detail.style.display = "block";
            });
            continueBtnContainer.style.display = "block";
            summaryBox.remove();
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const deliverHereBtn = document.querySelector(".btn-form-2 button"); 
    const continueBtn = document.querySelector(".continue-btn");
    const summaryDetails = document.querySelectorAll(".summary-details");
    const continueBtnContainer = document.querySelector(".continue-btn-class");
    const paySection = document.querySelector(".pay");

    summaryDetails.forEach(detail => detail.style.display = "none");
    continueBtnContainer.style.display = "none";
    paySection.style.display = "none";

    deliverHereBtn.addEventListener("click", function () {
        summaryDetails.forEach(detail => detail.style.display = "block");
        continueBtnContainer.style.display = "block";
    });

    continueBtn.addEventListener("click", function () {
        summaryDetails.forEach(detail => detail.style.display = "none");
        continueBtnContainer.style.display = "none";
        paySection.style.display = "block";
    });
});
