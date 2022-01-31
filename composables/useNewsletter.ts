import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export const useNewsletter = ({ onSuccess }) => {
    const { $tracker } = useNuxtApp();

    const emailError = ref(false);
    const email = ref("");

    const isLoading = ref(false);
    const isStarted = ref(false);

    const scrollToElement = (id: string): void => {
        const el: HTMLElement = document.getElementById(id.replace("#", ""));

        el.scrollIntoView({ behavior: "smooth" });
    };

    const onEmailBlur = async () => {
        emailError.value = false;

        try {
            await schema.validate({ email: email.value });
        } catch (e) {
            emailError.value = true;
        }
    };

    const onEmailFocus = () => {
        isStarted.value = true;
        emailError.value = false;
    };

    const onSubmit = async () => {
        isLoading.value = true;

        emailError.value = false;

        try {
            const isValid = await schema.isValid({
                email: email.value,
            });

            if (isValid) {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email.value,
                    }),
                };

                const response: Response = await fetch(
                    "/api/emailing/mailchimp/subscribe",
                    requestOptions
                );

                const result = await response.json();

                if (result["type"] == "success") {
                    email.value = "";

                    onSuccess("Félicitations 👋", "Vous êtes maintenant inscrit à la liste d'attente. Vous recevez des nouvelles de nous prochainement.");

                    $tracker.lead();
                } else {
                    emailError.value = true;
                }
            }
        } catch (error) {
            console.log(error);

            emailError.value = true;
        }

        isLoading.value = false;
    };

    return {
        email,
        emailError,
        isLoading,
        isStarted,
        onEmailBlur,
        onEmailFocus,
        onSubmit,
        scrollToElement,
    }
}