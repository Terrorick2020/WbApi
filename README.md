# 🛒 Wildberries Data Updater  

Этот сервис автоматически получает, обновляет и сохраняет данные о тарифах с Wildberries, записывает их в PostgreSQL и экспортирует в Google Sheets. Разворачивается с помощью Docker Compose.  

## 🚀 Возможности  

- 📡 Получение тарифов с Wildberries API  
- ⏳ Ежечасное обновление данных через `cron`  
- 🛢 Запись данных в PostgreSQL  
- 📤 Экспорт актуальных данных в Google Sheets  
- 🐳 Легкий запуск через Docker Compose  

---

## 📦 Развертывание  

### 1️⃣ Установка зависимостей  
Перед запуском убедитесь, что у вас установлены:  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

### 2️⃣ Настройка переменных окружения  
Убедитесь в наличии файла `.env` в корне проекта  

---

## ▶️ Запуск сервиса

### 1️⃣ Клонирование репозитория
    - git clone https://github.com/Terrorick2020/WbApi.git

### 2️⃣ Переход в дирректорию проекта

#### Для Windows:
    - Для Linux: cd wb-data-updater
    - Для Windows: dir wb-data-updater

### 3️⃣ Запуск контейнера
    - docker-compose up -d --build

✅ **Сервис начал работу**