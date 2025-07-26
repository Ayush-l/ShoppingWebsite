import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useHomeSectionCardDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/product/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((result) => {
        setData(result)
    })
      .catch((error) => {
        console.error("Fetch failed:", error);
        localStorage.removeItem("jwt");
        navigate("/login");
      });
  }, [navigate]);
  return data;
};

export default useHomeSectionCardDetails;