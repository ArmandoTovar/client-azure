"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Simulación de datos desde la base de datos
const fetchSidebarOptions = async (userType) => {
  return [
    {
      id: 1,
      label: "Dashboard",
      icon: <HomeIcon />,
      enabled: true,
      roles: ["admin", "user"],
      children: [],
    },
    {
      id: 2,
      label: "Clientes",
      icon: <AccountCircleIcon />,
      enabled: true,
      roles: ["admin", "user"],
      children: [
        {
          id: 3,
          label: "Lista de Clientes",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
        {
          id: 4,
          label: "Historial de Clientes",
          enabled: true,
          roles: ["admin"],
          children: [],
        },
      ],
    },
    {
      id: 5,
      label: "Planes y Servicios",
      icon: <SettingsIcon />,
      enabled: true,
      roles: ["admin", "user"],
      children: [
        {
          id: 6,
          label: "Planes Móviles",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
        {
          id: 7,
          label: "Planes de Internet",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
        {
          id: 8,
          label: "Servicios Adicionales",
          enabled: true,
          roles: ["admin"],
          children: [],
        },
      ],
    },
    {
      id: 9,
      label: "Facturación y Pagos",
      icon: <SettingsIcon />,
      enabled: true,
      roles: ["admin", "user"],
      children: [
        {
          id: 10,
          label: "Pagos Pendientes",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
        {
          id: 11,
          label: "Historial de Pagos",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
        {
          id: 12,
          label: "Métodos de Pago",
          enabled: true,
          roles: ["admin"],
          children: [],
        },
      ],
    },
    {
      id: 13,
      label: "Soporte y Ayuda",
      icon: <SettingsIcon />,
      enabled: true,
      roles: ["admin", "user"],
      children: [
        {
          id: 14,
          label: "Centro de Ayuda",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
        {
          id: 15,
          label: "Reportar Problema",
          enabled: true,
          roles: ["admin", "user"],
          children: [],
        },
      ],
    },
  ].filter((option) => option.enabled && option.roles.includes(userType));
};

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.label} />
        {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <SidebarItem key={child.id} item={child} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default function Sidebar({ userType }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadMenuItems = async () => {
      const options = await fetchSidebarOptions(userType);
      setMenuItems(options);
    };
    loadMenuItems();
  }, [userType]);

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </List>
    </Drawer>
  );
}

