import React, { memo, useCallback, useState } from "react";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import CancelButton from "../../../../../common/components/Buttons/CancelButton";

const TableRowComponent = ({
  brand,
  onRemove,
  updateBrand,
  onValidationError,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameEdit, setNameEdit] = useState(brand.name);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
    setNameEdit(brand.name);
  }, [brand.name]);

  const handleSave = useCallback(async () => {
    if (!nameEdit.trim()) {
      onValidationError("Brand name cannot be empty.");
      return;
    }
    if (nameEdit.trim().length < 3) {
      onValidationError("Brand name must be at least 3 characters long.");
      return;
    }

    const isValid = await updateBrand(brand.id, nameEdit);
    if (isValid) {
      toggleEditMode();
    }
  }, [nameEdit, updateBrand, brand.id, toggleEditMode, onValidationError]);

  return (
    <tr>
      <td>{brand.id}</td>
      <td>
        {isEditMode ? (
          <input
            value={nameEdit}
            onChange={(e) => setNameEdit(e.target.value)}
          />
        ) : (
          brand.name
        )}
      </td>
      <td>
        <div style={{ display: "flex", gap: "1em" }}>
          {isEditMode ? (
            <>
              <SaveButton onSubmit={handleSave} />
              <CancelButton onSubmit={toggleEditMode} />
            </>
          ) : (
            <>
              <EditButton onSubmit={toggleEditMode} />
              <RemoveButton onSubmit={() => onRemove(brand.id)} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TableRow = memo(TableRowComponent);

export default TableRow;
