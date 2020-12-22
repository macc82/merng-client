import React from "react";
import { Icon, Menu, Popup } from "semantic-ui-react";

const BottomBar = () => {
  const createdBy = "Created by: Miguel Corrales Cortés";

  return (
    <Menu className="bottomBar"
      fixed="bottom"
      inverted
      pointing
      size="large"
      style={{ justifyContent: "space-between" }}
    >
      <Menu.Item header>{createdBy}</Menu.Item>
      <Menu.Menu icon="labeled" position="right">
        <Menu.Item fitted
          href="https://github.com/macc82/merng-server"
          target="_blank"><Popup trigger={<Icon name="github" />} content='View code of BackEnd' /></Menu.Item>
        <Menu.Item fitted
          href="https://github.com/macc82/merng-client"
          target="_blank"
        ><Popup trigger={<Icon name="github" />} content='View code of FrontEnd' /></Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default BottomBar;
