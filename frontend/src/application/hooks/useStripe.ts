import { useAuth } from "@/application/hooks/useAuth";
import { useCreateCheckoutSessionMutation } from "@/infrastructure/api/stripe.api";

// Hook for using Stripe API
const useStripe = () => {
  const { user } = useAuth();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const getCheckoutUrl = async () => {
    if (!user) {
      console.error("User not found");
    } else {
      try {
        const result = await createCheckoutSession({
          userId: user.id,
        }).unwrap();
        return result.url; // renvoie l'URL si la requête a réussi
      } catch (error) {
        console.error("Failed to create checkout session:", error);
        throw error; // lance l'erreur si la requête a échoué
      }
    }
  };

  return { getCheckoutUrl };
};

export default useStripe;
