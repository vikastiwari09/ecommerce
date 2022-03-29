import React, { Fragment, useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { Backdrop } from '@material-ui/core'
import { Dashboard, Person, ExitToApp, ListAlt } from '@material-ui/icons'
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'

const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        { icon : <ExitToApp/>, name:"Logout", func: logoutUser},
    ];


    if (user.role === "admin") {
        options.unshift({
          icon: <Dashboard />,
          name: "Dashboard",
          func: dashboard,
        });
    }

    function dashboard() {
        navigate("/dashboard");
    }
    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

  return (
      <Fragment>
          <Backdrop open={open} style={{ zIndex: "10" }} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className='speedDial'
            icon={
                <img
                  className="speedDialIcon"
                  src={user.avatar.url ? user.avatar.url : 'Profile.png' }
                  alt="Profile"
                />
            }
          >
            {options.map((item) => (
                <SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}
                   // tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            ))}
          </SpeedDial>
      </Fragment>
  )
}

export default UserOptions