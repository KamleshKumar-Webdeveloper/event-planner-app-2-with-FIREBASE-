const signup = (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  if (firstName === "" && lastName === "" && email === "" && password === "") {
    const validationError = document.getElementById("validationError");
    validationError.innerHTML = "All fields are required";
    validationError.style.color = "red";
    validationError.style.alignItems = "left";
    validationError.style.display = "block";
    setTimeout(() => {
      validationError.style.display = "none";
    }, 3000);   
    return;
  } else if (!firstName) {
    const validationFirstNameError = document.getElementById(
      "validationFirstNameError"
    );
    validationFirstNameError.innerHTML = "First Name is required";
    validationFirstNameError.style.color = "red";
    validationFirstNameError.style.alignItems = "left";
    validationFirstNameError.style.display = "block";
    setTimeout(() => {
      validationFirstNameError.style.display = "none";
    }, 3000);
  } else if (!lastName) {
    const validationLastNameError = document.getElementById(
      "validationLastNameError"
    );
    validationLastNameError.innerHTML = "Last Name is required";
    validationLastNameError.style.color = "red";
    validationLastNameError.style.alignItems = "left";
    validationLastNameError.style.display = "block";
    setTimeout(() => {
      validationLastNameError.style.display = "none";
    }, 3000);
  } else if (!email) {
    const validationEmailError = document.getElementById(
      "validationEmailError"
    );
    validationEmailError.innerHTML = "Email is required";
    validationEmailError.style.color = "red";
    validationEmailError.style.alignItems = "left";
    validationEmailError.style.display = "block";
    setTimeout(() => {
      validationEmailError.style.display = "none";
    }, 3000);
  } else if (!password) {
    const validationPasswordError = document.getElementById(
      "validationPasswordError"
    );
    validationPasswordError.innerHTML = "Password is required";
    validationPasswordError.style.color = "red";
    validationPasswordError.style.alignItems = "left";
    validationPasswordError.style.display = "block";
    setTimeout(() => {
      validationPasswordError.style.display = "none";
    }, 3000);
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          uid: user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const db = firebase.firestore();
        db.collection("users")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            const validationSuccess = document.getElementById("validationSuccess");
            validationSuccess.innerHTML = "Signup successful";
            validationSuccess.style.color = "green";
            validationSuccess.style.alignItems = "left";
            validationSuccess.style.display = "block";
            setTimeout(() => {
              validationSuccess.style.display = "none";
            }, 3000);
            
            console.log("Document successfully written!");
            window.location.href = "pages/singin.html";
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            showError(error.message);
          });
      })
      .catch((error) => {
        var errorMessage = error.message;
        showError(errorMessage);
        console.error(errorMessage);
      });
  }
};

const showError = (message) => {
  const validationError = document.getElementById("validationError");
  validationError.innerHTML = message;
  validationError.style.color = "red";
  validationError.style.alignItems = "left";
  validationError.style.display = "block";
  setTimeout(() => {
    validationError.style.display = "none";
  }, 3000);
};