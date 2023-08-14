// Singleton Class
import Ezy from "ezyfox-es6-client";
import { message } from "ant-design-vue";
import Mvc from "mvc-es6";
import { AppCommand } from "./SocketConstants";
class SocketProxy {
    static instance = null;
    static getInstance() {
        if (!SocketProxy.instance) {
            SocketProxy.instance = new SocketProxy();
        }

        return SocketProxy.instance;
    }

    constructor() {
        this.connection = {
            username: "",
            password: ""
        }
    }

    setup() {
        let mvc = Mvc.getInstance();
        let config = new Ezy.ClientConfig();
        config.zoneName = "chat-server";
        config.reconnect.enable = false;

        let clients = Ezy.Clients.getInstance();
        let client = clients.newDefaultClient(config);
        let setup = client.setup;

        // Define handlers
        let handshakeHandler = new Ezy.HandshakeHandler();
        handshakeHandler.getLoginRequest = () => {
            let username = this.connection.username;
            let password = this.connection.password;
            let zoneName = config.zoneName;
            let data = {"accessToken":"test",};
            return [zoneName, username, password, data];
        }

        let loginSuccessHandler = new Ezy.LoginSuccessHandler();
        loginSuccessHandler.handleLoginSuccess = (data) => {
            console.log("data: ",data)
            let appAccessData = ["chat-server", []];
            if (this.getClient()) {
                if (this.getClient().status !== "CONNECTED") {
                    this.connect();
                } else {
                    this.getClient().sendRequest(Ezy.Command.APP_ACCESS, appAccessData);
                }
            }
        }

        let appAccessHandler = new Ezy.AppAccessHandler();
        appAccessHandler.postHandle = (app, data) => {
            message.success("Access app successfully: " + app.name + ": " + data);
            // // Navigate to the MessageView page
            // let routerController = mvc.getController("router");
            // routerController.updateViews("navigate", "/message");
        }

        let loginErrorHandler = new Ezy.LoginErrorHandler();
        loginErrorHandler.handleLoginError = (event) => {
            console.log("Logged in with error: ", event[1]);
            message.error("User logged in with error: " + event[1]);
        }

        let disconnectionHandler = new Ezy.DisconnectionHandler();
        disconnectionHandler.preHandle = (event) => {
            message.error('Received disconnection command from server');
            console.log(event);
        }

        // Register handlers
        setup.addEventHandler(Ezy.EventType.DISCONNECTION, disconnectionHandler);
        setup.addDataHandler(Ezy.Command.HANDSHAKE, handshakeHandler);
        setup.addDataHandler(Ezy.Command.LOGIN, loginSuccessHandler);
        setup.addDataHandler(Ezy.Command.LOGIN_ERROR, loginErrorHandler);
        setup.addDataHandler(Ezy.Command.APP_ACCESS, appAccessHandler);

        let setupApp = setup.setupApp("chat-server");
        setupApp.addDataHandler(AppCommand.GET_ALL_USERS, (app, data) => {
            let chatController = mvc.getController("chat");
        });

        setupApp.addDataHandler(AppCommand.GET_CHANNEL, (app, data) => {
            const { channelId, chatLogs } = data;
            console.log('Received getchannel response, channelId = ', channelId);
            //todo: call to
            const channel = new BroadcastChannel(AppCommand.GET_CHANNEL);
            channel.postMessage(data);
        });

        setupApp.addDataHandler(AppCommand.SEND_MESSAGE, (app, data) => {
            const { channelId, chatLogs } = data;
            console.log('Receive SEND_MESSAGE response');
            console.log("channelId: ", channelId);
            console.log("chatLogs: ", chatLogs);
        });
        return client;
    }

    connect() {
        let url = "ws://localhost:2208/ws";
        let client = this.getClient();
        client.connect(url);
    }

    getClient() {
        let clients = Ezy.Clients.getInstance();
        return clients.getDefaultClient();
    }

    defineLoginRequest(username, password) {
        this.connection = {
            username: username,
            password: password
        }
    }
}

export default SocketProxy;