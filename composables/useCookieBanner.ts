export const useCookieBanner = () => {
    const { onSetCookie, onGetCookie } = useCookieManager();

    const hideCookieBanner = ref(onGetCookie("cookieConsent"));

    const onClick = () => {
        hideCookieBanner.value = true;

        onSetCookie("cookieConsent", hideCookieBanner.value);
    };

    return {
        hideCookieBanner,
        onClick,
    };
}