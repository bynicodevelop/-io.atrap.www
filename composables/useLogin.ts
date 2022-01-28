import UserRepository from "~~/repositories/UserRepository";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required("email_field"),
    password: yup.string().min(6, "password_field").required("password_field"),
});



export const useLogin = () => {
    const router = useRouter();

    const isAuthenticated = ref(false);

    const email = ref("");
    const emailError = ref(false);

    const password = ref("");
    const passwordError = ref(false);

    const isLoading = ref(false);

    const paramsNotif = reactive({
        show: false,
        title: "",
        subtitle: "",
        type: "",
    });

    const userRepository = <UserRepository>useState("userRepository").value;

    const onSubmit = async () => {
        paramsNotif.show = false;
        paramsNotif.title = "";
        paramsNotif.subtitle = "";

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
                    paramsNotif.show = true;
                    paramsNotif.title = "Erreur";
                    paramsNotif.subtitle = "Vos identifiants ne sont pas corrects.";
                    paramsNotif.type = "error";
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
        paramsNotif,
        isAuthenticated,
        onSubmit,
        isLogin,
    }
}