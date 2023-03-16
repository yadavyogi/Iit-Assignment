const invoicesData = [
  {
    id: 0,
    chemicalName: "Acetone",
    vendor: "ABC Chemicals",
    density: 0.79,
    viscosity: 0.32,
    packaging: "Drum",
    packSize: "200L",
    unit: "kg",
    quantity: 150
  },
  {
    id: 1,
    chemicalName: "Ethanol",
    vendor: "DEF Chemicals",
    density: 0.79,
    viscosity: 0.28,
    packaging: "Can",
    packSize: "20L",
    unit: "L",
    quantity: 50
  },
  {
    id: 2,
    chemicalName: "Methanol",
    vendor: "GHI Chemicals",
    density: 0.79,
    viscosity: 0.22,
    packaging: "Tanker",
    packSize: "10,000L",
    unit: "kg",
    quantity: 5000
  },
  {
    id: 3,
    chemicalName: "Hydrochloric Acid",
    vendor: "JKL Chemicals",
    density: 1.18,
    viscosity: null,
    packaging: "IBC",
    packSize: "1000L",
    unit: "L",
    quantity: 300
  },
  {
    id: 4,
    chemicalName: "Sodium Hydroxide",
    vendor: "MNO Chemicals",
    density: 2.13,
    viscosity: null,
    packaging: "Bag",
    packSize: "25kg",
    unit: "kg",
    quantity: 1000
  },
  {
    id: 5,
    chemicalName: "Acetic Acid",
    vendor: "PQR Chemicals",
    density: 1.05,
    viscosity: 1.22,
    packaging: "Drum",
    packSize: "50L",
    unit: "L",
    quantity: 200
  },
  {
    id: 6,
    chemicalName: "Butanol",
    vendor: "STU Chemicals",
    density: 0.81,
    viscosity: 0.61,
    packaging: "Can",
    packSize: "5L",
    unit: "L",
    quantity: 10
  },
  {
    id: 7,
    chemicalName: "Ethyl Acetate",
    vendor: "VWX Chemicals",
    density: 0.9,
    viscosity: 0.46,
    packaging: "Drum",
    packSize: "200L",
    unit: "L",
    quantity: 100
  },
  {
    id: 8,
    chemicalName: "Methyl Ethyl Ketone",
    vendor: "YZA Chemicals",
    density: 0.81,
    viscosity: 0.47,
    packaging: "IBC",
    packSize: "1000L",
    unit: "L",
    quantity: 500
  }
];

const table = document.getElementById("chemical-table");
const tbody = table.getElementsByTagName("tbody")[0];

const form = document.getElementById("add-chemical-form");
const showBtn = document.getElementById("show-table");
let clickCounter = 0;

let chemicalData =
  JSON.parse(localStorage.getItem("chemicalData")) || invoicesData;

function renderTable() {
  tbody.innerHTML = "";
  chemicalData.forEach((chemical) => {
    const row = document.createElement("tr");
    for (const key in chemical) {
      const cell = document.createElement("td");
      if (key === "id") {
        cell.textContent = chemical[key];
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.value = chemical[key];
        input.setAttribute("data-id", chemical.id);
        input.setAttribute("data-key", key);
        input.addEventListener("change", handleEdit);
        cell.appendChild(input);
      }
      row.appendChild(cell);
    }
    const actions = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-id", chemical.id);
    deleteBtn.addEventListener("click", handleDelete);
    actions.appendChild(deleteBtn);
    row.appendChild(actions);
    tbody.appendChild(row);
  });
}

// Add a new chemical
function handleAdd(event) {
  event.preventDefault();
  const chemical = {
    id: chemicalData.length + 1,
    chemicalName: form.elements.chemicalName.value,
    vendor: form.elements.vendor.value,
    density: form.elements.density.value,
    viscosity: form.elements.viscosity.value,
    packaging: form.elements.packaging.value,
    packSize: form.elements.packSize.value,
    unit: form.elements.unit.value,
    quantity: form.elements.quantity.value
  };
  chemicalData.push(chemical);
  localStorage.setItem("chemicalData", JSON.stringify(chemicalData));
  form.reset();
  renderTable();
}

// Edit a chemical
function handleEdit(event) {
  const id = parseInt(event.target.getAttribute("data-id"));
  const key = event.target.getAttribute("data-key");
  const value = event.target.value;
  const chemical = chemicalData.find((chemical) => chemical.id === id);
  chemical[key] = value;
  localStorage.setItem("chemicalData", JSON.stringify(chemicalData));
}

// Delete a chemical
function handleDelete(event) {
  const id = parseInt(event.target.getAttribute("data-id"));
  const index = chemicalData.findIndex((chemical) => chemical.id === id);
  chemicalData.splice(index, 1);
  localStorage.setItem("chemicalData", JSON.stringify(chemicalData));
  renderTable();
}

form.style.display = "none";
showBtn.addEventListener("click", () => {
  clickCounter++;
  if (clickCounter % 2 === 0) {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
});

form.addEventListener("submit", handleAdd);

// Render the table on page load
renderTable();
