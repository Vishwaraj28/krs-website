import { NavGroup, NavItem } from "@/store/slice/navigationSlice";

const transformNavData = (items: NavItem[]): NavGroup[] => {
  const grouped: Record<
    string,
    {
      title: string;
      url: string;
      items: { title: string; url: string }[];
      order: number;
    }
  > = {};

  for (const item of items) {
    const section = item.section;

    if (!grouped[section]) {
      grouped[section] = {
        title: section,
        url: "#",
        items: [],
        order: item.section_order,
      };
    }

    grouped[section].items.push({
      title: item.title,
      url: item.url,
    });
  }

  return (
    Object.values(grouped)
      // Sort using internal `order`, but strip it before returning
      .sort((a, b) => a.order - b.order)
      .map(({ title, url, items }) => ({
        title,
        url,
        items: items.sort((a, b) => a.title.localeCompare(b.title)),
      }))
  );
};

export default transformNavData;
