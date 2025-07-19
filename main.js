const parentElement = document.querySelector(".expense-list");
const BALANCE = document.querySelector("#total-balance");
const EXPENSES = document.querySelector("#total-expenses");
const INCOME = document.querySelector("#total-income");
const MONTHLY_INCOME = document.querySelector("#monthly-income");

window.addEventListener('DOMContentLoaded', () => {
    loadData();
});

function addItem(expenseName, price) {
    const form = document.createElement("form");
    form.setAttribute("class", "expense-list_item");
    form.innerHTML = ` 
     <label>
     <i class="fa-solid fa-bag-shopping"></i>
     </label>
    <input required placeholder="Enter expense name" class="expense-name" maxlength="30" value=${expenseName ? expenseName : ""} >
    <input required type="number" placeholder="Price" class="price" value=${price} >
    <button class="trash" onclick="remove(this)"><i class="fa-solid fa-trash "></i></button>`
    parentElement.appendChild(form);
}

function calculate() {
    let monthlyIncome = MONTHLY_INCOME.value;

    const expenseName = document.querySelectorAll(".expense-name");
    const prices = document.querySelectorAll(".price")

    // Check for empty fields
    if (monthlyIncome.trim() === "") {
        alert("Please input your monthly income");
    }

    for (let item of expenseName) {
        if (item.value.trim() === "") {
            alert("Please enter a valid name");
        }
    }
    console.log(prices)
    // Calculate data
    let totalExpense = 0;
    for (let price of prices) {
        if ((price.value).trim() === "") {
            alert("please enter a value");
        }
        totalExpense += (+price.value);
    }
    const balance = (+monthlyIncome - totalExpense).toLocaleString('en-US');

    // Output data
    BALANCE.textContent = `${balance}`;
    EXPENSES.textContent = `${totalExpense.toLocaleString('en-US')}`;
    INCOME.textContent = `${monthlyIncome.toLocaleString('en-US')}`;

    storeData();
}

function remove(element) {
    element.closest(".expense-list_item").remove();
}

function clearAll() {
    const expenseName = document.querySelectorAll(".expense-name");
    const prices = document.querySelectorAll(".price")
    localStorage.clear();

    for (let name of expenseName) {
        console.log(name)
        name.value = "";
    }
    for (let price of prices) {
        price.value = ""
    }

    BALANCE.textContent = "-";
    EXPENSES.textContent = "-";
    INCOME.textContent = "-";
    MONTHLY_INCOME.value = "";
}

function storeData() {
    // income, expense and balance output
    const result = {
        balance: BALANCE.textContent,
        expenseTotal: EXPENSES.textContent,
        income: INCOME.textContent,
    };

    // list of expense names and prices
    const list = [];
    document.querySelectorAll(".expense-list_item").forEach((form) => {
        const expenseName = form.querySelector(".expense-name").value;
        const price = form.querySelector(".price").value;
        list.push({ expenseName, price });
    })
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("result", JSON.stringify(result));
    console.log(result)
}

function loadData() {
    const savedList = JSON.parse(localStorage.getItem("list")) || [];

    savedList.forEach((input) => addItem(input.expenseName, input.price));

    const savedResult = JSON.parse(localStorage.getItem("result"));
    if (savedResult) {
        BALANCE.textContent = savedResult.balance;
        EXPENSES.textContent = savedResult.expenseTotal;
        INCOME.textContent = savedResult.income;
        MONTHLY_INCOME.value = savedResult.income;
    }
}
