const signOut = document.querySelector("#signOut");
const name = document.querySelector("#name");
const email = document.querySelector("#email");

const user = localStorage.getItem('user');
const userData = JSON.parse(user); 

if (!user) {
  window.location.href = '/signin.html';
} else {
  name.textContent = userData.username;
  email.textContent = userData.email;
}

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
  const name = document.getElementById('name').value;

  console.log(name, 'name')

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
      name,
      authorEmail: userData.email
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

function SignOut(e) {
  e.preventDefault();
  localStorage.removeItem("user");
  console.log("Removed Item", localStorage.getItem("user"))

  window.location.href = "/signin.html";
}

signOut.addEventListener('click', (e) => SignOut(e))