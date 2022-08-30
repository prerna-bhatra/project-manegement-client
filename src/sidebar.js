import React, { useState } from "react";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import "./styles.css";
const SiedBar = () => {
  return (
    <div>
      <Drawer
        variant="permanent"
        classes={{
          paper: "sidebar",
        }}
      >
        <List>
          <Link to="/add-project">
            <ListItem>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary="Add Project" />
            </ListItem>
          </Link>
          <Link to="/add-task">
            <ListItem>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary="Add Task" />
            </ListItem>
          </Link>
         
          {/* {[{
            addProject:"Add Project",
            backLogs:"back Logs"
          }].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>
    </div>
  );
};

// "Add Projoect", "Backglogs", "People", "My Tasks"

export default SiedBar;
