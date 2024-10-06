import { useParams } from "react-router-dom";
import "./userDetails.css";
import { useEffect, useState } from "react";
import { FaBuilding, FaEnvelope, FaGlobe, FaInfo, FaPhoneAlt, FaRoad, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const UserDetails = () => {
  const { id } = useParams();

  const [users, setUsers] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.log("Error Fetching Data", err));
    };
    fetchData();
  }, [id]);

  return (
    <div className="user-details-container">
      <div className="user-detail-item">
        <FaUser className="icon" />
        <h1>{users.name}</h1>
      </div>
      <hr />
      <p>Basic Info (Email, Username, Phone)</p>
      <div className="user-detail-item">
        <FaEnvelope className="icon" />
        <p>{users.email}</p>
      </div>
      <div className="user-detail-item">
        <FaInfo className="icon" />
        <p>{users.username}</p>
      </div>
      <div className="user-detail-item">
        <FaPhoneAlt className="icon" />
        <p>{users.phone}</p>
      </div>
      <hr />
      <p>Address (Street, City)</p>
      <div className="user-detail-item">
        <FaRoad className="icon" />
        <p>{users?.address?.street}</p>
      </div>
      <div className="user-detail-item">
        <FaLocationDot className="icon" />
        <p>{users?.address?.city}</p>
      </div>
      <hr />
      <p>Misc (Website, Company)</p>
      <div className="user-detail-item">
        <FaGlobe className="icon" />
        <p>{users.website}</p>
      </div>
      <div className="user-detail-item">
        <FaBuilding className="icon" />
        <p>{users?.company?.name}</p>
      </div>
    </div>
  );
};

export default UserDetails;
