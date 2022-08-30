import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_PROJECT, ALL_USERS } from "../../graphql/graphqlQuery";

const AddProject = () => {
  const [users, setUsers] = useState([]);

  const [projectState, setProjectState] = useState({
    selectedUsers: [],
    lead: "",
    projectName: "",
    category: "",
  });

  const handleChange = (value, field) => {
    let temp = projectState;
    if (field === "users") {
      if (temp["selectedUsers"].indexOf(value) < 0)
        temp["selectedUsers"].push(value);
    } else {
      temp[field] = value;
    }
    setProjectState({ ...temp });
  };

  const usersQuery = useQuery(ALL_USERS, {
    // onCompleted: () => {
    //   // console.log("usersQuery", usersQuery, usersQuery);
    //   if(usersQuery)
    //   setUsers([...usersQuery?.data?.getAllUsers]);
    // },
  });

  useEffect(() => {
    if (usersQuery.data) setUsers([...usersQuery?.data?.getAllUsers]);
  }, [usersQuery.data]);


  const [submitProject, { data, loading, error }] = useMutation(ADD_PROJECT);

  return (
    <div>
      <div>
        <FormControl className="formControl">
          <InputLabel id="my-input">Project Name</InputLabel>
          <Input
            // value={projectState.projectName}
            onChange={(e) => handleChange(e.target.value, "projectName")}
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
            <MenuItem selected value="blockchain">
              Blockchain
            </MenuItem>
            <MenuItem value="datascience">Data Science</MenuItem>
            <MenuItem value="website">Website</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="formControl">
          <InputLabel>Lead</InputLabel>
          <Select onChange={(e) => handleChange(e.target.value, "lead")}>
            {users.map((user) => (
              <MenuItem value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="formControl">
          <InputLabel>Users</InputLabel>
          <Select onChange={(e) => handleChange(e.target.value, "users")}>
            {users.map((user) => (
              <MenuItem value={user.id}>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
                <ListItemText>{user.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <button
          onClick={() =>
            submitProject({
              variables: {
                name: projectState.projectName,
                lead: projectState.lead,
                users: projectState.selectedUsers,
                category: projectState.category,
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

export default AddProject;
