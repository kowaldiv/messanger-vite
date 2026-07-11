export const formatLastSeen = (lastSeen: Date | string): string => {
  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  // Если был в сети меньше 1 минуты назад
  if (diffMinutes < 1) {
    return 'В сети';
  }
  
  // Если был в сети меньше часа назад
  if (diffMinutes < 60) {
    const minutes = diffMinutes;
    return `Был(а) ${minutes} ${getMinutesDeclension(minutes)} назад`;
  }
  
  // Сегодня
  if (lastSeenDate.toDateString() === now.toDateString()) {
    return `Был(а) сегодня в ${lastSeenDate.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  // Вчера
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (lastSeenDate.toDateString() === yesterday.toDateString()) {
    return `Был(а) вчера в ${lastSeenDate.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  // Другие дни
  return `Был(а) ${lastSeenDate.toLocaleDateString('ru-RU', { 
    day: '2-digit', 
    month: '2-digit',
    year: lastSeenDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })}`;
};

// Склонение минут
const getMinutesDeclension = (minutes: number): string => {
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'минут';
  }
  
  if (lastDigit === 1) {
    return 'минуту';
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'минуты';
  }
  
  return 'минут';
};