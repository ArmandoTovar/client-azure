import Typography from "@mui/material/Typography";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export const PageLayout = (props) => {
  return (
    <>
      <NavBar />
      <SideBar userType={"admin"} />
      <Typography variant="h5">
        <center>
          Welcome to the Microsoft Authentication Library For React Next.js
          Quickstart
        </center>
      </Typography>
      <br />
      <br />
      {props.children}
    </>
  );
};

