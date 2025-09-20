import React, { useEffect, useState } from "react";
import "./App.css";
import { deleteUsers, getUsers } from "./api/crud";
import Trash from "./assets/imageIcon/Trash";
import Edit from "./assets/imageIcon/Edit";
import Eye from "./assets/imageIcon/Eye";
import EditUser from "./components/EditUser/EditUser";
import AddUser from "./components/AddUser/AddUser";

const App = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [user, setUser] = useState([]);
  const [addUser, setAddUser] = useState(false);

  const getData = async () => {
    const data = await getUsers();
    setData(data);
  };

  const toggle = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = (id) => {
    const deletedUser = data.filter((user) => user.id !== id);
    deleteUsers(id);
    setData(deletedUser);
  };

  return (
    <div className="users-table" style={{ width: "70%", margin: "auto" }}>
      <button className="adduser" onClick={() => setAddUser(true)}>
        Add users
      </button>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.number}</td>
              <td>{user.email}</td>
              <td className="buttons">
                <button onClick={() => deleteUser(user.id)}>
                  <Trash />
                </button>
                <button
                  onClick={() => {
                    setUser(user);
                    setActive(true);
                    toggle();
                  }}
                >
                  <Edit />
                </button>
                <button>
                  <Eye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {active && (
        <EditUser setActive={setActive} setData={setData} user={user} />
      )}
      {addUser && <AddUser setAddUser={setAddUser} setData={setData} />}
    </div>
  );
};

export default App;
