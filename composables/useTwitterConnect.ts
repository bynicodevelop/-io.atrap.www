export const useTwitterConnect = ({ emits }) => {
    const router = useRouter();
    const route = useRoute();

    const { onGetCookie, onSetCookie, onRemoveCookie } = useCookieManager();
    const { $fire } = useNuxtApp();

    const { auth, firestore } = $fire

    const { SITE_URL } = useRuntimeConfig();

    const isTwitterLoading = ref(false);
    const hasTwitterConnector = ref(false);

    const redirectAfterSave = () => {
        const { hash } = route;

        let params: any = {
            query: {},
        };

        if (!hash.includes("undefined")) {
            params = { ...params, hash };
        }

        router.push(params);
    };

    const onTwitterConnect = async (): Promise<void> => {
        isTwitterLoading.value = true;

        emits("onTwitterConnect");

        const { data } = await useFetch(`${SITE_URL}/api/social/twitter/connect`);

        const { url, oauth_token } = <{ url: string, oauth_token: string }>data.value;

        onSetCookie("twitter_connect", {
            twitterToken: oauth_token,
            redirectSocialUrl: `${SITE_URL}${route.fullPath}`,
        });

        window.location.href = url;
    };

    const onCheckTwitterConnect = async (

    ): Promise<void> => {
        if (Object.keys(route.query).length < 1) return;

        const { accessSecret, accessToken, name, profile_image_url, screenName, userId } = route.query;

        const { projectid } = route.params;

        const socialConnectRepository = useSocialConnectRepository({
            auth,
            firestore,
        });

        try {
            await socialConnectRepository.setTwitterConnect({
                accessSecret,
                accessToken,
                name,
                profileImageUrl: profile_image_url,
                screenName,
                userId,
                projectId: projectid,
            });

            console.log("Twitter connect success");

            redirectAfterSave();

            hasTwitterConnector.value = true;
        } catch (error) {
            console.log(error);
        }

        onRemoveCookie("twitter_connect");
    };

    const onRevokeConnector = async (connectorName: string) => {
        const { projectid } = route.params;

        const { auth, firestore } = $fire;

        const socialConnectRepository = useSocialConnectRepository({
            auth,
            firestore,
        });

        if (connectorName === "twitter") {
            await socialConnectRepository.revokeTwitterConnect(projectid);

            hasTwitterConnector.value = false;
        }
    };

    return {
        hasTwitterConnector,
        isTwitterLoading,
        onTwitterConnect,
        onCheckTwitterConnect,
        onRevokeConnector,
    }
}