import React, { useState, useRef, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Modal from "@mui/material/Modal";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Form from "examples/Form";
import DataTableExtensions from "react-data-table-component-extensions";
import Fab from "@mui/material/Fab";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import "react-data-table-component-extensions/dist/index.css";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import { useMaterialUIController } from "context";
import useMousePosition from "../../hooks/useMousePosition";

// @mui material components
function ReactTable({ title = "", columns, data, paginationPerPage, paginationOptions, loading }) {
  const { x, y } = useMousePosition();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showForm, setShowForm] = useState(false);

  createTheme("dark", {
    background: {
      default: "transparent",
    },
  });
  const ref = useRef();

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  // Update the current position if mouse is down
  const onMouseMove = (event) => {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY,
      });
    }
  };

  console.log(rowData);
  const formatForm = () => {
    setShowForm(true);
  };

  const handleRowSelected = React.useCallback((state) => {
    setShowActions(false);
    setRowData(state.selectedRows);
  }, []);
  const updateRow = (data) => {
    setToggleClearRows(true);
    if (!pressed) {
      setCurrentX(x);
      setCurrentY(y);
    }
    setRowData([data]);
    setShowActions(true);
  };
  const actionStyles = {
    width: "70px",
    position: "fixed",
    zIndex: "999",
    left: x ? currentX.toString() + "px" : "",
    top: x ? currentY.toString() + "px" : "",
    marginTop: "1%",
  };
  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <Fab
        sx={{ position: "absolute", marginLeft: "90%", marginTop: "3px", zIndex: 999 }}
        size="small"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Modal open={showForm}>
        <Form
          form={rowData.length > 10 ? rowData.splice(11) : rowData}
          onClose={() => setShowForm(false)}
        />
      </Modal>
      {rowData.length > 0 &&
        (showActions ? (
          <MDBox
            color="white"
            bgColor="primary"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            flexDirections="column"
            flex
            fontSize="12px"
            p={3}
            ref={ref}
            style={actionStyles}
            onMouseMove={onMouseMove}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
          >
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setRowData([]);
                setShowActions(false);
              }}
            >
              x
            </span>
            {rowData && (
              <p style={{ borderBottom: "solid", marginBottom: "5px" }}>id: {rowData[0].id}</p>
            )}
            <p onClick={formatForm}>View</p>
            <p>Delete</p>
          </MDBox>
        ) : null)}
      <DataTableExtensions {...tableData}>
        <DataTable
          expandableRows
          title={title}
          expandableRowsComponent={ExpandableRowComponent}
          expandOnRowClicked
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggledClearRows}
          darkMode={darkMode ? "dark" : "default"}
          pagination
          selectableRowsVisibleOnly
          pointerOnHover
          onRowClicked={(rowData) => updateRow(rowData)}
          highlightOnHover
        />
      </DataTableExtensions>
    </>
  );
}

ReactTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  formFields: PropTypes.array,
  pagination: PropTypes.bool,
  paginationPerPage: PropTypes.number,
  paginationOptions: PropTypes.array,
  setFormData: PropTypes.func,
  loading: PropTypes.bool,
};

ReactTable.defaultProps = {
  title: "",
  columns: [],
  data: [],
  formFields: [],
  pagination: false,
  paginationPerPage: 30,
  paginationOptions: [30, 60, 80, 100],
  setFormData: () => {},
  loading: false,
};

export default ReactTable;

const ExpandableRowComponent = ({ data, title }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [formData, setFormData] = useState(data);
  const [showUpdate, setShowUpdate] = useState(true);

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let items = null;
  items = Object.entries(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(items);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MDTypography
          color={showUpdate ? "primary" : "dark"}
          fontWeight="medium"
          className="linker"
          onClick={() => setShowUpdate(true)}
          sx={showUpdate ? { borderBottom: "solid" } : { borderBottom: "none" }}
          style={{ width: "3%", fontSize: "13px", marginLeft: "1%" }}
        >
          Row Data
        </MDTypography>

        <MDTypography
          color={!showUpdate ? "primary" : "dark"}
          className="linker"
          onClick={() => setShowUpdate(false)}
          fontWeight="medium"
          sx={!showUpdate ? { borderBottom: "solid" } : { borderBottom: "none" }}
          style={{ width: "3%", fontSize: "13px", marginLeft: "1%" }}
        >
          Visibilty
        </MDTypography>
      </div>
      <Divider style={{ position: "absolute", borderBottom: "solid" }} />

      {showUpdate ? (
        <Slide direction="down" in={showUpdate} out={!formData}>
          <Card>
            <MDBox
              color="primary"
              bgColor={darkMode ? "dark" : "white"}
              borderRadius="lg"
              shadow="lg"
              flex
              flexDirection="column"
              overflow="scroll"
              className="hideScroll"
              flexWrap="wrap"
              maxWidth="80vw"
              fontSize="12px"
              opacity={0.9}
              p={2}
            >
              <form onSubmit={onSubmit}>
                {items &&
                  items.map((item, i) => {
                    return (
                      <div
                        style={{
                          marginTop: "14px",
                          display: "flex",
                          color: "white",
                          flexDirection: "column",
                          flexWrap: "wrap",
                          width: item[1].toString().length * 10 + "px",
                          maxWidth: "70vw",
                          minWidth: "10vw",
                        }}
                        key={i}
                      >
                        <MDInput
                          multiline={item[1].length > 120 ? true : false}
                          color="primary"
                          label={item[0]}
                          value={item[1]}
                          name={item[0]}
                          type="text"
                          onChange={onChangeForm}
                        />
                      </div>
                    );
                  })}
                <MDBox mt={2} flex flexDirection="row">
                  <MDButton
                    color="info"
                    size={"30px"}
                    type="submit"
                    style={{ width: "5%", marginTop: "7px", marginRight: "10px" }}
                  >
                    Update
                  </MDButton>
                  <MDButton color="error" size={"30px"} style={{ width: "5%", marginTop: "7px" }}>
                    delete
                  </MDButton>
                </MDBox>
              </form>
            </MDBox>
          </Card>
        </Slide>
      ) : null}
    </>
  );
};
