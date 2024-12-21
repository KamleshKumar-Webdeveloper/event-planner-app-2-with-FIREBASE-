const signin = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  if (email === "" && password === "") {
    const allError = document.getElementById("all-error");
    allError.innerHTML = "Email and Password are required";
    allError.style.color = "red";
    allError.style.display = "block";
    setTimeout(() => {
      allError.style.display = "none";
    }, 3000);
    return;
  } else if (!email) {
    const emailError = document.getElementById("email-error");
    emailError.innerHTML = "Email is required";
    emailError.style.color = "red";
      emailError.style.display = "block";
    setTimeout(() => {
      emailError.style.display = "none";
    }, 3000);
   
  } else if (!password) {
    const passwordError = document.getElementById("password-error");
    passwordError.innerHTML = "Password is required";
    passwordError.style.color = "red";
    passwordError.style.display = "block";
    setTimeout(() => {
      passwordError.style.display = "none";
    }, 3000);
   
    }else{  
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          const currentUser = {
            email: email,
            password: password,
            uid: uid,
          }
          const db = firebase.firestore();
          db.collection("currentUser")
            .doc(uid)
            .set(currentUser)
            .then(() => {
              const successMessage = document.getElementById("success-message");
              successMessage.innerHTML = "Signin successful";
              successMessage.style.color = "green";
              successMessage.style.display = "block";
              setTimeout(() => {
                successMessage.style.display = "none";
              }, 3000);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        } else {
          const MessageErr = document.getElementById("error-message");
          MessageErr.innerHTML = "Signin failed";
          MessageErr.style.color = "red";
          MessageErr.style.display = "block";
          setTimeout(() => {
            MessageErr.style.display = "none";
          }, 3000);
        }
      });
    })
      .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      const MessageErr = document.getElementById("error-message");
      MessageErr.innerHTML = errorMessage;
      MessageErr.style.color = "red";
      MessageErr.style.display = "block";
      setTimeout(() => {
        MessageErr.style.display = "none";
      }, 3000);
    });
  }
};
