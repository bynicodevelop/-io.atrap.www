import { isEmpty } from "lodash";
import { useNuxtApp, useRuntimeConfig } from "nuxt3";
import LinkRepository from "../repositories/LinkRepository";

export const useLinks = ({ SITE_URL }) => {
    const { onSuccess } = useNotification();
    const route = useRoute();
    const linkRepository = <LinkRepository>useState('linkRepository').value;

    const links = ref([]);
    const redirectLink = ref(null);

    const onCreateLink = async (linkData) => {
        console.log(route.params.projectid);

        await linkRepository.createLink(route.params.projectid, {
            ...linkData
        });
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
        links,
        redirectLink,
        onGetLinks,
        onRedirect,
        onCopyLink,
        onCreateLink,
    }
}