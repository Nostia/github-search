import React from "react";

import { Typography, AppBar, Toolbar } from "@material-ui/core";


export default function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="h1">
          Github Search
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
