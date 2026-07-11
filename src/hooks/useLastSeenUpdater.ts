import { useEffect, useRef } from "react";
import { socket } from "../socket-io/client";

export function useLastSeenUpdater() {
  const intervalRef = useRef<number | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    console.log("useLastSeenUpdater монтирован");

    const sendUpdate = () => {
      if (socket.connected) {
        console.log("Обновил в сети -", new Date().toLocaleTimeString());
        socket.emit("updateLastSeen");
      } else {
        console.log("Сокет не подключен");
      }
    };

    // Запускаем интервал
    intervalRef.current = setInterval(sendUpdate, 30000);

    // Отправляем первое обновление через 2 секунды
    setTimeout(sendUpdate, 2000);

    return () => {
      console.log("useLastSeenUpdater очищен");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      socket.emit("updateLastSeen");
      mountedRef.current = false;
    };
  }, []);
}
