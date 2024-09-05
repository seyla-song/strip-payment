const btn = document.querySelector("#payment-btn");

btn.addEventListener("click", () => {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 5 },
        { id: 5, quantity: 5 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      console.log("hi");
      window.location = url;
    })
    .catch((e) => {
      console.log(e.error);
    });
});
