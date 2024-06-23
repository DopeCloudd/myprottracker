// hooks/useNewsletter.ts
import { useAddEmailNewsletterMutation } from "@/infrastructure/api/newsletter.api";
import { useSnackbar } from "notistack";

const useNewsletter = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addEmailNewsletter] = useAddEmailNewsletterMutation();

  const addEmail = async (email: string) => {
    try {
      await addEmailNewsletter({ email }).unwrap();
      enqueueSnackbar("Vous ne manquerez plus aucun deals !", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        "Une erreur est survenue, merci de réessayer plus tard.",
        {
          variant: "error",
        }
      );
    }
  };

  return {
    addEmail,
  };
};

export default useNewsletter;
