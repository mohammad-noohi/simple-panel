import { useState } from "react";

function Register() {
  /* States */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  /* Functions */
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  /* Events */
  const registerHandler = e => {
    e.preventDefault();

    const userInfo = {
      firstName,
      lastName,
      email,
    };

    // send userInfo to users.json table in firebase
    fetch("https://train-react-159d4-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(userInfo),
    }).then(resp => {
      if (resp.ok) {
        clearForm();
      }
    });
  };

  return (
    <>
      <section className="vh-100 d-flex justify-content-center align-items-center bg-success-subtle">
        <div className="container">
          <h1 className="text-center">Register</h1>
          <form className="shadow p-5 rounded-2 mx-auto bg-white mt-5" style={{ maxWidth: "500px" }} onSubmit={registerHandler}>
            <div>
              <label htmlFor="firstname-input" className="form-label fs-4 fw-bold text-capitalize">
                firstname
              </label>
              <input type="text" className="form-control" id="firstname-input" value={firstName} onChange={event => setFirstName(event.target.value)} />
            </div>
            <div className="mt-3">
              <label htmlFor="lastName-input" className="form-label fs-4 fw-bold text-capitalize">
                lastName
              </label>
              <input type="lastName" className="form-control" id="lastName-input" value={lastName} onChange={() => setLastName(event.target.value)} />
            </div>
            <div className="mt-3">
              <label htmlFor="email-input" className="form-label fs-4 fw-bold text-capitalize">
                email
              </label>
              <input type="email" className="form-control" id="email-input" value={email} onChange={() => setEmail(event.target.value)} />
            </div>
            <div className="mt-5">
              <button type="submit" className="btn btn-outline-success w-100 text-capitalize">
                register
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
