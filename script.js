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
      stay: ["Houseboat (Alappuzha)", "Munnar Homestay", "Varkala Resort"],
      food: ["Sadya", "Appam & Stew", "Seafood"],
      transport: ["Auto", "Taxi", "Ferry"],
      famous: ["Munnar", "Alappuzha Backwaters", "Varkala Beach"],
      hidden: ["Kumbalangi Village", "Meesapulimala"]
    },
    goa: {
      stay: ["Beach Shack", "Sea-facing Resort"],
      food: ["Fish Curry Rice", "Bebinca"],
      transport: ["Scooter Rental"],
      famous: ["Baga Beach", "Fort Aguada"],
      hidden: ["Butterfly Beach", "Divar Island"]
    },
    rajasthan: {
      stay: ["Heritage Haveli", "Desert Camp"],
      food: ["Dal Baati Churma", "Laal Maas"],
      transport: ["Taxi", "Camel Safari"],
      famous: ["Hawa Mahal", "Jaisalmer Fort", "City Palace"],
      hidden: ["Panna Meena Kund", "Kuldhara Village"]
    },
    ladakh: {
      stay: ["Leh Guesthouse", "Mountain Homestay"],
      food: ["Thukpa", "Momos"],
      transport: ["Bike Rental", "Taxi"],
      famous: ["Pangong Lake", "Nubra Valley"],
      hidden: ["Turtuk Village", "Hemis Monastery"]
    },
    varanasi: {
      stay: ["Ghatside Guesthouse", "City Hotel"],
      food: ["Kachori Sabzi", "Lassi", "Malaiyo"],
      transport: ["E-Rickshaw", "Boat Ride"],
      famous: ["Kashi Vishwanath", "Ganga Aarti", "Sarnath"],
      hidden: ["Ramnagar Fort", "Assi Ghat"]
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

    for (let i = 0; i < days; i++) {
      itinerary.push({
        day: i + 1,
        stay: plan.stay[i % plan.stay.length],
        food: plan.food[i % plan.food.length],
        explore: plan.famous[i % plan.famous.length],
        hidden: plan.hidden[i % plan.hidden.length],
        transport: plan.transport.join(", ")
      });
    }
    return itinerary;
  }

  /*******************************
   * DISPLAY TRIP PLAN
   *******************************/
  function displayTripPlan(itinerary, destination) {
    tripPlanContainer.innerHTML = `
      <h2 class="text-xl font-bold mb-4 text-gray-800">
        Your ${destination.toUpperCase()} Trip Plan
      </h2>
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
    displayTripPlan(itinerary, destination);
  });

  /*******************************
   * VIEW ALL DESTINATIONS BUTTON
   *******************************/
  if (viewAllBtn && destinationsSection) {
    viewAllBtn.addEventListener("click", function (e) {
      e.preventDefault();

      destinationsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      destinationsSection.classList.add("ring-4", "ring-indigo-400");

      setTimeout(() => {
        destinationsSection.classList.remove("ring-4", "ring-indigo-400");
      }, 1200);
    });
  }

});
