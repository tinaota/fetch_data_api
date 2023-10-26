import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FiMoreVertical } from "react-icons/fi";

const UserListMenu = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://random-data-api.com/api/users/random_user?size=10"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <div className="header-top">
        <div className="input_txt">
          {selectedUser ? (
            <div>
              <span>
                Displaying information for {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </span>
            </div>
          ) : (
            <span>No user is currently selected</span>
          )}
        </div>
        <div className="dropdown">
          <DropdownButton id="user-dropdown" title={<FiMoreVertical />}>
            {users.map((user) => (
              <Dropdown.Item
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                {user.first_name} {user.last_name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>
      <div className="selected_user">
        {selectedUser && <pre>{JSON.stringify(selectedUser, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default UserListMenu;
