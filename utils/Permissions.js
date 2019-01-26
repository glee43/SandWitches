//@flow
import Permissions from ../utils/Permissions;
import Contacts from 'react-native-contacts';

export type Response = "authorized" | "denied" | "restricted" | "undetermined";

export default class Permissions {
    /**
     * @returns Promise<boolean> Boolean of whether can open settings
     */
    static canOpenSettings = async (): Promise<boolean> => {
        return await RNPermissions.canOpenSettings();
    };
    /**
     * @returns Promise<boolean> Boolean of true if successful, false if not
     */
    static openSettings = async (): Promise<boolean> => {
        if (await this.canOpenSettings()) {
            RNPermissions.openSettings();
            return true;
        } else {
            return false;
        }
    };
    static requestLocation = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            RNPermissions.request("location").then((response: Response) => {
                return response === "authorized";
            });
        });
    };
    static requestPhoto = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            RNPermissions.request("photo").then((response: Response) => {
                return response === "authorized";
            });
        });
    };
    static requestNotification = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            RNPermissions.request("notification").then((response: Response) => {
                return response === "authorized";
            });
        });
    };
    static hasContacts = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            Contacts.checkPermission((err, permission) => {
                if (err) reject(err);
                return resolve(permission === 'authorized');
            });
        });
    };
    static requestContacts = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            Contacts.requestPermission((err, permission) => {
                if (err) reject(err);
                return resolve(permission === 'authorized');
            });
        });
    };
    static hasLocation = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            RNPermissions.check("location").then((response: Response) => {
                return response === "authorized";
            });
        });
    };

    /**
     * NOTE: only works on iOS, not android. (at the moment)
     */
    static hasNotification = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            RNPermissions.check("notification").then((response: Response) => {
                return response === "authorized";
            });
        });
    };
    static currentNotificationPermissions = (): Promise<Response> => {
        return new Promise((resolve, reject) => {
            RNPermissions.check("notification").then((response: Response) => {
                return resolve(response);
            });
        });
    };
    static hasPhoto = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            RNPermissions.check("photo").then((response: Response) => {
                return response === "authorized";
            });
        });
    };
}
