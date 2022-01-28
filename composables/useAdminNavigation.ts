import { AdjustmentsIcon, HomeIcon, PencilAltIcon } from "@heroicons/vue/outline";

export const useAdminNavigation = () => {
    const route = useRoute();
    const router = useRouter();

    const navigation = [
        {
            pathName: "adminer-projects-projectid",
            name: "Tableau de bord",
            href: `/adminer/projects/${route.params["projectid"]}`,
            icon: HomeIcon,
            current: true,
        },
        {
            pathName: "adminer-projects-projectid-editors-tweets",
            name: "Éditeur de tweets",
            href: `/adminer/projects/${route.params["projectid"]}/editors/tweets`,
            icon: PencilAltIcon,
        },
        {
            pathName: "adminer-projects-projectid-settings",
            name: "Paramètres",
            href: `/adminer/projects/${route.params["projectid"]}/settings`,
            icon: AdjustmentsIcon,
        },
    ];

    for (let i = 0; i < navigation.length; i++) {
        navigation[i].current = navigation[i].pathName === route.name;
    }

    watch(router.currentRoute, (to) => {
        navigation.forEach((item) => {
            item.current = item.href === to.path;
        });
    });

    return {
        navigation,
    }
}