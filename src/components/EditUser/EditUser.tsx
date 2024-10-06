import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
  phone: string;
  username: string;
  street: string;
  city: string;
  companyName: string;
  website: string;
}

interface EditUserProps {
    id: number | null;
  }

const EditUser: React.FC<EditUserProps> = ({id}) => {
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    username: "",
    street: "",
    city: "",
    companyName: "",
    website: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data.");
        
        const data = await response.json();
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          username: `USER-${data.name.toLowerCase().replace(/\s+/g, "")}`,
          street: data.address.street,
          city: data.address.city,
          companyName: data.company.name,
          website: data.website,
        });
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    
    if (name === "name") {
      setUserData((prevData) => ({
        ...prevData,
        username: `USER-${value.toLowerCase().replace(/\s+/g, "")}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error updating user details.");
      
      console.log("User details updated successfully.");
      toast.success("User updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          placeholder="USER-name"
          disabled 
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={userData.street}
          onChange={handleChange}
          placeholder="Enter Street"
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
          placeholder="Enter City"
          required
        />
      </div>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={userData.companyName}
          onChange={handleChange}
          placeholder="Enter Company Name"
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="text"
          name="website"
          value={userData.website}
          onChange={handleChange}
          placeholder="Enter Website"
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUser;
