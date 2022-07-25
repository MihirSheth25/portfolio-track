/* MIHIR SHETH | 18/07/2022 */

import React, { useState } from "react";
import styles from "./Tooltip.module.css";

// https://mui.com/material-ui/getting-started/installation/ => fonts required for Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Tooltip component from MUI
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// https://mui.com/material-ui/material-icons/?query=close&theme=Outlined&selected=CloseOutlined => close icon
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

// https://stackoverflow.com/questions/36759985/how-to-style-mui-tooltip => overall tooltip style
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
          color: "black",
          backgroundColor: "#e3e3e3",
          border: "1px solid grey",
          borderRadius: "0",
          padding: "0",
          maxWidth: "30vw",
        },
      },
    },
  },
});

function ToolTip(props) {
  // https://codesandbox.io/s/serverless-smoke-1itbb?file=/src/App.js => state to close tooltip on button click
  const [openTooltip, setOpenTooltipValue] = useState(null);

  const toggleClick = (val) => {
    setOpenTooltipValue(openTooltip === val ? null : val);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tooltip
        onClose={() => toggleClick(null)}
        open={openTooltip === props.mapThrough}
        title={
          <div
            className={styles.ttContent}
            onMouseLeave={() => toggleClick(false)}
          >
            <div className={styles.titleBox}>
              <div className={styles.ttTitleText}>{props.ttTitle}</div>
              <button
                type="button"
                className={styles.ttButton}
                onClick={() => toggleClick(false)}
              >
                <ClearOutlinedIcon
                  sx={{
                    fontSize: "15px",
                    margin: "2px 1px auto 2px",
                  }}
                />
              </button>
            </div>
            <div className={styles.ttText}>{props.ttText}</div>
          </div>
        }
        placement="right"
        // PopperProps={{
        //   modifiers: [
        //     {
        //       name: "offset",
        //       options: {
        //         offset: [0, 50],
        //       },
        //     },
        //   ],
        // }}
        // leaveDelay={100}
      >
        <span onMouseEnter={() => toggleClick(props.mapThrough)}>
          {props.children}
        </span>
      </Tooltip>
    </ThemeProvider>
  );
}

export default ToolTip;
