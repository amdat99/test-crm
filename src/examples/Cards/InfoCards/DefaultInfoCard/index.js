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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultInfoCard({
  color,
  icon,
  title,
  description,
  value,
  noIcon,
  selectValue,
  id,
  handleChange,
}) {
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
  console.log(value);
  return (
    <Card>
      <MDBox p={1} mx={3} display="flex" justifyContent="center">
        {!noIcon && (
          <MDBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={color}
            color="white"
            width="2rem"
            height="2rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
          >
            <Icon fontSize="default">{icon}</Icon>
          </MDBox>
        )}
      </MDBox>
      <MDBox pb={1} px={1} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
          {selectValue && "Name: "} {title}
        </MDTypography>
        {description && (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </MDTypography>
        )}
        {description && !value ? null : <Divider />}
        {/* <MDTypography variant="caption" color="text" fontWeight="regular" mr={1}>
          {value}
        </MDTypography> */}
        {value &&
          (selectValue ? (
            <Select
              labelId="value-select"
              id="value-select"
              defaultValue={value}
              label={value}
              displayEmpty={true}
              onChange={handleChange}
              renderValue={(selected) => {
                return value;
              }}
            >
              <MenuItem disabled value="">
                <em>{value}</em>
              </MenuItem>
              {columns.map((column, i) => (
                <MenuItem key={i} value={title + "," + column + "," + id}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <MDTypography variant="caption" fontWeight="medium">
              {value}
            </MDTypography>
          ))}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
  noIcon: false,
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  noIcon: PropTypes.bool,
};

export default DefaultInfoCard;
