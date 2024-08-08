import { useAuth } from "@/application/hooks/useAuth";
import useDialog from "@/application/hooks/useDialog";
import { useAddRequestMutation } from "@/infrastructure/api/request.api";
import Loading from "@/interface/layout/loading.layout";
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
  url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Merci de renseigner une URL valide"
    )
    .required("Merci de renseigner l'URL du produit"),
});

const initialValues = {
  url: "",
};

export default function FormDialog() {
  const { user } = useAuth();
  const [addRequest, { isLoading }] = useAddRequestMutation();
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
      if (user) {
        const request = await addRequest({
          userId: user.id,
          url: values.url,
        }).unwrap();
        if (!request) {
          enqueueSnackbar("Une erreur est survenue", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Nous avons bien reçu votre demande !", {
            variant: "success",
          });
          resetForm();
          handleClose();
        }
      } else {
        enqueueSnackbar(
          "Vous devez être connecté pour effectuer cette action",
          {
            variant: "error",
          }
        );
      }
    },
  });

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <Loading loading={[isLoading]}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Demande d'ajout d'un produit</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Merci de renseigner le lien du produit que vous souhaitez
                ajouter a notre base de donnees.
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
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
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
        </Loading>
      </Dialog>
    </React.Fragment>
  );
}
