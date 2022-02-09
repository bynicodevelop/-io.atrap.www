import { isEmpty } from "lodash";
import { useNuxtApp, useRuntimeConfig } from "nuxt3";
import LinkRepository from "../repositories/LinkRepository";

import * as yup from "yup";

const schema = yup.object().shape({
    url: yup.string().url("url_field").required("url_field"),
});

export const useLinks = ({ SITE_URL }, loadingState = null) => {
    const { onSuccess } = useNotification();
    const route = useRoute();
    const linkRepository = <LinkRepository>useState('linkRepository').value;

    const links = ref([]);
    const linkSelected = ref({});
    const redirectLink = ref(null);

    const urlError = ref(false);

    const onCreateLink = async (linkData) => {
        if (loadingState) {
            loadingState.onStart();
        }

        try {
            schema.validateSync(
                {
                    url: linkData.url,
                },
                { abortEarly: false }
            );
        } catch (error) {

            error.errors.forEach((error) => {
                if (error === "url_field") {
                    urlError.value = true;
                }
            });

            if (loadingState) {
                loadingState.onError();
            }

            return;
        }

        if (isEmpty(linkData.id)) {
            await linkRepository.createLink(route.params.projectid, {
                ...linkData
            });
        } else {
            await linkRepository.updateLink(route.params.projectid, linkData.id, { ...linkData });

        }

        if (loadingState) {
            loadingState.onSuccess();
        }
    }

    const onGetLinks = async () => {
        linkRepository.getLinks(route.params.projectid, (data) => {
            links.value = data
        })
    }

    const onRedirect = async () => {
        const linkData = await linkRepository.getLinkById(route.params.id);

        if (linkData != null) {
            const { url } = linkData;

            delete linkData['url'];
            delete linkData['title'];
            delete linkData['seo'];
            delete linkData['lastClick'];

            const link = new URL(url);

            Object.keys(linkData).forEach((key) => {
                if (isEmpty(linkData[key])) return;

                link.searchParams.append(key, linkData[key]);
            })

            redirectLink.value = link.toString();
        }
    }

    const onCopyLink = async (link) => {
        const url = `${SITE_URL}/l/${link.id}`;

        console.log(url);
        if (!/msie\s/i.test(window.navigator.userAgent)) {
            await navigator.clipboard.writeText(url);
        } else {
            document.execCommand("copy");
        }

        onSuccess(
            "Contenu copié 💪",
            "Vous pouvez dès maintenant le partager dans vos contenus favoris."
        );
    }

    return {
        urlError,
        links,
        linkSelected,
        redirectLink,
        onGetLinks,
        onRedirect,
        onCopyLink,
        onCreateLink,
    }
}