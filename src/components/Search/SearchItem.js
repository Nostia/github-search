import React from "react";

import Paper from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

let moment = require("moment");

export default function SearchItem(props) {
  return (
    <Paper square className="search-item" variant="outlined">
      <Typography variant="h6">
        <a href={props.item.html_url} target="blank_" rel="noopener noreferrer">
          {props.item.full_name}
        </a>
      </Typography>
      <div>{props.item.description}</div>
      <div className="search-item-tags">
        {props.item.topics.map((t, i) => (
          <Chip
            key={i}
            label={t}
            size="small"
            color="primary"
            variant="outlined"
          />
        ))}
      </div>
      <div className="search-item-info">
        <span>
          <StarIcon />
          <span>{props.item.stargazers_count}</span>
        </span>
        {props.item.language && <span>{props.item.language}</span>}
        {props.item.license && <span>{props.item.license.name}</span>}
        <span>{moment(props.item.updated_at).fromNow()}</span>
      </div>
    </Paper>
  );
}
