import { NotificationAlertIcon, NotificationErrorIcon, NotificationInfoIcon, NotificationSuccessIcon } from "../icons";

export enum NotificationType {
    DEFAULT, //System notifications
    PUSH, //Push notifications
    ALERT, //Alert notifications
    ERROR, //Error notifications
}

export enum NotificationIcon {
    SUCCESS = NotificationSuccessIcon,
    ALERT = NotificationAlertIcon,
    ERROR = NotificationErrorIcon,
    INFO = NotificationInfoIcon,
}
