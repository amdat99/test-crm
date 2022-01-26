/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CreateForm from "examples/CreateForm";
import Modal from "@mui/material/Modal";

import DataTable from "examples/Tables/DataTable";
import ReactTable from "examples/ReactTable";
import useFetchData from "hooks/useFetchData";
import React, { useState, useEffect } from "react";
function Tables() {
  const [route, setRoute] = useState("comments");
  const { data, fetchData, error, isFetching, resetError } = useFetchData(
    {
      url: "https://jsonplaceholder.typicode.com/",
      type: "get",
      route: route,
    },
    route,
    true,
    true
  );
  const [form, setForm] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  useEffect(() => {
    if (route) {
      fetchData();
    }
  }, [route]);

  const [columnData, setColumnData] = useState([]);
  let columns = [];
  let formData = [];
  const formdatData = React.useCallback(() => {
    Object.entries(data[0]).map(([k, v]) => {
      if (k === "postId") {
        columns.push({
          name: k,
          selector: (row) => row[k],
          width: "36x", // custom width for icon button
        });
      } else {
        columns.push({
          name: k,
          selector: (row) => row[k],
          sortable: true,
          reorder: true,
          compact: true,
          width: (v.length * 11).toString() + "px",
        });
        setColumnData(columns);
      }
    });
  }, [data, columns]);

  useEffect(() => {
    if (data.length) {
      formdatData();
    }
  }, [data]);

  const tables = ["comments", "photos", "todos"];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Modal open={showCreateForm} onClose={() => setShowCreateForm(false)}>
        <CreateForm />
      </Modal>
      <MDBox pt={3} pb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MDBox
              mt={-3}
              py={2}
              px={2}
              variant="gradient"
              bgColor="info"
              style={{ display: "flex", flexDirection: "row" }}
              borderRadius="lg"
              coloredShadow="info"
            >
              {tables.map((table) => {
                return (
                  <MDTypography
                    variant="h6"
                    cursor="pointer"
                    className="linker"
                    mr={2}
                    color="white"
                    onClick={() => {
                      setRoute(table);
                    }}
                  >
                    {table}
                  </MDTypography>
                );
              })}
            </MDBox>
            <MDTypography
              sx={{ fontSize: 15, right: 30, position: "absolute", zIndex: 999 }}
              className="linker"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              Create Table
            </MDTypography>
          </Grid>
          <Grid item xs={12}>
            {error && (
              <MDAlert dismissible color="error">
                {error}
              </MDAlert>
            )}
            <Card>
              <MDBox>
                <ReactTable
                  data={columnData.length ? data : []}
                  columns={columnData}
                  title={route}
                  formFields={form}
                  loading={isFetching}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
{
  /* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */
}
export default Tables;
