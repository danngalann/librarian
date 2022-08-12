import { Box, Text } from "@mantine/core";
import React from "react";

export default function Message({ children, mine }) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: mine ? theme.colors.green[2] : theme.colors.blue[2],
        width: "80%",
        borderRadius: 8,
        padding: "18px 20px",
        margin: "10px 0",
        float: mine ? "right" : "left"
      })}
    >
      <Text size={18} span style={{overflowWrap: "anywhere"}}>{children}</Text>
    </Box>
  );
}
