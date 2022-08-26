let relationBtn = document.querySelector("#add-relation");
let selectPerson1 = document.querySelector(".person1");
let selectPerson2 = document.querySelector(".person2");

async function addValueToSelect() {
  let data = await fetch("/person");
  let persons = await data.json();
  render(persons);
}

function render(data) {
  //could've done with for loop but will do later if have time.
  data.forEach((x) => {
    let options = document.createElement("option");
    options.text = x.name;
    options.value = x.name;
    selectPerson1.appendChild(options);
  });
  data.forEach((x) => {
    let options = document.createElement("option");
    options.text = x.name;
    options.value = x.name;
    selectPerson2.appendChild(options);
  });
}

addValueToSelect();

relationBtn.addEventListener("click", () => {
  let select1 = selectPerson1.value;
  let select2 = selectPerson2.value;
  if (select1 == select2) {
    alert("Cannot make yourself friend");
    return;
  }
  let data = { select1, select2 };
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch("/relation", options)
    .then((res) => res.json())
    .then((msz) => alert(msz.status))
    .catch((err) => console.log(err));
});
