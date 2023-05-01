[![CI](https://github.com/dezzerlol/aton-test/actions/workflows/test.yml/badge.svg)](https://github.com/dezzerlol/aton-test/actions/workflows/test.yml)

[Задание](https://github.com/dezzerlol/aton-test/blob/master/test_frontend.pdf)
# Live
[aton-test.vercel.app](aton-test.vercel.app)

# Локальный запуск проекта

## С использованием Docker:
1. Склонировать проект
```
git clone https://github.com/dezzerlol/aton-test
```

2. Запустить проект 
```
docker-compose up
```

3. Сервер доступен на
```
http://localhost:3000
```

## Без использования Docker:
1. Установить зависимости:
   
    `yarn install` или `npm install`

2. Запустить проект:
   
    `yarn dev` или `npm run dev`

3. Сервер доступен на
```
http://localhost:3000
```

# Тестовые данные для входа/регистрации

- **email:** eve.holt@reqres.in
- **password:** pistol

*ReqRes Api поддерживает только определенные данные*

# Библиотеки:
- Vite
- React
- Typescript
- State: react-query
- Стили: mantine
- Таблица: mantine-react-table && TanStack Table
- Тесты: Vitest + CI/CD Pipeline Github Actions


# Архитектура
[Bulletproof React](https://github.com/alan2207/bulletproof-react)
