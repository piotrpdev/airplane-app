// index

const bluebtn = document.querySelector(".blue");

bluebtn?.addEventListener("click", () => {
  let readMoreDiv = document.querySelector("#readmore");

  $(readMoreDiv).transition("scale");
});

// airstatsbtn

const airstatsbtn = document.querySelector("#airstatsbtn");
const airstatsdiv = document.querySelector("#airstats");

const userstatsbtn = document.querySelector("#userstatsbtn");
const userstatsdiv = document.querySelector("#userstats");

airstatsbtn?.addEventListener("click", () => {
  $(userstatsdiv).transition("hide");
  $(airstatsdiv).transition("scale");
});

// userstatsbtn

userstatsbtn?.addEventListener("click", () => {
  $(airstatsdiv).transition("hide");
  $(userstatsdiv).transition("scale");
});

// const redbtn = document.querySelector(".red");

// redbtn?.addEventListener("click", () => {
//   let username = prompt("What's your name?");

//   let welcomeUserDiv = document.querySelector("#welcomeuser");

//   $(welcomeUserDiv).transition('scale');
//   welcomeUserDiv.style.cursor = "pointer";

//   welcomeUserDiv.innerHTML = `<p> Hello, ${username}, looking forward to hearing your airlines!.</p><p>Click this message to close it.</p>`;

//   welcomeUserDiv.addEventListener(
//     "click",
//     (e) => {
//       $(welcomeUserDiv).transition('scale');
//     },
//     { once: true }
//   );
// });

// dashboard

const ratebtn = document.querySelector("#rateit");

ratebtn &&
  ratebtn.addEventListener("click", () => {
    let userRating = parseInt(
      prompt("Rate this collection (from 1 to 5 stars)")
    );
    if (userRating > 5 || userRating < 1 || isNaN(userRating)) {
      alert("Try again with a number between 1 and 5!");
    } else {
      document.querySelector("#rating").innerHTML = "You gave a rating of: ";
      for (let i = 0; i < userRating; i++) {
        document.querySelector("#rating").innerHTML +=
          "<i class='yellow star icon'></i>";
      }
    }
  });

$(".delflight").click(() => confirm("Really delete this flight?"));
$(".delairline").click(() => confirm("Really delete this airline?"));

$(".ui.embed").embed();

$(document).ready(function () {
  $(".dropdown").dropdown();
  $("#contact-form").submit(function (e) {
    e.preventDefault();

    $(".ui.basic.modal")
      .modal("setting", "transition", "fade")
      .modal({
        onHide: function () {
          window.location = "/";
        },
      })
      .modal("show");
  });
});
