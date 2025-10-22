// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// Grab elements
const input = document.getElementById("state-input")
const button = document.getElementById("fetch-alerts")
const alertsDisplay = document.getElementById("alerts-display")
const errorMessage = document.getElementById("error-message")

// Step 1: Fetch Alerts
function fetchWeatherAlerts(state) {
  // Clear previous results
  alertsDisplay.innerHTML = ""
  errorMessage.textContent = ""
  errorMessage.classList.add("hidden")

  // Validate input
  if (!state) {
    showError("Please enter a state abbreviation.")
    return;
  }

  if (state.length !== 2) {
    showError("Use a 2-letter state code like MN or TX.")
    return;
  }

  // Show loading
  alertsDisplay.textContent = "Loading..."

  fetch(`${weatherApi}${state.toUpperCase()}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        showError("Could not get data from the weather API.")
        return null
      }
    })
    .then((data) => {
      displayAlerts(data)
    })
    .catch((error) => {
      showError(error.message)
    });
}

// Step 2: Display Alerts
function displayAlerts(data) {
  alertsDisplay.innerHTML = ""
  errorMessage.textContent = ""
  errorMessage.classList.add("hidden")

  // Step 3: Clear input after success
  input.value = ""

  const alerts = data.features || []
  const count = alerts.length

  const summary = document.createElement("h2")
  summary.textContent = `Weather Alerts: ${count}`
  alertsDisplay.appendChild(summary)

  // Show each alert headline
  if (count > 0) {
    const list = document.createElement("ul")
    alerts.forEach((alert) => {
      const item = document.createElement("li")
      item.textContent = alert.properties.headline
      list.appendChild(item)
    });
    alertsDisplay.appendChild(list)
  } else {
    const none = document.createElement("p")
    none.textContent = "No active alerts for this state."
    alertsDisplay.appendChild(none)
  }
}

// Step 4: Error Display
function showError(message) {
  alertsDisplay.innerHTML = ""
  errorMessage.textContent = message
  errorMessage.classList.remove("hidden")
}

// Event Listener
button.addEventListener("click", () => {
  const state = input.value.trim()
  fetchWeatherAlerts(state)
});


