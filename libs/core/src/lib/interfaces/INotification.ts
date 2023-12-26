import { NotificationType } from '../enums/NotificationType';

export interface INotification {
    id: string;
    title: string;
    description: string;
    type: NotificationType;
    authorId?: string;
    author?: string;
    read: boolean;
    viewedAt?: Date;
    createdAt: Date;
}

export interface NotificationSendProps {
    title: string,
    description: string,
    type?: NotificationType,
    authorId?: string,
    author?: string,
    read?: boolean ,
  }
