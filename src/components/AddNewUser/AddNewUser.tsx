import React, { useState } from "react";
import "./addNewUser.css";

interface UserInputsProps {
  handleSubmit: (userData: UserData) => void;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  username: string;
  street: string;
  city: string;
  website: string;
  companyName: string;
}

const AddNewUser: React.FC<UserInputsProps> = ({ handleSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    username: "USER-name",
    street: "",
    city: "",
    companyName: "",
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    let isValid = true;
    let formErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name || formData.name.length < 3) {
      formErrors.name = "Name is required and should be at least 3 characters.";
      isValid = false;
    }

    // Email validation
    if (
      !formData.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      formErrors.email = "A valid email is required.";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Phone number is required and should be 10 digits.";
      isValid = false;
    }

    // Address validation
    if (!formData.street || !formData.city) {
      formErrors.address = "Street and City are required.";
      isValid = false;
    }

    // Company Name validation
    if (formData.companyName && formData.companyName.length < 3) {
      formErrors.companyName = "Company name must be at least 3 characters.";
      isValid = false;
    }

    // Website validation
    if (
      formData.website &&
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
        formData.website
      )
    ) {
      formErrors.website = "Website must be a valid URL.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      handleSubmit(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        username: "USER-name",
        street: "",
        city: "",
        companyName: "",
        website: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof UserData
  ) => {
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
      ...(fieldName === "name" && {
        username: `USER-${value.toLowerCase().replace(/\s+/g, "")}`,
      }),
    }));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          placeholder="Enter Phone Number"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange(e, "phone")}
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={formData.username} disabled />
      </div>
      <p>Address</p>
      <div>
        <label>Street:</label>
        <input
          type="text"
          placeholder="Enter Street"
          name="street"
          value={formData.street}
          onChange={(e) => handleChange(e, "street")}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          placeholder="Enter City"
          name="city"
          value={formData.city}
          onChange={(e) => handleChange(e, "city")}
          required
        />
      </div>
      {errors.address && <span className="error">{errors.address}</span>}
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          placeholder="Enter Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={(e) => handleChange(e, "companyName")}
        />
        {errors.companyName && (
          <span className="error">{errors.companyName}</span>
        )}
      </div>
      <div>
        <label>Website:</label>
        <input
          type="text"
          placeholder="Enter Website"
          name="website"
          value={formData.website}
          onChange={(e) => handleChange(e, "website")}
        />
        {errors.website && <span className="error">{errors.website}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddNewUser;
