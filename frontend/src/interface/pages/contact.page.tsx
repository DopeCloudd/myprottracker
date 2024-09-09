import TextTitle from "@/interface/components/text/text-title.component";
import { Box } from "@mui/material";
import React from "react";
import { ContactForm } from "@/interface/components/form/contact.form";

const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        px: { xs: 3, sm: 6 },
      }}
    >
      <TextTitle content="Contact" />
      <ContactForm />
    </Box>
  );
};

export default Contact;
