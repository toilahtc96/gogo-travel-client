import Ezy from "ezyfox-es6-client";
import { AppCommand } from "./SocketConstants";
import SocketProxy from "./SocketProxy";

class SocketRequest {
    static instance = null;
    static socketProxy = SocketProxy.getInstance();

    static getInstance() {
        if (!SocketRequest.instance) {
            SocketRequest.instance = new SocketRequest();
        }
        if (this.socketProxy) {
            if (this.socketProxy != null) {
                this.socketProxy.setup();
            }
            if (this.socketProxy != null && this.socketProxy.status !== 'CONNECTED') {
                this.socketProxy.connect();
            }
        }
        return SocketRequest.instance;
    }

    getClient = () => {
        let clients = Ezy.Clients.getInstance();
        return clients.getDefaultClient();
    }

    getApp = () => {
        let client = this.getClient();
        console.log(client.status);
        let appManager = client.getAppManager();
        return appManager.getApp();
    }

    getAllUsersRequest = () => {
        if (this.getApp()) {
            this.getApp().sendRequest(AppCommand.GET_ALL_USERS, {});
        }
    }

    getChannelRequest = (users) => {
        if (this.getApp()) {
            this.getApp().sendRequest(AppCommand.GET_CHANNEL, { users });
        }
    }

    sendMessageRequest = (targetChannel, message) => {

        if (this.getApp()) {
            this.getApp().sendRequest(AppCommand.SEND_MESSAGE, { message: message, channelId: targetChannel });
        }
    }

    disconnectRequest = (data) => {
        if (this.getApp()) {
            this.getApp().sendRequest(AppCommand.DISCONNECT, { data });
        }
    }
}

export default SocketRequest;