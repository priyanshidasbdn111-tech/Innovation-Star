document.addEventListener("DOMContentLoaded", function () {

  /*******************************
   * DOM ELEMENTS
   *******************************/
  const tripForm = document.getElementById("trip-form");
  const destinationSelect = document.getElementById("destination");
  const checkInInput = document.getElementById("check-in");
  const checkOutInput = document.getElementById("check-out");
  const travelersInput = document.getElementById("travelers");
  const budgetSelect = document.getElementById("budget");
  const tripPlanContainer = document.getElementById("trip-plan");

  const destinationsSection = document.getElementById("destinations");
  const viewAllBtn = document.getElementById("viewAllDestinations");

  if (!tripForm) {
    console.error("Trip form not found");
    return;
  }

  /*******************************
   * DATE SETUP
   *******************************/
  const today = new Date().toISOString().split("T")[0];
  checkInInput.min = today;

  checkInInput.addEventListener("change", () => {
    checkOutInput.min = checkInInput.value;
    if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
      checkOutInput.value = "";
    }
  });

  /*******************************
   * DESTINATION DATA
   *******************************/
  const destinationPlans = {
    kerala: {
      image: "images/u.png",
      gallery: ["images/u.png"],
      stay: ["Houseboat (Alappuzha)", "Munnar Homestay", "Varkala Resort"],
      food: ["Sadya", "Appam & Stew", "Seafood"],
      transport: ["Auto", "Taxi", "Ferry"],
      famous: ["Munnar", "Alappuzha Backwaters", "Varkala Beach"],
      hidden: ["Kumbalangi Village", "Meesapulimala"],
      recommendedDays: 4,
      avgCost: "₹12,000",
      avgDailyCost: 3000,
      costBreakdown: { stay: 0.55, food: 0.25, transport: 0.1, misc: 0.1 },
      bestTime: "Sep - Mar"
    },
    goa: {
      image: "images/goa.jpg",
      gallery: ["images/goa.jpg", "images/goa1.jpg"],
      stay: ["Beach Shack", "Sea-facing Resort"],
      food: ["Fish Curry Rice", "Bebinca"],
      transport: ["Scooter Rental"],
      famous: ["Baga Beach", "Fort Aguada"],
      hidden: ["Butterfly Beach", "Divar Island"],
      recommendedDays: 3,
      avgCost: "₹10,000",
      avgDailyCost: 3500,
      costBreakdown: { stay: 0.4, food: 0.4, transport: 0.15, misc: 0.05 },
      bestTime: "Oct - Feb"
    },
    rajasthan: {
      image: "images/rajasthan.jpg",
      gallery: ["images/rajasthan.jpg"],
      stay: ["Heritage Haveli", "Desert Camp"],
      food: ["Dal Baati Churma", "Laal Maas"],
      transport: ["Taxi", "Camel Safari"],
      famous: ["Hawa Mahal", "Jaisalmer Fort", "City Palace"],
      hidden: ["Panna Meena Kund", "Kuldhara Village"],
      recommendedDays: 5,
      avgCost: "₹20,000",
      avgDailyCost: 4000,
      costBreakdown: { stay: 0.6, food: 0.2, transport: 0.15, misc: 0.05 },
      bestTime: "Oct - Mar"
    },
    ladakh: {
      image: "images/Ladakh.jpg",
      gallery: ["images/Ladakh.jpg"],
      stay: ["Leh Guesthouse", "Mountain Homestay"],
      food: ["Thukpa", "Momos"],
      transport: ["Bike Rental", "Taxi"],
      famous: ["Pangong Lake", "Nubra Valley"],
      hidden: ["Turtuk Village", "Hemis Monastery"],
      recommendedDays: 6,
      avgCost: "₹25,000",
      avgDailyCost: 4167,
      costBreakdown: { stay: 0.5, food: 0.15, transport: 0.3, misc: 0.05 },
      bestTime: "May - Sep"
    },
    varanasi: {
      image: "images/varanasi.jpg",
      gallery: ["images/varanasi.jpg"],
      stay: ["Ghatside Guesthouse", "City Hotel"],
      food: ["Kachori Sabzi", "Lassi", "Malaiyo"],
      transport: ["E-Rickshaw", "Boat Ride"],
      famous: ["Kashi Vishwanath", "Ganga Aarti", "Sarnath"],
      hidden: ["Ramnagar Fort", "Assi Ghat"],
      recommendedDays: 2,
      avgCost: "₹8,000",
      avgDailyCost: 4000,
      costBreakdown: { stay: 0.35, food: 0.4, transport: 0.15, misc: 0.1 },
      bestTime: "Oct - Mar"
    },
    mumbai: {
      image: "images/mumbai.jpeg",
      gallery: ["images/mumbai.jpeg"],
      stay: ["Colaba Boutique Hotel", "Bandra Sea-facing Hotel", "Budget Guesthouse"],
      food: ["Vada Pav", "Pav Bhaji", "Seafood"],
      transport: ["Local Train", "Taxi", "Auto"],
      famous: ["Gateway of India", "Marine Drive", "Chhatrapati Shivaji Terminus"],
      hidden: ["Banganga Tank", "Sassoon Docks"],
      recommendedDays: 3,
      avgCost: "₹15,000",
      avgDailyCost: 5000,
      costBreakdown: { stay: 0.4, food: 0.3, transport: 0.25, misc: 0.05 },
      bestTime: "Nov - Feb"
    },
    kashmir: {
      image: "images/kashmir.jpg",
      gallery: ["images/kashmir.jpg"],
      stay: ["Houseboat (Dal Lake)", "Hilltop Cottage"],
      food: ["Rogan Josh", "Kashmiri Pulao", "Kahwa"],
      transport: ["Shikara", "Taxi"],
      famous: ["Dal Lake", "Gulmarg", "Pahalgam"],
      hidden: ["Yusmarg", "Aru Valley"],
      recommendedDays: 5,
      avgCost: "₹22,000",
      avgDailyCost: 4400,
      costBreakdown: { stay: 0.5, food: 0.25, transport: 0.2, misc: 0.05 },
      bestTime: "Apr - Oct"
    },
    shimla: {
      image: "images/Shimla.jpg",
      gallery: ["images/Shimla.jpg"],
      stay: ["Heritage Hotel", "Mountain Cabin", "Himachal Homestay"],
      food: ["Chana Madra", "Siddu"],
      transport: ["Taxi", "Shared Jeep"],
      famous: ["The Ridge", "Jakhu Temple", "Mall Road"],
      hidden: ["Tattapani", "Naldehra"],
      recommendedDays: 3,
      avgCost: "₹12,000",
      avgDailyCost: 4000,
      costBreakdown: { stay: 0.45, food: 0.3, transport: 0.2, misc: 0.05 },
      bestTime: "Mar - Jun"
    },
    assam: {
      image: "images/assam.jpg",
      gallery: ["images/assam.jpg"],
      stay: ["Tea Estate Bungalow", "Riverside Resort"],
      food: ["Assamese Thali", "Masor Tenga"],
      transport: ["Boat Ride", "Local Taxi"],
      famous: ["Kaziranga National Park", "Tea Gardens"],
      hidden: ["Majuli Island", "Umananda Temple"],
      recommendedDays: 3,
      avgCost: "₹14,000",
      avgDailyCost: 4667,
      costBreakdown: { stay: 0.4, food: 0.3, transport: 0.2, misc: 0.1 },
      bestTime: "Oct - Apr"
    }
  };

  /*******************************
   * HELPER FUNCTIONS
   *******************************/
  function getNumberOfDays(checkIn, checkOut) {
    return Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
  }

  function validateForm() {
    if (!destinationSelect.value) return "Please select a destination";
    if (!checkInInput.value) return "Please select check-in date";
    if (!checkOutInput.value) return "Please select check-out date";
    if (new Date(checkOutInput.value) <= new Date(checkInInput.value))
      return "Check-out must be after check-in";
    if (!travelersInput.value || travelersInput.value < 1)
      return "Enter valid number of travelers";
    return null;
  }

  /*******************************
   * TRIP PLAN GENERATION
   *******************************/
  function generateTripPlan(destination, days) {
    const plan = destinationPlans[destination];
    let itinerary = [];

    const dailyCost = plan.avgDailyCost || 0;
    const breakdown = plan.costBreakdown || { stay: 0.5, food: 0.3, transport: 0.15, misc: 0.05 };

    for (let i = 0; i < days; i++) {
      const stayCost = Math.round(dailyCost * breakdown.stay);
      const foodCost = Math.round(dailyCost * breakdown.food);
      const transportCost = Math.round(dailyCost * breakdown.transport);
      // ensure total equals dailyCost by assigning remainder to misc
      const miscCost = dailyCost - (stayCost + foodCost + transportCost);

      itinerary.push({
        day: i + 1,
        stay: plan.stay[i % plan.stay.length],
        food: plan.food[i % plan.food.length],
        explore: plan.famous[i % plan.famous.length],
        hidden: plan.hidden[i % plan.hidden.length],
        transport: plan.transport.join(", "),
        dailyCost: dailyCost,
        breakdown: {
          stay: stayCost,
          food: foodCost,
          transport: transportCost,
          misc: miscCost
        }
      });
    }
    return itinerary;
  }

  /*******************************
   * DISPLAY TRIP PLAN
   *******************************/
  function displayTripPlan(itinerary, destination, travelers) {
    const destData = destinationPlans[destination];
    const people = Math.max(1, parseInt(travelers, 10) || 1);

    // totals per person
    const totalsPerPerson = itinerary.reduce((acc, d) => {
      acc.stay += (d.breakdown && d.breakdown.stay) || 0;
      acc.food += (d.breakdown && d.breakdown.food) || 0;
      acc.transport += (d.breakdown && d.breakdown.transport) || 0;
      acc.misc += (d.breakdown && d.breakdown.misc) || 0;
      return acc;
    }, { stay: 0, food: 0, transport: 0, misc: 0 });

    const totalPerPerson = totalsPerPerson.stay + totalsPerPerson.food + totalsPerPerson.transport + totalsPerPerson.misc;
    const totalAllTravelers = totalPerPerson * people;

    function formatRupee(n) {
      return '₹' + (n || 0).toLocaleString('en-IN');
    }

    tripPlanContainer.innerHTML = `
      <div class="trip-header mb-4 rounded-lg overflow-hidden shadow">
        <img src="${destData.image}" alt="${destination}" class="w-full h-48 object-cover">
        <div class="p-4 bg-white">
          <h2 class="text-xl font-bold mb-2 text-gray-800">Your ${destination.toUpperCase()} Trip Plan</h2>
          <div class="text-sm text-gray-600 space-y-1">
            <p><strong>Recommended duration:</strong> ${destData.recommendedDays} days</p>
            <p><strong>Avg cost (per person):</strong> ${destData.avgCost}</p>
            <p><strong>Best time to visit:</strong> ${destData.bestTime}</p>
            <p><strong>Estimated total (all travelers):</strong> ${formatRupee(totalAllTravelers)}</p>
            <div class="cost-breakdown text-sm mt-2">
              <p><strong>Per person totals:</strong> Stay ${formatRupee(totalsPerPerson.stay)}, Food ${formatRupee(totalsPerPerson.food)}, Transport ${formatRupee(totalsPerPerson.transport)}, Misc ${formatRupee(totalsPerPerson.misc)}</p>
              <p><strong>All travelers total:</strong> Stay ${formatRupee(totalsPerPerson.stay * people)}, Food ${formatRupee(totalsPerPerson.food * people)}, Transport ${formatRupee(totalsPerPerson.transport * people)}, Misc ${formatRupee(totalsPerPerson.misc * people)}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    itinerary.forEach(day => {
      tripPlanContainer.innerHTML += `
        <div class="bg-gray-100 rounded-lg p-4 mb-4 shadow">
          <h3 class="font-semibold mb-2">Day ${day.day}</h3>
          <p>🏨 <b>Stay:</b> ${day.stay}</p>
          <p>🍽 <b>Food:</b> ${day.food}</p>
          <p>🗺 <b>Explore:</b> ${day.explore}</p>
          <p>🌿 <b>Hidden Spot:</b> ${day.hidden}</p>
          <p>🚗 <b>Transport:</b> ${day.transport}</p>
          <div class="mt-2 text-sm text-gray-700 cost-breakdown-row">
            <span>💤 <b>Stay:</b> ${formatRupee(day.breakdown.stay)}</span>
            <span>🍽 <b>Food:</b> ${formatRupee(day.breakdown.food)}</span>
            <span>🚗 <b>Transport:</b> ${formatRupee(day.breakdown.transport)}</span>
            <span>✨ <b>Misc:</b> ${formatRupee(day.breakdown.misc)}</span>
            <span class="ml-2">💰 <b>Daily total (per person):</b> ${formatRupee(day.dailyCost)}</span>
          </div>
        </div>
      `;
    });

    tripPlanContainer.scrollIntoView({ behavior: "smooth" });
  }

  /*******************************
   * PLAN MY TRIP SUBMIT
   *******************************/
  tripForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const destination = destinationSelect.value;
    const days = getNumberOfDays(checkInInput.value, checkOutInput.value);

    const itinerary = generateTripPlan(destination, days);

    // Persist selected destination
    try {
      localStorage.setItem('lastDestination', destination);
    } catch (e) {
      console.warn('localStorage not available', e);
    }

    displayTripPlan(itinerary, destination, travelersInput.value);
  });

  /*******************************
   * VIEW ALL DESTINATIONS BUTTON
   *******************************/
  if (viewAllBtn && destinationsSection) {
    const moreDestinations = document.getElementById("more-destinations");

    // Ensure ARIA attributes are present
    viewAllBtn.setAttribute("aria-controls", "more-destinations");
    viewAllBtn.setAttribute("aria-expanded", "false");

    // Restore expanded state from localStorage
    try {
      const expanded = localStorage.getItem('moreDestinationsExpanded') === 'true';
      if (expanded && moreDestinations) {
        moreDestinations.classList.remove('hidden');
        moreDestinations.classList.add('fade-in');
        viewAllBtn.textContent = 'Show Less';
        viewAllBtn.setAttribute('aria-expanded', 'true');
      }
    } catch (e) {
      // ignore localStorage errors
    }

    viewAllBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll to the section
      destinationsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Brief highlight to draw attention
      destinationsSection.classList.add("ring-4", "ring-indigo-400");
      setTimeout(() => {
        destinationsSection.classList.remove("ring-4", "ring-indigo-400");
      }, 1200);

      // Toggle expansion of extra destinations
      if (!moreDestinations) return;

      const isHidden = moreDestinations.classList.contains("hidden");
      if (isHidden) {
        moreDestinations.classList.remove("hidden");
        moreDestinations.classList.add("fade-in");
        viewAllBtn.textContent = "Show Less";
        viewAllBtn.setAttribute("aria-expanded", "true");
        try { localStorage.setItem('moreDestinationsExpanded', 'true'); } catch (err) {}
      } else {
        moreDestinations.classList.add("hidden");
        viewAllBtn.textContent = "View All Destinations";
        viewAllBtn.setAttribute("aria-expanded", "false");
        try { localStorage.setItem('moreDestinationsExpanded', 'false'); } catch (err) {}
      }
    });

    // Restore last selected destination (if any)
    try {
      const last = localStorage.getItem('lastDestination');
      if (last && destinationSelect) {
        destinationSelect.value = last;
      }
    } catch (e) {
      // ignore
    }

    // Persist selection when user changes it
    if (destinationSelect) {
      destinationSelect.addEventListener('change', () => {
        try { localStorage.setItem('lastDestination', destinationSelect.value); } catch (e) {}
      });
    }
  }

  // ------- Explore buttons -> Modal for full details -------
  const modal = document.getElementById('destination-modal');
  const modalBody = document.getElementById('modal-body');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  function formatRupee(n) {
    return '₹' + (n || 0).toLocaleString('en-IN');
  }

  let _previouslyFocused = null;
  let _trapHandler = null;

  function setAriaHiddenForSiblings(hide) {
    // When showing a modal, hide non-modal content from screen readers.
    // Do not set aria-hidden on other modals (elements with class 'modal').
    const children = Array.from(document.body.children);
    children.forEach(el => {
      try {
        if (el.classList && el.classList.contains('modal')) return; // skip modal elements
        if (hide) el.setAttribute('aria-hidden', 'true');
        else el.removeAttribute('aria-hidden');
      } catch (e) {
        // ignore
      }
    });
  }

  function openDestinationModal(key) {
    const d = destinationPlans[key];
    if (!d) return;

    // Build gallery markup
    const gallery = Array.isArray(d.gallery) && d.gallery.length ? d.gallery : (d.image ? [d.image] : []);

    modalBody.innerHTML = `
      <div class="carousel relative">
        <button class="modal-inner-close absolute top-3 right-3 bg-white p-2 rounded-full shadow" aria-label="Close details">✕</button>
        <div class="carousel-main relative">
          <button class="carousel-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow" aria-label="Previous image">◀</button>
          <img src="${gallery[0] || ''}" alt="${key}" class="w-full h-48 object-cover carousel-image" />
          <button class="carousel-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow" aria-label="Next image">▶</button>
        </div>

        <div class="p-4 modal-body">
          <h3 id="modal-title" class="text-2xl font-bold">${key.toUpperCase()}</h3>
          <div class="meta">Recommended: ${d.recommendedDays} days • Avg cost per person: ${d.avgCost} • Best time: ${d.bestTime}</div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 class="font-semibold">Stay options</h4>
              <ul>${d.stay.map(s => `<li>${s}</li>`).join('')}</ul>

              <h4 class="font-semibold mt-2">Food</h4>
              <ul>${d.food.map(f => `<li>${f}</li>`).join('')}</ul>
            </div>
            <div>
              <h4 class="font-semibold">Transport</h4>
              <ul>${d.transport.map(t => `<li>${t}</li>`).join('')}</ul>

              <h4 class="font-semibold mt-2">Top places</h4>
              <ul>${d.famous.map(f => `<li>${f}</li>`).join('')}</ul>

              <h4 class="font-semibold mt-2">Hidden gems</h4>
              <ul>${d.hidden.map(h => `<li>${h}</li>`).join('')}</ul>
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-700">
            <strong>Typical daily breakdown (per person):</strong>
            <div class="mt-1">Stay: ${formatRupee(Math.round(d.avgDailyCost * (d.costBreakdown?.stay || 0)))} • Food: ${formatRupee(Math.round(d.avgDailyCost * (d.costBreakdown?.food || 0)))} • Transport: ${formatRupee(Math.round(d.avgDailyCost * (d.costBreakdown?.transport || 0)))} • Misc: ${formatRupee(Math.round(d.avgDailyCost * (d.costBreakdown?.misc || 0)))}</div>
          </div>

          <div class="carousel-thumbs mt-4 flex gap-2">
            ${gallery.map((g, idx) => `<button class="thumb-btn border rounded overflow-hidden" data-idx="${idx}" aria-label="View image ${idx+1}"><img src="${g}" class="w-24 h-16 object-cover" alt="thumb-${idx}" /></button>`).join('')}
          </div>
        </div>
      </div>
    `;

    let current = 0;
    const imgEl = modalBody.querySelector('.carousel-image');
    const prevBtn = modalBody.querySelector('.carousel-prev');
    const nextBtn = modalBody.querySelector('.carousel-next');
    const thumbs = Array.from(modalBody.querySelectorAll('.thumb-btn'));

    function showImage(idx) {
      if (!gallery.length) return;
      current = (idx + gallery.length) % gallery.length;
      imgEl.src = gallery[current];
      // mark active thumb
      thumbs.forEach(t => t.classList.remove('ring-2', 'ring-indigo-500'));
      if (thumbs[current]) thumbs[current].classList.add('ring-2', 'ring-indigo-500');
    }

    prevBtn && prevBtn.addEventListener('click', () => showImage(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => showImage(current + 1));
    thumbs.forEach(t => t.addEventListener('click', (e) => showImage(parseInt(t.dataset.idx, 10))));

    // inner close button handler
    const innerCloseBtn = modalBody.querySelector('.modal-inner-close');
    innerCloseBtn && innerCloseBtn.addEventListener('click', closeDestinationModal);

    // keyboard arrows
    const galleryKeyHandler = (e) => {
      if (e.key === 'ArrowLeft') showImage(current - 1);
      if (e.key === 'ArrowRight') showImage(current + 1);
    };

    document.addEventListener('keydown', galleryKeyHandler);

    // Expose cleanup for close: attach to modal element so closeDestinationModal can remove listener
    modal._galleryCleanup = () => {
      document.removeEventListener('keydown', galleryKeyHandler);
    };

    // open modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Hide other content from screen readers while modal is open
    setAriaHiddenForSiblings(true);

    // Save previous focus
    _previouslyFocused = document.activeElement;

    // Focus management + trap
    const selectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll(selectors));
    const firstFocusable = focusable[0] || modalClose;
    const lastFocusable = focusable[focusable.length - 1] || modalClose;

    _trapHandler = function (e) {
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          modalClose.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        } else if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      }
    };

    document.addEventListener('keydown', _trapHandler);

    // move focus into modal
    firstFocusable.focus();

    // initialize
    showImage(0);
  }

  function closeDestinationModal() {
    modal.classList.add('hidden');

    // gallery cleanup
    if (modal._galleryCleanup) {
      try { modal._galleryCleanup(); } catch(e) {}
      modal._galleryCleanup = null;
    }

    modalBody.innerHTML = '';
    document.body.style.overflow = '';

    // restore aria-hidden
    setAriaHiddenForSiblings(false);

    // remove trap
    if (_trapHandler) document.removeEventListener('keydown', _trapHandler);
    _trapHandler = null;

    // restore focus
    try { _previouslyFocused && _previouslyFocused.focus(); } catch (e) {}
    _previouslyFocused = null;
  }

  // Attach click handlers to any explore buttons present
  const exploreButtons = document.querySelectorAll('.explore-btn');
  exploreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.destination;
      openDestinationModal(key);
    });
  });

  // Close handlers for destination modal
  modalOverlay && modalOverlay.addEventListener('click', closeDestinationModal);
  modalClose && modalClose.addEventListener('click', closeDestinationModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && !modal.classList.contains('hidden')) closeDestinationModal();
      if (loginModal && !loginModal.classList.contains('hidden')) closeLoginModal();
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) closeMobileMenu();
      if (sideNav && !sideNav.classList.contains('hidden')) closeSideNav();
    }
  });

  // ----- Login / Auth modal and UI -----
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginModal = document.getElementById('login-modal');
  const loginOverlay = document.getElementById('login-overlay');
  const loginClose = document.getElementById('login-close');
  const loginForm = document.getElementById('login-form');
  const loginName = document.getElementById('login-name');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginGuest = document.getElementById('login-guest');

  // ----- Mobile menu -----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let _mobileOutsideHandler = null;

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    // focus first link
    const first = mobileMenu.querySelector('a');
    if (first) first.focus();

    // close when clicking outside
    _mobileOutsideHandler = (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        closeMobileMenu();
      }
    };
    setTimeout(() => document.addEventListener('click', _mobileOutsideHandler), 0);
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (_mobileOutsideHandler) {
      document.removeEventListener('click', _mobileOutsideHandler);
      _mobileOutsideHandler = null;
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) openMobileMenu(); else closeMobileMenu();
    });
  }

  // ----- Side navigation (slide-in) -----
  const sideNavBtn = document.getElementById('sideNavBtn');
  const sideNav = document.getElementById('sideNav');
  const sideNavOverlay = document.getElementById('sideNavOverlay');
  const sideNavClose = document.getElementById('sideNavClose');
  let _sidePrevFocus = null;
  let _sideTrap = null;

  function openSideNav() {
    if (!sideNav) return;
    sideNav.classList.remove('hidden');
    sideNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    setAriaHiddenForSiblings(true);

    _sidePrevFocus = document.activeElement;
    const focusable = Array.from(sideNav.querySelectorAll('a,button,input, [tabindex]:not([tabindex="-1"])'));
    const firstFocusable = focusable[0] || sideNavClose;
    const lastFocusable = focusable[focusable.length - 1] || sideNavClose;

    _sideTrap = function (e) {
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          sideNavClose.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        } else if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      }
      if (e.key === 'Escape') closeSideNav();
    };

    document.addEventListener('keydown', _sideTrap);
    firstFocusable.focus();
  }

  function closeSideNav() {
    if (!sideNav) return;
    sideNav.classList.add('hidden');
    sideNav.classList.remove('open');
    document.body.style.overflow = '';
    setAriaHiddenForSiblings(false);

    if (_sideTrap) document.removeEventListener('keydown', _sideTrap);
    _sideTrap = null;

    try { _sidePrevFocus && _sidePrevFocus.focus(); } catch (e) {}
    _sidePrevFocus = null;
  }

  sideNavBtn && sideNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isHidden = sideNav.classList.contains('hidden');
    if (isHidden) openSideNav(); else closeSideNav();
  });
  sideNavClose && sideNavClose.addEventListener('click', closeSideNav);
  sideNavOverlay && sideNavOverlay.addEventListener('click', closeSideNav);

  // ----- AI Chat widget (connects to /api/chat proxy) -----
  const aiToggle = document.getElementById('ai-chat-toggle');
  const aiPanel = document.getElementById('ai-chat-panel');
  const aiClose = document.getElementById('ai-chat-close');
  const aiMessages = document.getElementById('ai-messages');
  const aiForm = document.getElementById('ai-form');
  const aiInput = document.getElementById('ai-input');
  const aiProxy = document.getElementById('ai-proxy');
  const aiProxyTest = document.getElementById('ai-proxy-test');

  // load saved proxy URL
  try { const saved = localStorage.getItem('aiProxyUrl'); if (saved) aiProxy.value = saved; } catch(e){}

  const AI_HISTORY_KEY = 'aiChatHistory';

  function saveHistoryEntry(role, text) {
    try {
      const arr = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
      arr.push({ role, text, ts: Date.now() });
      localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(arr));
    } catch (e) { /* ignore */ }
  }

  function appendMessage(role, text, opts = {}) {
    // opts.stream === true indicates ongoing streamed message (append)
    let wrap;
    if (opts.updateToId) {
      // update existing element
      wrap = document.getElementById(opts.updateToId);
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = opts.updateToId;
        wrap.className = 'ai-message assistant';
        wrap.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
        aiMessages.appendChild(wrap);
      } else {
        const bubble = wrap.querySelector('.bubble');
        if (bubble) bubble.innerHTML = escapeHtml(text);
      }
    } else {
      wrap = document.createElement('div');
      wrap.className = 'ai-message ' + (role === 'user' ? 'user' : 'assistant');
      wrap.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
      aiMessages.appendChild(wrap);
      if (!opts.noSave) saveHistoryEntry(role, text);
    }

    aiMessages.scrollTop = aiMessages.scrollHeight;
    return wrap;
  }

  function setTyping(active) {
    const id = 'ai-typing';
    if (active) {
      if (!document.getElementById(id)) {
        const el = document.createElement('div'); el.id = id; el.className = 'ai-message assistant'; el.innerHTML = `<div class="bubble">Thinking...</div>`; aiMessages.appendChild(el); aiMessages.scrollTop = aiMessages.scrollHeight;
      }
    } else {
      const el = document.getElementById(id); if (el) el.remove();
    }
  }

  function escapeHtml(s) { return (s+'').replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  function openAiPanel() {
    if (!aiPanel) return;
    aiPanel.classList.remove('hidden');
    aiToggle.setAttribute('aria-expanded','true');
    aiInput.focus();
  }
  function closeAiPanel() { if (!aiPanel) return; aiPanel.classList.add('hidden'); aiToggle.setAttribute('aria-expanded','false'); aiToggle.focus(); }

  aiToggle && aiToggle.addEventListener('click', (e)=>{ e.stopPropagation(); const isHidden = aiPanel.classList.contains('hidden'); if (isHidden) openAiPanel(); else closeAiPanel(); });
  aiClose && aiClose.addEventListener('click', closeAiPanel);

  aiProxyTest && aiProxyTest.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = (aiProxy && aiProxy.value) ? aiProxy.value.trim() : '/api/chat';
    const statusEl = document.getElementById('ai-status');
    if (statusEl) statusEl.textContent = 'Testing...';
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);

      const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({test:true}), signal: controller.signal });
      clearTimeout(timer);
      if (!r.ok) throw new Error('Status ' + r.status);

      // Try to read a bit of body for streaming endpoints
      let ok = true;
      try {
        const txt = await r.text();
        // if server responds with json {ok:true} treat as OK
        try { const j = JSON.parse(txt); if (j && j.ok) ok = true; }
        catch (_) { /* ignore non-json test responses */ }
      } catch (e) {
        // ignore body read errors
      }

      if (statusEl) statusEl.textContent = 'Proxy reachable (' + r.status + ')';
      try { localStorage.setItem('aiProxyUrl', url); } catch(e){}
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Proxy test failed';
      alert('Proxy test failed: ' + (err.message || err));
    }
  });

  // Export chat history
  const aiExportBtn = document.getElementById('ai-export');
  aiExportBtn && aiExportBtn.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      const hist = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
      const blob = new Blob([JSON.stringify(hist, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `ai_chat_history_${Date.now()}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      const statusEl = document.getElementById('ai-status'); if (statusEl) statusEl.textContent = 'Exported';
      setTimeout(()=>{ if (statusEl) statusEl.textContent = 'Ready'; }, 1500);
    } catch (err) {
      alert('Export failed: ' + (err.message || err));
    }
  });

  aiForm && aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = (aiInput.value||'').trim();
    if (!msg) return;
    appendMessage('user', msg);
    aiInput.value = '';

    const proxyUrl = (aiProxy && aiProxy.value) ? aiProxy.value.trim() : '/api/chat';
    try { localStorage.setItem('aiProxyUrl', proxyUrl); } catch(e){}

    const statusEl = document.getElementById('ai-status'); if (statusEl) statusEl.textContent = 'Thinking...';
    setTyping(true);

    const useStream = !!(document.getElementById('ai-stream') && document.getElementById('ai-stream').checked);

    if (!useStream) {
      try {
        const res = await fetch(proxyUrl, {
          method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ message: msg })
        });
        if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
        const data = await res.json();
        setTyping(false);
        const reply = data && (data.reply || data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || (data.error || 'No reply');
        appendMessage('assistant', reply);
        if (statusEl) statusEl.textContent = 'Ready';
      } catch (err) {
        setTyping(false);
        appendMessage('assistant', 'Error: ' + (err.message || err));
        if (statusEl) statusEl.textContent = 'Error';
      }
      return;
    }

    // Streaming flow: create a placeholder assistant message and update it progressively
    const streamId = 'ai-stream-' + Date.now();
    appendMessage('assistant', '', { updateToId: streamId, noSave: true });

    try {
      const res = await fetch(proxyUrl, {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ message: msg, stream: true })
      });

      if (!res.ok) throw new Error('Network response was not ok: ' + res.status);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let sseBuf = '';
      let accumulated = '';
      let ended = false;

      while (!ended) {
        const { value, done: readerDone } = await reader.read();
        if (value) {
          sseBuf += decoder.decode(value, { stream: true });
          const parts = sseBuf.split('\n\n');
          sseBuf = parts.pop(); // keep remainder
          for (const part of parts) {
            const lines = part.split('\n').map(l => l.replace(/^data:\s?/, '').trim()).filter(Boolean);
            for (const line of lines) {
              if (line === '[DONE]') {
                ended = true;
                break;
              }
              // try to parse as JSON (OpenAI streaming payload), otherwise append raw
              let appended = false;
              try {
                const o = JSON.parse(line);
                const choices = o.choices || [];
                for (const ch of choices) {
                  const text = (ch.delta && ch.delta.content) || ch.text || '';
                  if (text) { accumulated += text; appended = true; }
                }
              } catch (e) {
                // not json, fallback
              }
              if (!appended) { accumulated += line; }
              appendMessage('assistant', accumulated, { updateToId: streamId });
            }
            if (ended) break;
          }
        }
        if (readerDone) break;
      }

      setTyping(false);
      const finalText = accumulated.trim();
      appendMessage('assistant', finalText); // save
      if (statusEl) statusEl.textContent = 'Ready';
      const placeholder = document.getElementById(streamId);
      if (placeholder) placeholder.remove();
    } catch (err) {
      setTyping(false);
      appendMessage('assistant', 'Error: ' + (err.message || err));
      const statusEl = document.getElementById('ai-status'); if (statusEl) statusEl.textContent = 'Error';
    }
  });

  // keyboard shortcut: Ctrl+K opens chat
  document.addEventListener('keydown', (e) => { if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openAiPanel(); } });

  // helper: close chat when clicking outside
  document.addEventListener('click', (e) => { if (!aiPanel || aiPanel.classList.contains('hidden')) return; const root = document.getElementById('ai-chat-widget'); if (!root.contains(e.target)) closeAiPanel(); });

  // Restore any previous chat history (optional)
  try {
    const hist = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
    if (Array.isArray(hist)) {
      hist.forEach(m => appendMessage(m.role, m.text, { noSave: true }));
    }
  } catch(e){}

  // Clear chat history button
  const aiClearBtn = document.getElementById('ai-clear');
  aiClearBtn && aiClearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    try { localStorage.removeItem(AI_HISTORY_KEY); } catch (err) {}
    aiMessages.innerHTML = '';
  });

  // announcer helper for accessibility
  const aiAnnouncer = document.getElementById('ai-announcer');
  function announceForA11y(text) { try { if (aiAnnouncer) aiAnnouncer.textContent = text; } catch(e){} }

  // announce open/close
  const originalOpenAiPanel = openAiPanel;
  openAiPanel = function() { originalOpenAiPanel(); announceForA11y('AI assistant opened'); };
  const originalCloseAiPanel = closeAiPanel;
  closeAiPanel = function() { originalCloseAiPanel(); announceForA11y('AI assistant closed'); };



  function capitalizeName(s) { return s ? (s.charAt(0).toUpperCase() + s.slice(1)) : s; }

  function updateAuthUI() {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const displayName = user.name ? capitalizeName(user.name) : (user.email ? user.email.split('@')[0] : null);
      if (displayName) {
        loginBtn.textContent = `Hi, ${displayName}`;
        loginBtn.classList.add('text-indigo-600','font-semibold');
        logoutBtn.classList.remove('hidden');
      } else {
        loginBtn.textContent = 'Login';
        loginBtn.classList.remove('text-indigo-600','font-semibold');
        logoutBtn.classList.add('hidden');
      }
    } catch (e) {
      loginBtn.textContent = 'Login';
      logoutBtn.classList.add('hidden');
    }
  }

  let _loginPrevFocus = null;
  let _loginTrap = null;

  function openLoginModal() {
    if (!loginModal) return;
    loginModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setAriaHiddenForSiblings(true);

    _loginPrevFocus = document.activeElement;
    const selectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(loginModal.querySelectorAll(selectors));
    const firstFocusable = focusable[0] || loginClose;
    const lastFocusable = focusable[focusable.length - 1] || loginClose;

    _loginTrap = function(e) {
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          loginClose.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        } else if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      }
    };

    document.addEventListener('keydown', _loginTrap);
    firstFocusable.focus();
  }

  function closeLoginModal() {
    if (!loginModal) return;
    loginModal.classList.add('hidden');
    document.body.style.overflow = '';

    // restore aria-hidden state for background
    setAriaHiddenForSiblings(false);

    if (_loginTrap) document.removeEventListener('keydown', _loginTrap);
    _loginTrap = null;

    try { _loginPrevFocus && _loginPrevFocus.focus(); } catch (e) {}
    _loginPrevFocus = null;
  }

  // Wire auth handlers
  loginBtn && loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
  });
  loginClose && loginClose.addEventListener('click', closeLoginModal);
  loginOverlay && loginOverlay.addEventListener('click', closeLoginModal);

  loginForm && loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (loginEmail && loginEmail.value || '').trim();
    const name = (loginName && loginName.value || '').trim();
    if (!email) {
      // simple client-side validation
      loginEmail.focus();
      return;
    }
    // Persist a very lightweight 'user' object (include name if given)
    try {
      const userObj = { email };
      if (name) userObj.name = name;
      localStorage.setItem('user', JSON.stringify(userObj));
    } catch (err) {}
    updateAuthUI();
    closeLoginModal();
  });

  loginGuest && loginGuest.addEventListener('click', (e) => {
    e.preventDefault();
    try { localStorage.setItem('user', JSON.stringify({ email: 'guest', name: 'Guest' })); } catch (err) {}
    updateAuthUI();
    closeLoginModal();
  });

  logoutBtn && logoutBtn.addEventListener('click', () => {
    try { localStorage.removeItem('user'); } catch (err) {}
    updateAuthUI();
  });

  // initialize auth UI
  updateAuthUI();


});
