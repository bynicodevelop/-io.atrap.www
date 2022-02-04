import { AdjustmentsIcon, HomeIcon, PencilAltIcon } from "@heroicons/vue/outline/index.js";

export const useAdminNavigation = () => {
    const route = useRoute();
    const router = useRouter();

    const navigation = ref([]);

    onMounted(() => {
        console.log("monted");

        navigation.value = [
            {
                pathName: "adminer-projects-projectid",
                name: "Tableau de bord",
                path: '',
                icon: HomeIcon,
                current: true,
            },
            {
                pathName: "adminer-projects-projectid-editors-tweets",
                name: "Éditeur de tweets",
                path: `/editors/tweets`,
                icon: PencilAltIcon,
            },
            {
                pathName: "adminer-projects-projectid-settings",
                name: "Paramètres",
                path: `/settings`,
                icon: AdjustmentsIcon,
            },
        ];

        for (let i = 0; i < navigation.value.length; i++) {
            navigation.value[i].href = `/adminer/projects/${route.params["projectid"]}${navigation.value[i].path}`;
            navigation.value[i].current = navigation.value[i].pathName === route.name;
        }
    })

    watch(router.currentRoute, (to) => {
        navigation.value.forEach((item) => {
            item.href = `/adminer/projects/${route.params["projectid"]}${item.path}`;
            item.current = `/adminer/projects/${route.params["projectid"]}${item.href}` === to.path;
        });
    });

    return {
        navigation,
    }
}