import React, { useEffect, useRef } from "react";
import "./EditUser.css";
import { editUsers } from "../../api/crud";

const EditUser = ({ setActive, setData, user }) => {
  const name = useRef(null);
  const number = useRef(null);
  const email = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: user.id,
      name: name.current.value || user.name,
      number: number.current.value || user.number,
      email: email.current.value || user.email,
    };

    setData((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    setActive(false);
    try {
      await editUsers(user.id, updatedUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  (e) => {
    setActive(false);
    if (e.key === "Escape") {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setActive(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setActive]);

  return (
    <div className="form" onClick={() => setActive(false)}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          defaultValue={user.name}
          ref={name}
          placeholder="Username"
        />
        <input
          type="text"
          defaultValue={user.number}
          ref={number}
          placeholder="Phone number"
        />
        <input
          type="email"
          defaultValue={user.email}
          ref={email}
          placeholder="Email"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EditUser;
