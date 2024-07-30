document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/reports");
    const responseText = await response.text(); // Get the response text
    console.log("Response Text:", responseText); // Log the response text

    const data = JSON.parse(responseText); // Parse the response text to JSON
    const reportsList = document.getElementById("reports-list");

    console.log(data);

    if (data && data.length > 0) {
      data.forEach((report) => {
        const reportItem = document.createElement("li");
        reportItem.classList.add("report-item");
        reportItem.innerHTML = `
              <h3>Type: ${report.type}</h3>
              <p>${report.details}</p>
            `;
        reportsList.appendChild(reportItem);
      });
    } else {
      reportsList.innerHTML = "<p>No reports found.</p>";
    }
  } catch (error) {
    console.error("Error fetching reports:", error);
    const reportsList = document.getElementById("reports-list");
    reportsList.innerHTML =
      "<p>Error loading reports. Please try again later.</p>";
  }
});
