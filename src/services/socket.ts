import { io, Socket } from "socket.io-client";

class SocketSingleton {
  private static instance: Socket | null = null;

  private constructor() {}

  public static getInstance(token: string): Socket {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = io("http://209.97.173.226", {
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        forceNew: false,
        auth: {
          token: `Bearer ${token}`,
        },
      });
    }
    return SocketSingleton.instance;
  }

  public static destroyInstance(): void {
    if (SocketSingleton.instance) {
      SocketSingleton.instance.disconnect();
      SocketSingleton.instance = null;
    }
  }
}

export default SocketSingleton;
