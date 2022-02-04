import UserRepository from "~~/repositories/UserRepository";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required("email_field"),
    password: yup.string().min(6, "password_field").required("password_field"),
});

export const useLogin = () => {
    const { onError } = useNotification()
    const router = useRouter();

    const isAuthenticated = ref(false);

    const email = ref("");
    const emailError = ref(false);

    const password = ref("");
    const passwordError = ref(false);

    const isLoading = ref(false);

    const userRepository = <UserRepository>useState("userRepository").value;

    const onSubmit = async () => {
        emailError.value = false;
        passwordError.value = false;

        isLoading.value = true;

        try {
            const isValid = schema.validateSync(
                {
                    email: email.value,
                    password: password.value,
                },
                { abortEarly: false }
            );

            if (!isValid) {
                emailError.value = true;

                return;
            }

            await userRepository.login({
                email: email.value,
                password: password.value,
            });

            router.push({
                name: "adminer",
            });
        } catch (error) {
            if (!error.errors) {
                if (error.message === "user-not-found") {
                    onError("Erreur", "Vos identifiants ne sont pas corrects.");
                }
            } else {
                error.errors.forEach((error) => {
                    if (error === "email_field") {
                        emailError.value = true;
                    }

                    if (error === "password_field") {
                        passwordError.value = true;
                    }
                });
            }
        }
    }

    const isLogin = async () => {
        const user = await userRepository.getCurrentUser();

        isAuthenticated.value = !!user;
    };

    return {
        email,
        emailError,
        password,
        passwordError,
        isAuthenticated,
        onSubmit,
        isLogin,
    }
}