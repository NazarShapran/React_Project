import React, { useState } from "react";
import { useGetAllSneakers } from "../hooks/useGetAllSneakers";
import { useRemoveSneaker } from "../hooks/useRemoveSneaker";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import SneakerCard from "./SneakerCard";

const SneakerComponent = () => {
  const [newSneaker, setNewSneaker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { sneakers, setSneakers, loading, error } = useGetAllSneakers();
  const { removeSneaker } = useRemoveSneaker(sneakers, setSneakers);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }
  const filteredSneakers = sneakers.filter((sneaker) =>
    sneaker.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search brands..."
      />

      <Loader loading={loading}>
        <SneakerCard
          sneakers={sneakers}
          setSneakers={setSneakers}
          filteredSneakers={filteredSneakers}
          onRemove={removeSneaker}
        />
      </Loader>
    </>
  );
};

export default SneakerComponent;
