function dqs<T = Element>(selector: string) {
  return document.querySelector(selector) as T;
}

const modal = dqs(".modal");
const overlay = dqs(".overlay");
const btnCloseModal = dqs(".btn--close-modal");
const btnScrollTo = dqs(".btn--scroll-to");
const section1 = dqs("#section--1");
const nav = dqs(".nav");
const tabsContainer = dqs(".operations__tab-container");

const modalForm = dqs<HTMLFormElement>(".modal__form");

const tabs = document.querySelectorAll(".operations__tab");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabsContent = document.querySelectorAll(".operations__content");

// Modal window
modalForm.reset();

const openModal = function (e: Event) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", function () {
  // const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     dqs(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

dqs(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  const navLink = e.target as Element;
  if (navLink.classList.contains("nav__link")) {
    const id = navLink.getAttribute("href") as string;
    dqs(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = (e.target as Element).closest(
    ".operations__tab"
  ) as HTMLElement;

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  dqs(`.operations__content--${clicked.dataset.tab}`).classList.add(
    "operations__content--active"
  );
});

///////////////////////////////////////
// Menu fade animation
const handleHover = function (this: number, e: Event) {
  const link = e.target as Element;
  if (link.classList.contains("nav__link")) {
    const siblings = link.closest(".nav")?.querySelectorAll(".nav__link");
    const logo = link.closest(".nav")?.querySelector("img");

    siblings?.forEach((el: Element) => {
      if (el !== link) (el as HTMLElement).style.opacity = this.toString();
    });
    if (logo) logo.style.opacity = this.toString();
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = dqs(".header");
const navHeight = nav.getBoundingClientRect().height;
const navLogo = dqs<HTMLImageElement>(".nav__logo");

const stickyNav: IntersectionObserverCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    navLogo.src = "img/logo.png";
  } else {
    nav.classList.remove("sticky");
    navLogo.src = "img/logo_white.png";
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection: IntersectionObserverCallback = function (
  entries,
  observer
) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading images
/* const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg: IntersectionObserverCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  const loadingImg = entry.target as HTMLImageElement;
  // Replace src with data-src
  const imgUrl = new URL(
    (".." + loadingImg.dataset.src) as string,
    import.meta.url
  ).href;
  console.log(imgUrl, loadingImg.dataset.src);
  loadingImg.src = imgUrl;

  loadingImg.addEventListener("load", function () {
    loadingImg.classList.remove("lazy-img");
  });

  observer.unobserve(loadingImg);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "400px",
});

imgTargets.forEach((img) => imgObserver.observe(img)); */

///////////////////////////////////////
// Contact Info

declare namespace Email {
  type Attachment =
    | {
        name: string;
        path: string;
      }
    | {
        name: string;
        data: string; // base64 format
      };

  interface EmailData {
    Host: string;
    Password: string;
    Username: string;
    To: string;
    From: string;
    Subject: string;
    Body: string;
    Attachments?: Attachment[];
  }

  function send(email: EmailData): Promise<string>;
}

const submitForm = function (e: SubmitEvent) {
  e.preventDefault();

  let name = dqs<HTMLInputElement>(".name").value;
  let email = dqs<HTMLInputElement>(".email").value;
  let subject = dqs<HTMLInputElement>(".subject").value;
  let message = dqs<HTMLInputElement>(".message").value;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "torricofabrizio27@gmail.com",
    To: "torricofabrizio27@gmail.com",
    From: "torricofabrizio27@gmail.com",
    Password: "58786E9B8910DE3F023EA4AE2D1E53425083",
    Subject: `${name} contesto tu portfolio, ${subject}`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message:  ${message}`,
  }).then((message: string) => {
    if (message !== "OK") {
      alert(message);
      return;
    }
    modalForm.reset();
    modal.setAttribute("id", "modal--take-off");
    setTimeout(() => {
      closeModal();
      alert("Message sent succesfully");
      modal.removeAttribute("id");
    }, 1500);
  });
};

modalForm.addEventListener("submit", submitForm);
