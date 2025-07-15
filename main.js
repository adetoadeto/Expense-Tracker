function addMore() {
    const parentElement = document.querySelector(".expense-list");
    const form = document.createElement("form");
    form.setAttribute("class", "expense-list_item");
    form.innerHTML = ` 
     <label>
     <i class="fa-solid fa-bag-shopping"></i>
     </label>
    <input required placeholder="Enter expense name" class="expense-name" maxlength="30" />
    <input required type="number" placeholder="Price" class="price" maxlength="10">
    <button class="trash" onclick="remove(this)"><i class="fa-solid fa-trash "></i></button>`
    parentElement.appendChild(form);
}

function calculate() {
    let monthlyIncome = parseInt(document.querySelector("#monthly-income").value);

    const prices = document.querySelectorAll(".price");

    let totalExpense = 0;

    for (let price of prices) {
        totalExpense += (+price.value);
    }

    const balance = (monthlyIncome - totalExpense).toLocaleString('en-US');


    const BALANCE = document.querySelector("#total-balance");
    const EXPENSES = document.querySelector("#total-expenses");
    const INCOME = document.querySelector("#total-income");

    BALANCE.textContent = `${balance}`;
    EXPENSES.textContent = `${totalExpense.toLocaleString('en-US')}`;
    INCOME.textContent = `${monthlyIncome.toLocaleString('en-US')}`;



}

function remove(element) {
    element.closest(".expense-list_item").remove(); 
}