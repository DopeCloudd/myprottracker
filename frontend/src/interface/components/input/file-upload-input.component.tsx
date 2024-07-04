import useFile from "@/application/hooks/useFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const { file, preview, handleFileChange, handleRemoveFile } = useFile();

  return (
    <Box>
      {preview && (
        <Box
          sx={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={handleRemoveFile}
          >
            Supprimer
          </Button>
        )}
      </Box>
    </Box>
  );
}
