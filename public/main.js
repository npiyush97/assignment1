let addPersonBtn = document.querySelector("#add-person-btn");

addPersonBtn.addEventListener("click", () => {
  let name = document.querySelector("#person").value;
  let obj = { name: name };
  if (name) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("/person", options)
      .then((res) => res.json())
      .then((msz) => {
        alert(msz.status);
      })
      .catch((err) => console.log(err));
  } else {
    alert("Please enter name");
  }
});
