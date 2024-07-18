const customers = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Aya Elsayed" },
  { id: 3, name: "Mina Adel" },
  { id: 4, name: "Sarah Reda" },
  { id: 5, name: "Mohamed Sayed" },
];

const transactions = [
  { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
  { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
  { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
  { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
  { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
  { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
  { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
  { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
  { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
];

function filterTransactions() {
  const selectedDate = document.getElementById("dateRange").value;
  if (selectedDate) {
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.date === selectedDate;
    });

    createChart(filteredTransactions);
  } else {
    alert("Please select a date.");
  }
}

const chart = () => {
  const ctx = document.getElementById("myChart");
  let filterByDate = [...transactions];


  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["500", "1000", "1500", "2000", "above 2000"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const filterByDate = () => {
  let numericFilterData = document.getElementById("myDate");
  numericFilterData.selectedIndex = 0;
  let filteredTransactions = [...transactions];

  numericFilterData.addEventListener("change", function () {
    // const number = items.value.match(/\d+/g).map(Number);
    const range = numericFilterData.value.split("-");
    // console.log(number[0], number[1]);
    if (range && range.length > 1) {
      filteredTransactions = transactions.filter(
        (d) => d.amount >= range[0] && d.amount <= range[1]
      );
    } else if (range) {
      filteredTransactions = transactions.filter((d) => d.amount > 2000);
    }

    transactionsList(filteredTransactions);
  });
};

// create table
function transactionsList(filteredTransactions = [], customer_id = 0) {
  // table item
  const transactionsDiv = document.getElementById("tableTransaction");
  transactionsDiv.innerHTML = "";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Date</th>
    <th>Amount</th>
  </tr>`;

  let customersItems = [...customers];

  if (customer_id) {
    customersItems = customers.filter((x) => x.id == customer_id);
  }

  if (filteredTransactions.length == 0) {
    let numericFilterData = document.getElementById("myDate");
    numericFilterData.selectedIndex = 0;
    for (let person of customersItems) {
      const personTransactions = transactions.filter(
        (x) => x.customer_id == person.id
      );
      for (let item of personTransactions) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td> ${person.name}</td>
        <td>${item.date}</td>
        <td>${item.amount}</td>`;
        tbody.appendChild(row);
      }
    }
  } else {
    for (let item of filteredTransactions) {
      const row = document.createElement("tr");
      console.log(customersItems.find((x) => x.id == item.customer_id));
      row.innerHTML = `
      <td> ${customersItems.find((x) => x.id == item.customer_id).name}</td>
      <td>${item.date}</td>
      <td>${item.amount}</td>`;
      tbody.appendChild(row);
    }
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  transactionsDiv.appendChild(table);
}

function populateTable(customerId) {
  transactionsList([], customerId);
}

// create button to filter
const fillButtons = () => {
  const namePerson = document.getElementById("namePerson");
  namePerson.innerHTML = "";
  // to get all data
  const button = document.createElement("button");
  button.innerText = "All";
  button.style.background = "red";
  button.style.padding = "10px";
  button.style.margin = "5px";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.fontWeight = "bold";

  namePerson.appendChild(button);

  // Add event listener to get all data
  button.addEventListener("click", function () {
    populateTable();
  });

  // to get selected data by name
  for (let p of customers) {
    const button = document.createElement("button");
    button.innerText = p.name;
    button.style.background = "red";
    button.style.padding = "10px";
    button.style.margin = "5px";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.fontWeight = "bold";

    namePerson.appendChild(button);
    // Add event listener to filter table on button click
    button.addEventListener("click", function () {
      populateTable(p.id);
    });
  }
};
chart();
filterByDate();
transactionsList();
fillButtons();
