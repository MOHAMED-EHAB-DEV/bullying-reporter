function showProfile(profileType) {
  let profileDetails = "";

  switch (profileType) {
    case "student":
      profileDetails =
        "<h3>Student Profile</h3><p>Access educational and support resources.</p>";

      break;

    case "teacher":
      profileDetails =
        "<h3>Teacher Profile</h3><p>Monitor incidents and access training materials.</p>";

      break;

    case "parent":
      profileDetails =
        "<h3>Parent Profile</h3><p>Support your child and access resources.</p>";

      break;
  }

  document.getElementById("profile-details").innerHTML = profileDetails;
}

function submitReport() {
  const type = document.getElementById("type").value;

  const details = document.getElementById("details").value;

  if (!details) {
    document.getElementById("report-message").innerHTML =
      "<p>Please provide details of the incident.</p>";

    return;
  }

  const report = fetch("http://localhost:3000/reports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      details: details.replace(/\n/g, "<br>"),
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  console.log(`Report submitted:

        Type: ${type}

        Details: ${details}`);

  document.getElementById("report-message").innerHTML =
    "<p>Thank you for your report. It has been submitted.</p>";

  document.getElementById("report-form").reset();
}