import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from "@mui/material";
import React, { ReactNode } from "react";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  borderTop: "1px solid rgba(255,255,255, 0.5)",
  borderBottom: "1px solid rgba(255,255,255, 0.5)",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  "&:first-of-type": {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  "&:last-of-type": {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const SectionAccordion: React.FC<{
  header: string;
  content: string | ReactNode;
}> = ({ header, content }) => {
  return (
    <StyledAccordion>
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
    </StyledAccordion>
  );
};

export default SectionAccordion;
