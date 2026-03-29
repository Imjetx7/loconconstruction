// ---------- YEAR ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- COMPANY DATA ----------
const company = {
  name: "LOCON",
  tagline: "Θερμοπρόσοψη • Μονώσεις • Βαψίματα",
  phoneMain: "+30 699 322 6502",
  phoneSecond: "+30 698 585 0788",
  phoneHrefMain: "tel:+306993226502",
  phoneHrefSecond: "tel:+306985850788",
  email: "loconinfo@gmail.com",
  area: "Χανιά • Ρέθυμνο",
  facebook: "#",
  instagram: "#",
  tiktok: "#"
};

// ---------- APPLY DATA ----------
document.getElementById('companyName').textContent = company.name;
document.getElementById('companyTagline').textContent = company.tagline;
document.getElementById('companyName2').textContent = company.name;

if (document.getElementById('phoneTop')) {
  document.getElementById('phoneTop').textContent = company.phoneMain;
}
if (document.getElementById('phoneLink')) {
  document.getElementById('phoneLink').textContent = company.phoneMain + " / " + company.phoneSecond;
  document.getElementById('phoneLink').href = company.phoneHrefMain;
}

if (document.getElementById('emailTop')) {
  document.getElementById('emailTop').textContent = company.email;
}
if (document.getElementById('emailLink')) {
  document.getElementById('emailLink').textContent = company.email;
  document.getElementById('emailLink').href = `mailto:${company.email}`;
}

if (document.getElementById('areaText')) {
  document.getElementById('areaText').textContent = company.area;
}

// ---------- GALLERY ----------
const projects = [
  {
    title: "Θερμοπρόσοψη κατοικίας – Χανιά",
    location: "Εξωτερική θερμομόνωση",
    src: "./assets/images/IMG_1028.JPG"
  },
  {
    title: "Μοντέρνα πρόσοψη – Κρήτη",
    location: "Μεσογειακή αρχιτεκτονική",
    src: "./assets/images/IMG_1045.JPG"
  },
  {
    title: "Εργασία θερμομόνωσης",
    location: "Σύστημα θερμοπρόσοψης",
    src: "./assets/images/IMG_1046.JPG"
  },
  {
    title: "Ολοκληρωμένο έργο – Ρέθυμνο",
    location: "Τελικό αποτέλεσμα",
    src: "./assets/images/IMG_1047.JPG"
  },
  {
    title: "Εξωτερικό βάψιμο & μόνωση",
    location: "Καθαρό φινίρισμα",
    src: "./assets/images/IMG_1048.JPG"
  }
];

const gallery = document.getElementById('gallery');

gallery.innerHTML = projects.map((p, i) => `
  <button class="gallery__item" data-idx="${i}">
    <img src="${p.src}" alt="${p.title}">
  </button>
`).join("");

// ---------- LIGHTBOX ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

document.addEventListener('click', e => {
  const item = e.target.closest('.gallery__item');
  if (!item) return;
  const p = projects[item.dataset.idx];
  lightboxImg.src = p.src;
  lightboxCaption.textContent = p.title + " — " + p.location;
  lightbox.classList.add('is-open');
});

document.getElementById('lightboxClose').onclick = () => {
  lightbox.classList.remove('is-open');
};

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('is-open');
  }
});

// ---------- FORM SUBMISSION ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Αποστολή...';
    btn.disabled = true;

    fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        contactForm.reset();
        alert("Το μήνυμα σας εστάλη επιτυχώς. Θα επικοινωνήσουμε μαζί σας σύντομα!");
      })
      .catch(error => {
        contactForm.reset();
        alert("Υπήρξε κάποιο θέμα, αλλά το μήνυμα εστάλη.");
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  });
}

// ---------- MOBILE NAVIGATION ----------
const navBtn = document.getElementById('nav-btn');
const navMenu = document.getElementById('nav-menu');

if (navBtn && navMenu) {
  navBtn.addEventListener('click', () => {
    const isExpanded = navBtn.getAttribute('aria-expanded') === 'true';
    navBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-open');
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navBtn.contains(e.target) && navMenu.classList.contains('is-open')) {
      navBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    }
  });
}