export interface INotificationItem {
    id: number;
    title: string;
    description: string;
    date: Date;
    read: boolean;
    from: string;
}