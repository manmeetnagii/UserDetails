import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import AddNewUser from "../components/AddNewUser/AddNewUser";
import "./userTable.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "../components/EditUser/EditUser";

interface Address {
  city: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  street: string;
  city: string;
  website: string;
  companyName: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenInputModal = () => {
    setIsInputModalOpen(true);
  };
  const handleOpenEditModal = (userId: number | null) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleCloseInputModal = () => {
    setIsInputModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null); // Clear selected user on modal close
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null); // Clear selected user on modal close
  };

  const handleOpenDeleteModal = (userId: number | null) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.log("Error Fetching Data", err));
    };

    toast.info(
      "Any changes to the data will not persist after refresh because of mock API."
    );
    fetchData();
  }, []);

  const handleSubmit = async ({
    name,
    email,
    website,
    companyName,
    phone,
    street,
    city,
    username,
  }: User) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        website,
        companyName,
        phone,
        street,
        city,
        username,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          toast.success(
            "User added successfully, but data won't persist after refresh because of mock API."
          );
          setIsInputModalOpen(false);
          return res.json();
        }
      })
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          toast.success("User deleted successfully.");
          handleCloseDeleteModal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main className="table" id="customers_table">
        <section className="table__header">
          <h1>User's Table</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data by Name..."
              onChange={handleSearch}
            />
            <img src="images/search.png" alt="" />
          </div>
          <div className="addUserButton">
            <button onClick={handleOpenInputModal}>
              Add New User<span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Edit User</th>
                <th>Delete User</th>
                <th>Details</th>
              </tr>
            </thead>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <p className="status delivered">{user.phone}</p>
                  </td>
                  <td>
                    <div
                      className="edit"
                      onClick={() => handleOpenEditModal(user.id)}
                    >
                      Edit User
                      <span className="material-symbols-outlined">
                        edit_note
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="delete"
                      onClick={() => handleOpenDeleteModal(user.id)}
                    >
                      Delete
                      <span className="material-symbols-outlined">delete</span>
                    </div>
                  </td>
                  <td>
                    <a onClick={() => navigate(`/details/${user.id}`)}>
                      View Details
                    </a>
                  </td>
                </tr>
              ))
            ) : filteredUsers.length === 0 ? (
              <p className="no-records">No Records Found</p>
            ) : (
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <p className="status delivered">{user.phone}</p>
                    </td>
                    <td>
                      <div
                        className="edit"
                        onClick={() => handleOpenEditModal(user.id)}
                      >
                        Edit User
                        <span className="material-symbols-outlined">
                          edit_note
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        className="delete"
                        onClick={() => handleOpenDeleteModal(user.id)}
                      >
                        Delete
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </div>
                    </td>
                    <td>
                      <a onClick={() => navigate(`/details/${user.id}`)}>
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </section>
      </main>

      {/* Add User Modal */}
      {isInputModalOpen && (
        <Modal
          isOpen={isInputModalOpen}
          onClose={handleCloseInputModal}
          title="Add New User"
        >
          <AddNewUser handleSubmit={() => handleSubmit} />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          title="Confirm Delete"
        >
          <p>Are you sure you want to delete this user?</p>
          <div className="button-container">
            <button className="btn" onClick={handleCloseDeleteModal}>
              Cancel
            </button>
            <button className="btn" onClick={() => onDelete(selectedUserId!)}>
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {/* Edit User Details Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title="Edit User Details"
        >
          <EditUser id={selectedUserId} />
        </Modal>
      )}

      <ToastContainer
        position="bottom-right"
        theme="dark"
        transition={Bounce}
        style={{ fontSize: "12px" }}
      />
    </>
  );
};

export default UserTable;
