import React from "react";
import { useLocation } from "react-router-dom";
import SneakerComponent from "./components/SneakerComponent";
import "./SneakerListPageStyle.css";

const SneakerListPage = () => {
  const location = useLocation();

  return <>{location.pathname === "/sneakers" && <SneakerComponent />}</>;
};

export default SneakerListPage;
