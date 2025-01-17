import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { useStoreActions, useStoreState } from "./../../hooks";

import { LanguageMenuContainer } from "../common/LanguageMenu";
import React from "react";
import { WalletUsername } from "./../../components/styled";
import { useHistory } from "react-router-dom";

export const AccountNavBarContainer = () => {
  const history = useHistory();

  const { username, token } = useStoreState((state) => state.session);
  const { toggleNodeSettings, toggleP2PSettings, toggleTorSettings } = useStoreActions((actions) => actions.ui);
  const { logout } = useStoreActions((actions) => actions.session);

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <WalletUsername>{username}</WalletUsername>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT} className="bp4-dark">
        <Button
          minimal={true}
          icon="console"
          onClick={() => history.push("/status")}
        />
        <NavbarDivider />
        <LanguageMenuContainer />
        <NavbarDivider />
        <Button
          minimal={true}
          icon="settings"
          onClick={() => {
            toggleNodeSettings(true);
          }}
        />
        <Button
          minimal={true}
          icon="ip-address"
          onClick={() => {
            toggleP2PSettings(true);
          }}
        />
        <Button
          minimal={true}
          icon="shield"
          onClick={() => {
            toggleTorSettings(true);
          }}
        />
        <NavbarDivider />
        <Button
          minimal={true}
          large={true}
          icon="log-out"
          onClick={async () => {
            try {
              require("electron-log").info(`Trying to logout...`);
              await logout(token);
              require("electron-log").info("Logged out!");
            } catch (error) {
              require("electron-log").error(`Error trying to Logout: ${error.message}`);
            }
          }}
        />
        <NavbarDivider />
        <Button
          minimal={true}
          icon="lifesaver"
          onClick={() => history.push("/help")}
        />
      </NavbarGroup>
    </Navbar>
  );
};
