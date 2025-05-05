
// Sequential display of words
const words = [
  { id: "namskar", duration: 1000 },
  { id: "hello", duration: 1000 },
  { id: "namaste", duration: 1000 },
  { id: "bonjo", duration: 1000 },
];

let index = 0;

function showNextWord() {
  if (index < words.length) {
    const word = document.getElementById(words[index].id);
    word.classList.add("show"); 

    setTimeout(() => {
      word.classList.remove("show"); 
      index++;
      showNextWord();
    }, words[index].duration + 500); 
  } else {
    // Slide the intro page out
    const intro = document.querySelector(".intro-page");
    intro.classList.add("slide-up");

    setTimeout(() => {
      intro.style.display = "none";
      const main = document.querySelector(".main-page");
      main.style.display = "block"; 
      main.classList.add("slide-down"); 
    }, 1000); 
  }
}

showNextWord();

// navbox selection
const navMap = {
  skills: "page-skills",
  about: "page-about",
  contact: "page-contact",
  projects: "page-projects",
  resume: "page-resume",
};

// Open section on nav click
document.querySelectorAll(".nav-box").forEach((box) => {
  box.addEventListener("click", () => {
    const id = navMap[box.id];
    if (id) document.getElementById(id).classList.add("active");
  });
});

// Close button behavior
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.remove("active");
  });
});

// Animate circles into view main page or intro page left and right circle
const leftCircle = document.querySelector(".circle.left");
const rightCircle = document.querySelector(".circle.right");

window.addEventListener("load", () => {
  leftCircle.style.transform = "translateX(-45%)";
  rightCircle.style.transform = "translateX(50%)";
});

// about section typing animation
document.addEventListener("DOMContentLoaded", function () {
  const words = [
    "Web Developer",
    "Frontend Developer",
    "Full stack developer",
    "Mern stack developer",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = "";
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newWordDelay = 2000;

  function type() {
    if (charIndex < words[wordIndex].length) {
      currentWord += words[wordIndex].charAt(charIndex);
      document.querySelector(".typing-animation").textContent = currentWord;
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      currentWord = currentWord.slice(0, -1);
      document.querySelector(".typing-animation").textContent = currentWord;
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed + 1100);
    }
  }

  type();
});

// skill section animation
document.getElementById("skills").addEventListener("click", () => {
  
  const page = document.getElementById("page-skills");
  page.style.display = "block";

  // Animate circles
  gsap.from(".skill-circle", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });
});

// contact me script

// Access global emailjs & config
emailjs.init(EMAILJS_CONFIG.USER_ID);

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("loading-spinner").style.display = "flex";

  const emailParams = {
    from_name: form.from_name.value,
    from_email: form.email_id.value,
    message: form.message.value,
  };

  emailjs
    .send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
    .then(() => {
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("success-modal").style.display = "flex";
      setTimeout(() => {
        document.getElementById("success-modal").style.display = "none";
      }, 3000);
      form.reset();
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("error-modal").style.display = "flex";
      setTimeout(() => {
        document.getElementById("error-modal").style.display = "none";
      }, 3000);
    });
});





