export interface ISidebarItem {
    id: number;
    label: string;
    path?: string;
    icon?: string;
    badge?: number
    children?: ISidebarItem[];
}
