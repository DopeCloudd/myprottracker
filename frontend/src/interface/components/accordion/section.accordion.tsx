import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { ReactNode } from "react";

const SectionAccordion: React.FC<{
  header: string;
  content: string | ReactNode;
}> = ({ header, content }) => {
  return (
    <Accordion
      sx={{
        background: "transparent",
        boxShadow: "none",
        borderTop: "1px solid rgba(255,255,255, 0.5)",
        borderBottom: "1px solid rgba(255,255,255, 0.5)",
        my: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
        sx={{
          border: "none",
          fontFamily: "Integral Oblique, sans-serif",
        }}
      >
        {header}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          border: "none",
        }}
      >
        {content}
      </AccordionDetails>
    </Accordion>
  );
};

export default SectionAccordion;
