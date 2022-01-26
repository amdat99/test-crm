import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDSnackbar from "components/MDSnackbar";
import useMediaQuery from "@mui/material/useMediaQuery";

function Columns({ column, setColumns, columnData }) {
  const [columnName, setColumnName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [showExample, setShowExample] = React.useState(false);
  const matches = useMediaQuery("(max-width:800px)");

  const addColumn = () => {
    if (
      columnName === "date" ||
      columnName === "id" ||
      columnName.trim() === "updatedat" ||
      columnName === "updated_at"
    ) {
      setError(true);
    } else {
      setColumns([
        ...columnData,
        columnName.toString().toLowerCase() + "," + column + "," + Math.random(),
      ]);
    }
  };

  return (
    <>
      <Accordion key={column}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{column}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MDInput
            label={column}
            sx={{ width: !matches ? "60%" : "100%" }}
            placeholder={`column name`}
            onChange={(e) => setColumnName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addColumn()}
          />
          <MDButton
            sx={{ marginLeft: 2, marginTop: 0.5 }}
            variant="contained"
            color="info"
            disabled={!columnName}
            onClick={addColumn}
          >
            Add Column
          </MDButton>
          <Typography
            onClick={() => setShowExample(!showExample)}
            sx={{ fontSize: 12, cursor: "pointer" }}
          >
            {showExample ? "hide" : "show" + " example type"}
          </Typography>
          {showExample && (
            <form>
              <MDInput
                type={column}
                placeholder={"This is a " + column + " type"}
                sx={{ width: "40%", height: "5%" }}
              />
            </form>
          )}
        </AccordionDetails>
      </Accordion>
      <MDSnackbar
        title="Reserved names"
        color="error"
        open={error}
        icon="error"
        close={() => setError(false)}
        content="date, id, and updated at columns are already added to tables"
        autoHideDuration={4000}
      />
    </>
  );
}

export default Columns;
