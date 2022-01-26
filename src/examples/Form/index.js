import React from "react";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { useState } from "react";
import { VolunteerActivismOutlined } from "@mui/icons-material";

function Form({ form }) {
  const [formData, setFormData] = useState(form);
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    formData.filter((item) => item.hasOwnPoperty(name) && item[name] === value);
  };

  console.log(formData);
  return (
    <>
      <MDBox
        color="primary"
        bgColor="light"
        borderRadius="lg"
        shadow="lg"
        flex
        flexDirection="column"
        overflow="scroll"
        flexWrap="wrap"
        maxHeight="80vh"
        maxWidth="80vw"
        fontSize="12px"
        opacity={0.9}
        p={2}
      >
        {formData.map((v, i) => {
          let items = null;
          items = Object.entries(v);
          return (
            <div style={{ borderTop: "solid" }} key={i}>
              <b style={{ borderBottom: "solid", width: "10%", fontSize: "13px" }}>Row Data</b>
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
                        minWidth: "8vw",
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
              <MDBox mt={2} flex flexDirection="row" mb={2}>
                <MDButton
                  color="info"
                  size={"30px"}
                  style={{ width: "5%", marginTop: "7px", marginRight: "10px" }}
                >
                  Update
                </MDButton>
                <MDButton color="error" size={"30px"} style={{ width: "5%", marginTop: "7px" }}>
                  delete
                </MDButton>
              </MDBox>
            </div>
          );
        })}
      </MDBox>
    </>
  );
}

export default Form;
