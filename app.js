  document.querySelector("nav .burger .inside #burger").addEventListener("change", ev => {
    document.querySelector("nav .color-change").classList[["add", "remove"][Number(!document.querySelector("nav .burger .inside #burger").checked)]]("show");
  })

