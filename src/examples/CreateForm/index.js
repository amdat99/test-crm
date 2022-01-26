import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Card from "@mui/material/Card";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import MDInput from "components/MDInput";
import Divider from "@mui/material/Divider";
import MDBadge from "components/MDBadge";
import SelectedColumns from "./SelectedColumns";
import AddColumns from "./AddColumns";
import MDSnackbar from "components/MDSnackbar";
import useMediaQuery from "@mui/material/useMediaQuery";

const steps = ["Create Table Name", "Assign Users", "Create Column Types"];
const columns = [
  "text",
  "number",
  "email",
  "password",
  "tel",
  "url",
  "date",
  "time",
  "month",
  "week",
  "datetime",
  "color",
  "search",
];

function CreateForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [tableName, setTableName] = React.useState("");
  const [columnData, setColumns] = React.useState(new Set());
  const [error, setError] = React.useState(null);
  const matches = useMediaQuery("(max-width:800px)");

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const filterColumns = (value) => {
    const filter = columnData.filter((column) => column !== value);
    setColumns(filter);
  };

  const onSubmit = () => {
    if (!tableName || !columnData.length) {
      setError("Please enter a table name and select columns");
    } else {
      console.log(tableName, columnData);
    }
  };
  return (
    <Card
      className="hideScroll"
      sx={{
        width: "80%",
        marginLeft: "10%",
        marginTop: "3%",
        padding: 3,
        mb: 10,
        maxHeight: 750,
      }}
    >
      <Box sx={{ maxHeight: 750 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 0.5, ml: 0.9 }}>Step {activeStep + 1}</Typography>
            {activeStep === 0 && (
              <Box>
                <MDInput
                  sx={{ width: matches ? "100%" : "40%" }}
                  onChange={(e) => setTableName(e.target.value)}
                  label="Table Name"
                />
              </Box>
            )}
            {columnData.length > 0 && activeStep === 2 && (
              <Fade in={columnData.length > 0 && activeStep === 2}>
                <Box flex flexWrap="wrap" sx={{ position: "relative", bottom: 10 }}>
                  {columnData.map((column, index) => {
                    let columnArray = column.split(",");
                    return (
                      <MDBadge
                        variant="contained"
                        badgeContent={columnArray[0] + ": " + columnArray[1]}
                        key={index}
                        container
                      >
                        <Typography
                          sx={{
                            fontSize: 10,
                            color: "red",
                            position: "relative",
                            bottom: 4,
                            ml: 0.6,
                          }}
                          className="linker"
                          onClick={() => filterColumns(column)}
                        >
                          X
                        </Typography>
                      </MDBadge>
                    );
                  })}
                </Box>
              </Fade>
            )}
            {activeStep === 2 && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Box
                  className="hideScroll"
                  sx={{ width: matches ? "100%" : "67%", maxHeight: 400, overflow: "scroll" }}
                >
                  <Typography color="primary" ml={1} fontSize={12}>
                    Id and Date columns are automatically generated on all tables
                  </Typography>

                  {columns.map((column) => (
                    <AddColumns column={column} setColumns={setColumns} columnData={columnData} />
                  ))}
                </Box>
                <Divider orientation="vertical" />
                <SelectedColumns
                  columnData={columnData}
                  filterColumns={filterColumns}
                  setColumns={setColumns}
                />
              </div>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={activeStep === steps.length - 1 ? onSubmit : handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      <MDSnackbar
        title="Error"
        color="error"
        open={error}
        icon="error"
        close={() => setError(null)}
        content={error}
        autoHideDuration={4000}
      />
    </Card>
  );
}

export default CreateForm;
