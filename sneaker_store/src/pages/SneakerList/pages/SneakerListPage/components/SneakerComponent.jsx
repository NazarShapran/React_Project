import React, { useState } from "react";
import { useGetAllSneakers } from "../hooks/useGetAllSneakers";
import SneakerCard from "./SneakerCard";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";

const SneakerComponent = () => {
  const [newSneaker, setNewSneaker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { sneakers, setSneakers, loading, error } = useGetAllSneakers();

  const filteredSneakers = sneakers.filter((sneaker) =>
    sneaker.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Loader loading={loading}>
      <SneakerCard
        sneakers={sneakers}
        setSneakers={setSneakers}
        filteredSneakers={filteredSneakers}
      />
    </Loader>
  );
};

export default SneakerComponent;
