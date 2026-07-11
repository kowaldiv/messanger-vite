# --- ЭТАП 1: Сборка проекта ---
# Берем готовый образ Node.js
FROM node:20-alpine AS build
# Создаем рабочую папку внутри контейнера
WORKDIR /app
# Копируем только файлы зависимостей (для кэширования)
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем весь остальной код
COPY . .
# Собираем проект (Vite создаст папку dist)
RUN npm run build

# --- ЭТАП 2: Запуск на Nginx ---
# Берем легкий образ Nginx
FROM nginx:alpine
# Копируем собранные файлы из первого этапа в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Конфиг для того чтоб работали остальные странички 
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Открываем порт 80 (стандартный для веб-серверов)
EXPOSE 80
# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]