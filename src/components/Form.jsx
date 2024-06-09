import { useState } from "react";
import SideBox from "./SideBox";
import sideBoxData from "../Data/SideBoxData";
import styles from "./Form.module.css";
const Form = () => {
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      setFormSubmitted(false)
      return;
    } 

    try {
      setLoading(true);
      const response = await fetch("http://34.225.132.160:8002/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        //setErrror to make sure that when rendering happens and email is correct the
        //error message dissapers
        setError("");
        setEmail("");
      }else if(response.status === 422){
        const err = await response.json();
        setError(err.detail);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setFormSubmitted(false);
    setError(error);
    }finally{
      setEmail("");
      setLoading(false);

    }
  };

  return (
    <div className={styles.godWrapper}>
      <div className={styles.contentWrapper1}>
        <h1>EZ Works</h1>
        <h3>Suite Of Business Support Services</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ab?
          Necessitatibus illo, ex quae expedita, qui voluptas nihil veniam
          commodi ut quam a perferendis nesciunt itaque repellat, quod modi
          sunt.
        </p>
        <div className={styles.emailForm}>
          <form onSubmit={handleSubmit} method="POST">
            <div className={styles.innerFormContent}>
              <input
                placeholder="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={loading}
              />
              <button className={styles.btn} type="submit" disabled={loading}>
                Contact Me
              </button>
            </div>
          </form>
          {error && <p style={{ color: "red", fontSize:"20px", fontWeight:"900" }}>{error}</p>}
          {formSubmitted && <p style={{ color: "blue", fontSize:"20px", fontWeight:"900" }}>Form submitted successfully!</p>}
        </div>
      </div>


      <div className={styles.contentWrapper2}>
        {sideBoxData.map((data, index) => (
          <SideBox
            key={index}
            imgSrc={data.imgSrc}
            imgAlt={data.imgAlt}
            heading={data.heading}
            content={data.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Form;
