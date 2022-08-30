import { useMutation, useQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GET_ALL_PROJECTS, ALL_USERS, ADD_TASK } from "../../graphql/graphqlQuery";

const AddTask = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [taskState, setTaskState] = useState({
    assignee: "",
    assigneedBy: "",
    taskName: "",
    category: "",
    description: "",
    project: "",
  });

  const usersQuery = useQuery(ALL_USERS, {
    // onCompleted: () => {
    //   if (usersQuery) setUsers([...usersQuery?.data?.getAllUsers]);
    // },
  });

  const projectQueries = useQuery(GET_ALL_PROJECTS, {
    // onCompleted: () => {
    //   //   console.log("projectQueries", projectQueries.data);
    //   if (projectQueries)
    //     setProjects([...projectQueries?.data?.getAllProjects]);
    // },
  });

  const [submitTask ,{data , loading , error}] = useMutation(ADD_TASK)

  useEffect(() => {
    if (usersQuery.data) setUsers([...usersQuery?.data?.getAllUsers]);
    if (projectQueries.data)
      setProjects([...projectQueries?.data?.getAllProjects]);
  }, [usersQuery.data, projectQueries.data]);

  const handleChange = (value, field) => {
    let temp = taskState;
    temp[field] = value;
    setTaskState({ ...temp });
  };

  return (
    <div>
      <div>
        <FormControl className="formControl">
          <InputLabel>Task Name</InputLabel>
          <Input
            onChange={(e) => handleChange(e.target.value, "taskName")}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
      </div>

      <div>
        <FormControl className="formControl">
          <InputLabel>Description</InputLabel>
          <Input
            onChange={(e) => handleChange(e.target.value, "description")}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
      </div>

      <div>
        <FormControl className="formControl">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            onChange={(e) => handleChange(e.target.value, "category")}
          >
           <MenuItem value="feature">feature</MenuItem>
           <MenuItem value="issue">Issue</MenuItem>
          </Select>
        </FormControl>
      </div>

     

      <div>
        <FormControl className="formControl">
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            onChange={(e) => handleChange(e.target.value, "project")}
          >
            {projects.length > 0 &&
              projects.map((item) => (
                <MenuItem selected value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="formControl">
          <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            onChange={(e) => handleChange(e.target.value, "assignee")}
          >
            {users.length > 0 &&
              users.map((item) => (
                <MenuItem selected value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="formControl">
          <InputLabel id="demo-simple-select-label">Assigned By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            onChange={(e) => handleChange(e.target.value, "assigneedBy")}
          >
            {users.length > 0 &&
              users.map((item) => (
                <MenuItem selected value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>


      <div>
        <button
          onClick={() =>
            submitTask({
              variables: {
                name: taskState.taskName,
                assignee: taskState.assignee,
                assigneedBy: taskState.assigneedBy,
                project: taskState.project,
                category:taskState.category,
                description:taskState.description
              },
              onCompleted: (data) => {
                if (data) {
                  alert("success");
                } else {
                  alert("error");
                }
              },
            })
          }
          type="button"
        >
          submit
        </button>
      </div>


    </div>
  );
};

export default AddTask;
