import React, { useEffect, useRef } from "react";
import { addUsers } from "../../api/crud";

const AddUser = ({ setAddUser, setData }) => {
  const name = useRef(null);
  const number = useRef(null);
  const email = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValue = name.current.value.trim();
    const numberValue = number.current.value.trim();
    const emailValue = email.current.value.trim();

    const postedUser = {
      id: Date.now(),
      name: nameValue,
      number: numberValue,
      email: emailValue,
    };

    if (!nameValue || !numberValue || !emailValue) {
      alert("Please do not enter space");
      return;
    }

    console.log(postedUser);

    setData((prev) => [...prev, { ...postedUser }]);
    setAddUser(false);
    try {
      await addUsers(postedUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  (e) => {
    setAddUser(false);
    if (e.key === "Escape") {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setAddUser(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setAddUser]);

  return (
    <div>
      <div className="form">
        <form
          onSubmit={(e) => handleSubmit(e)}
          onClick={(e) => e.stopPropagation()}
        >
          <input type="text" ref={name} placeholder="Username" required />
          <input type="text" ref={number} placeholder="Phone number" required />
          <input type="email" ref={email} placeholder="Email" required />
          <button type="submit">Add user</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
