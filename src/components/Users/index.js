import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Users = () => {
  const [users, setUsers] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [middleNameInput, setMiddleNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [roleInput, setRoleInput] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRadioChange = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleInputChange = useCallback(({ target: { value } }, type) => {
    switch (type) {
      case "last":
        setLastNameInput(value);
        break;
      case "first":
        setFirstNameInput(value);
        break;
      case "middle":
        setMiddleNameInput(value);
        break;
      case "age":
        setAgeInput(value);
        break;
      case "industry":
        setIndustryInput(value);
        break;
      case "role":
        setRoleInput(value);
        break;
      default:
        break;
    }
  }, []);

  const getUsers = useCallback(() => {
    fetch("http://localhost:3001/users/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handlePostRequest = useCallback(
    (event) => {
      event.preventDefault();
      if (
        !lastNameInput ||
        !firstNameInput ||
        !middleNameInput ||
        !ageInput ||
        !industryInput ||
        !roleInput
      ) {
        alert("You have to fill out all the fields!");
        return;
      }
      fetch("http://localhost:3001/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: lastNameInput,
          last_name: firstNameInput,
          middle_name: middleNameInput,
          age: ageInput,
          role: industryInput,
          industry: roleInput,
        }),
      }).then(() => {
        getUsers();
      });
    },
    [
      lastNameInput,
      firstNameInput,
      middleNameInput,
      ageInput,
      industryInput,
      roleInput,
      getUsers,
    ]
  );

  const handlePutRequest = useCallback(
    (event) => {
      event.preventDefault();
      if (
        !lastNameInput ||
        !firstNameInput ||
        !middleNameInput ||
        !ageInput ||
        !industryInput ||
        !roleInput
      ) {
        alert("You have to fill out all the fields!");
        return;
      }
      if (!selectedUser) {
        alert("You have to choose user!");
        return;
      }

      fetch(`http://localhost:3001/users/${selectedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: lastNameInput,
          last_name: firstNameInput,
          middle_name: middleNameInput,
          age: ageInput,
          role: industryInput,
          industry: roleInput,
        }),
      }).then(() => {
        getUsers();
      });
    },
    [
      lastNameInput,
      firstNameInput,
      middleNameInput,
      ageInput,
      industryInput,
      roleInput,
      selectedUser,
      getUsers,
    ]
  );

  const handleDeleteRequest = useCallback((event) => {
    event.preventDefault();
    if (!selectedUser) return;
    fetch(`http://localhost:3001/users/${selectedUser._id}`, {
      method: "DELETE",
    }).then(() => {
      getUsers();
    });
  }, [selectedUser, getUsers]);

  return (
    <div>
      <div className="users-header">
        <Link to="/">
          <div>Go back</div>
        </Link>
      </div>

      <form className="input-form">
        <input
          type="text"
          onChange={(event) => handleInputChange(event, "last")}
          value={lastNameInput}
          placeholder="Last name"
        />
        <input
          type="text"
          onChange={(event) => handleInputChange(event, "first")}
          value={firstNameInput}
          placeholder="First name"
        />
        <input
          type="text"
          onChange={(event) => handleInputChange(event, "middle")}
          value={middleNameInput}
          placeholder="Middle name"
        />
        <input
          type="number"
          onChange={(event) => handleInputChange(event, "age")}
          value={ageInput}
          placeholder="Age"
          min="1"
          max="120"
        />
        <input
          type="text"
          onChange={(event) => handleInputChange(event, "industry")}
          value={industryInput}
          placeholder="Industry"
        />
        <input
          type="text"
          onChange={(event) => handleInputChange(event, "role")}
          value={roleInput}
          placeholder="Role"
        />

        <button onClick={handlePostRequest}>Post</button>
        <button onClick={handlePutRequest}>Put</button>

        <button onClick={getUsers}>Get</button>
        <button onClick={handleDeleteRequest}>Delete</button>
      </form>

      <div className="users-list">
        {users &&
          users.map((user) => {
            return (
              <div key={user._id}>
                <span>
                  <input
                    type="radio"
                    name="userRadio"
                    value={user._id}
                    checked={selectedUser === user}
                    onChange={() => handleRadioChange(user)}
                  />
                </span>
                <span>{`${user.last_name}`}</span>
                <span>{`${user.first_name}`}</span>
                <span>{`${user.middle_name}`}</span>
                <span>{`${user.age} років`}</span>
                <span>{`${user.industry} - ${user.role}`}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Users;
