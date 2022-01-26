import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DefaultInfoCard from "../Cards/InfoCards/DefaultInfoCard/index.js";
import useMediaQuery from "@mui/material/useMediaQuery";

import Typography from "@mui/material/Typography";

function SelectedColumns({ columnData, filterColumns, setColumns }) {
  const matches = useMediaQuery("(max-width:800px)");

  const handleChange = (e) => {
    const { value } = e.target;
    let array = value.split(",");
    const filter = [];
    columnData.forEach((column, i) => {
      if (i.toString() !== array[2]) {
        filter.push(column);
      }
      filter.push(array[0].toString().toLowerCase() + "," + [array[1] + "," + array[2]]);
    });
    console.log("f", filter);
    setColumns([...new Set(filter)]);
  };

  console.log(columnData);
  return (
    <>
      {columnData.length && !matches ? (
        <Box
          className="hideScroll"
          sx={{
            width: matches ? "5%" : "40%",
            maxHeight: 500,
            overflow: "scroll",
            ml: matches ? 1 : 3,
            flexWrap: "wrap",
          }}
        >
          {columnData.map((column, i) => {
            let columArray = column.split(",");
            return (
              <div key={i}>
                <DefaultInfoCard
                  noIcon={true}
                  selectValue
                  handleChange={handleChange}
                  title={columArray[0]}
                  id={i}
                  // description="Belong Interactive"
                  value={columArray[1]}
                />
                <Box sx={{ border: " 3px solid #E91E63 ", mb: 1, mt: 1 }} />
                <IconButton
                  sx={{ position: "relative", bottom: 120, left: "92%" }}
                  aria-label="delete"
                  onClick={() => filterColumns(column)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            );
          })}
        </Box>
      ) : !matches ? (
        <Typography sx={{ mt: "15%", ml: "7%" }} variant="h5" component="h5">
          No Columns Selected
        </Typography>
      ) : null}
    </>
  );
}

export default SelectedColumns;
