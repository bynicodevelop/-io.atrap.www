export const useSettingsTabManager = (tabs: { name: string, href: string, current: boolean }[]) => {
    const router = useRouter();
    const route = useRoute();

    const tabSelected = ref(tabs[0]);

    const onSelectIndex = () => {
        const { hash } = route;

        tabs.forEach((t) => {
            t.current = t.href == (hash || "#general");
        });

        tabSelected.value = tabs.find((t) => t.current);
    }

    const onSelectTab = (tab: any) => {
        tabSelected.value = tab;
    };

    const onTabChange = (event: any) => {
        const { value } = event.target;

        const tab = tabs.find((t) => t.name == value);

        router.push({
            hash: tab.href,
        });
    };

    watch(route, onSelectIndex);

    return {
        tabSelected,
        onSelectIndex,
        onSelectTab,
        onTabChange,
    }
}