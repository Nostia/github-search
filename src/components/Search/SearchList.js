import React from "react";

import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";

export default function SearchList(props) {
  const listItems = props.list.map((i) => <div key={i.id}>{i.title}</div>);
  return (
    <div>
      <Typography variant="h6" component="h2">
        Search result:
      </Typography>

      {listItems}
      <Pagination count={3} />
    </div>
  );
}
