import useDialog from "@/application/hooks/useDialog";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  url: yup.string().required("Merci de renseigner l'URL du produit"),
});

const initialValues = {
  url: "",
};

export default function FormDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const { open, handleClose } = useDialog();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (
      values: {
        url: string;
      },
      { resetForm }
    ) => {
      const formData = new FormData();
      formData.append("url", values.url);
      console.log(values.url);
      enqueueSnackbar("Nous avons bien reçu votre demande !", {
        variant: "success",
      });
      resetForm();
      handleClose();
    },
  });

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Demande d'ajout d'un produit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Merci de renseigner le lien du produit que vous souhaitez ajouter
              a notre base de donnees.
            </DialogContentText>
            <DialogContentText
              sx={{
                fontStyle: "italic",
                fontSize: "0.8rem",
              }}
            >
              *Un délai de traitement de notre équipe est nécessaire pour
              valider votre demande.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="url"
              name="url"
              label="URL du produit"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="outlined">
              Soumettre
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
