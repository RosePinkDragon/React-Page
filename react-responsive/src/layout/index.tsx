import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

function DashboardLayout() {
  return (
    <div>
      {/* Top Navigation */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Navigation */}
      <Drawer variant="persistent" anchor="left" open>
        <div style={{ width: drawerWidth }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <main
        style={{
          width: "100%",
          padding: "72px 16px 16px",
          marginLeft: drawerWidth,
        }}
      >
        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
