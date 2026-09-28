const billingToggle = document.getElementById("billingToggle");
const prices = document.querySelectorAll(".price");
const periods = document.querySelectorAll(".period");

billingToggle.addEventListener("change", function () {

    prices.forEach(function(price, index) {

        if (billingToggle.checked) {
            price.textContent = price.dataset.yearly;
            periods[index].textContent = "/year";
        } else {
            price.textContent = price.dataset.monthly;
            periods[index].textContent = "/month";
        }

    });
});
