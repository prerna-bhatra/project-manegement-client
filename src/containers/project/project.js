import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";

import { GET_PROJECT_BY_ID } from "../../graphql/graphqlQuery";

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tasksArray, setTasksArray] = useState([]);

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: location.state.id },
    onCompleted: () => {
      const tempTasks = data.getProjectById.tasks;
      const todoArr = [];
      const inProgressArr = [];
      const doneArr = [];
      tempTasks.map((element, index) => {
        if (element.status === "to-do") todoArr.push(element);
        if (element.status === "in-progress") inProgressArr.push(element);
        if (element.status === "done") doneArr.push(element);
      });
      const tempArr = [todoArr, inProgressArr, doneArr];
      setTasksArray([...tempArr]);
    },
  });

  const goToTask = (taskId, projectName) => {
    navigate("/task", {
      state: {
        id: taskId,
        name: projectName,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className="project-body">
      {data && data.getProjectById && (
        <>
          <h3 className="text-left">{data.getProjectById.name}</h3>
          <Grid item xs={12}>
            <Grid container justifyContent="" spacing={2}>
              {tasksArray.map((value, index) => (
                <Grid className="task-grid" key={index} item>
                  {index === 0 ? (
                    <>
                      <div className="task-category">
                        <h5>TO DO</h5>
                        <div className="text-right">{value.length}</div>
                      </div>
                      {value.map((taskItem) => (
                        <div
                          onClick={() =>
                            goToTask(taskItem.id, data.getProjectById.name)
                          }
                          className="task-card"
                        >
                          <h4>{taskItem.name}</h4>
                          <p>{taskItem?.description}</p>
                        </div>
                      ))}
                    </>
                  ) : null}
                  {index === 1 ? (
                    <>
                      <div className="task-category">
                        <h5>IN PROGRESS</h5>
                        <div className="text-right">{value.length}</div>
                      </div>

                      {value.map((taskItem) => (
                        <div
                          onClick={() =>
                            goToTask(taskItem.id, data.getProjectById.name)
                          }
                          className="task-card"
                        >
                          <h4>{taskItem.name}</h4>
                          <p>{taskItem?.description}</p>
                        </div>
                      ))}
                    </>
                  ) : null}

                  {index === 2 ? (
                    <>
                      <div className="task-category">
                        <h5>DONE</h5>
                        <div className="text-right">{value.length}</div>
                      </div>

                      {value.map((taskItem) => (
                        <div
                          className="task-card"
                          onClick={() =>
                            goToTask(taskItem.id, data.getProjectById.name)
                          }
                        >
                          <h4>{taskItem.name}</h4>
                          <p>{taskItem?.description}</p>
                        </div>
                      ))}
                    </>
                  ) : null}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};
export default Project;
