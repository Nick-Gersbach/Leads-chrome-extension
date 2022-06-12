let myLeads = [""];
const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

saveBtn.addEventListener("click", saveLead);
saveTabBtn.addEventListener("click", saveTab);
deleteBtn.addEventListener("dblclick", deleteLeads);

//Get leads out of local storage and render them on the page

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function saveLead() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  //Send leads to local storage
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem("myLeads"));
}

function saveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
}

function deleteLeads() {
  localStorage.clear();
  myLeads = [""];
  ulEl.innerHTML = "";
}

function render(leads) {
  let listItems = "";

  for (i = 0; i < leads.length; i++) {
    console.log(leads[i]);
    listItems += `
    <li>
    <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}
