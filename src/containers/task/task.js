import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { GET_TASK_BY_ID } from "../../graphql/graphqlQuery";

const Task = () => {
  const location = useLocation();

  const { loading, error, data } = useQuery(GET_TASK_BY_ID, {
    variables: { id: location.state.id },
    onCompleted: () => {},
  });

  return (
    <div>
      <h4>Task</h4>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Projects</Link>
        <Link to="/">{location.state.name}</Link>
        <Link to="/">{location.state.id}</Link>
      </Breadcrumbs>

      {data && data.getTaskById && (
        <div className="main-task-body">
          <div className="task-details">
            <h4>{data.getTaskById.name}</h4>
            <p>{data.getTaskById.description}</p>
          </div>

          <div className="task-users">
            <h6>Deatils</h6>
            <ul>
              <li>Assignee : {data.getTaskById?.assignee.name}</li>
              <li>Assigned By : {data.getTaskById?.assigneedBy.name}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
