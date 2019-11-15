// const allTagInput = document.querySelectorAll("blockquote[data-id-tag]");
const allBtn = document.querySelectorAll("div[data-id-tag]");
const allInputTag = document.querySelectorAll(`blockquote[data-id-tag]`);

// allInputTag.forEach(input => {
//   input.addEventListener("keydown", event => {
//     if (event.key === 13) console.log("enter");
//   });
// });

allBtn.forEach(b => {
  b.onclick = e => {
    const inputNumber = e.target.getAttribute("data-id-tag");
    const inputTag = document.querySelector(`[data-id-tag='${inputNumber}']`);
    inputTag.onfocus = e => {
      inputTag.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
          event.preventDefault();
          inputTag.blur();
          axios
            .patch(`/edit-tag/${inputNumber}`, {
              name: inputTag.textContent.trim()
            })
            .then(apiRes => console.log(apiRes))
            .catch();
        }
      });
    };
    inputTag.focus();
  };
});

// axios.post("/edit-tag", {valeur de ton tag}).then().catch()
