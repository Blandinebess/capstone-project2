document.addEventListener("DOMContentLoaded", function () {
  // ----- Form Validation & Submission (Index Page) -----
  const userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!userForm.checkValidity()) {
        e.stopPropagation();
        userForm.classList.add("was-validated");
        return;
      }
      // Collect form data
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const birthday = document.getElementById("birthday").value;
      const languageChoice = document.getElementById("languageChoice").value;

      // Append data to the table
      const userTableBody = document.getElementById("userTableBody");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${birthday}</td>
        <td>${languageChoice}</td>
      `;
      userTableBody.appendChild(row);

      // Show success alert in the form
      const formAlert = document.getElementById("formAlert");
      formAlert.innerHTML = `<div class="alert alert-success" role="alert">User registered successfully!</div>`;
      userForm.reset();
      userForm.classList.remove("was-validated");
    });
  }

  // ----- API Call: Fetch Random User Data for the Card (Index Page) -----
  async function fetchRandomUser() {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const user = response.data.results[0];
      const name = `${user.name.first} ${user.name.last}`;
      const email = user.email;

      document.getElementById("apiUserName").innerText = name;
      document.getElementById("apiUserEmail").innerText = email;
      // Hide spinner and show card
      document.getElementById("spinner").style.display = "none";
      document.getElementById("apiData").style.display = "block";
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  }
  if (document.getElementById("spinner")) {
    fetchRandomUser();
  }

  // ----- API Call: Fetch Random Joke (Contact Page) -----
  const fetchJokeButton = document.getElementById("fetchJoke");
  if (fetchJokeButton) {
    fetchJokeButton.addEventListener("click", async function () {
      document.getElementById("jokeAlert").style.display = "none";
      document.getElementById("jokeSpinner").style.display = "flex";
      try {
        // Using the Official Joke API
        const response = await axios.get(
          "https://official-joke-api.appspot.com/random_joke"
        );
        const joke = response.data;
        document.getElementById(
          "jokeAlert"
        ).innerText = `${joke.setup} - ${joke.punchline}`;
        document.getElementById("jokeAlert").className = "alert alert-info";
        document.getElementById("jokeAlert").style.display = "block";
      } catch (error) {
        document.getElementById("jokeAlert").innerText = "Error fetching joke.";
        document.getElementById("jokeAlert").className = "alert alert-danger";
        document.getElementById("jokeAlert").style.display = "block";
      } finally {
        document.getElementById("jokeSpinner").style.display = "none";
      }
    });
  }
});
