import React from "react";

import SearchItem from "./SearchItem";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";

export default function SearchList(props) {
  const listItems = props.list
    ? props.list.map((i) => <SearchItem key={i.id} item={i} />)
    : ""; //;
  return (
    <div>
      <Typography variant="h6" component="h2">
        {props.totalCount} repository results
      </Typography>

      {listItems}
      <Pagination
        count={props.totalPages}
        page={props.currentPage}
        onChange={props.handlePageChange}
      />
    </div>
  );
}
