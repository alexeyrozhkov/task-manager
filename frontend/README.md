<h1 align="center">
    <a href="https://lectrum.io" target="_blank" rel="noopener noreferrer">
        <img src="./img/logo-woodsmoke.svg" alt="Lectrum favicon" width="25" />
    </a>
    Воркшоп по JavaScript
</h1>
<br>

<div align="center">
    <!-- Last commit -->
    <img src="https://img.shields.io/github/last-commit/lectrum/react-workshop.svg?longCache=true&style=flat-square" alt="Last commit"
    />
    <!-- Dependencies -->
    <img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg?longCache=true&style=flat-square" alt="Dependencies"
    />
    <!-- Contributors welcome -->
    <img src="https://img.shields.io/badge/contributions-welcome-orange.svg?longCache=true&style=flat-square" alt="Last update"
    />
</div>
<div align="center">
    <!-- Наш Facebook -->
    <a href="https://www.facebook.com/lectrum">
        <img src="https://img.shields.io/badge/%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%8B%D0%B2%D0%B0%D0%B9%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BD%D0%B0%D1%88-Facebook-blue.svg?longCache=true&style=for-the-badge&link=https://www.facebook.com/lectrum"
            alt="Подписывайся на наш Facebook" />
    </a>
</div>
<br>

<h3 align="center">
    👋🏼 Привет и добро пожаловать!
</h3>
<p>
    📸 Вместе мы создадим планировщик задач на чистом JavaScript! Пристегни ремни — будет интересно!
</p>
<br>
<p>
    👨🏼‍🔬 В этой инструкции ты узнаешь как настроить и запустить проект.
</p>
<br>

## 📜 Содержание

-   [🚀 Инструкция по запуску проекта](#-инструкция-по-запуску-проекта)
-   [🤔 FAQ](#-faq) <br>

### 🚀 Инструкция по запуску проекта

> Список поддерживаемых нами операционных систем [можно найти здесь](https://github.com/Lectrum/FAQ#%D0%9A%D0%B0%D0%BA%D0%B8%D0%B5-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B-%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D1%8E%D1%82%D1%81%D1%8F-%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0%D0%BC%D0%B8-%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B8-lectrum).

> Если ты пользователь Windows, [настрой себе терминал](https://github.com/Lectrum/FAQ#%D0%AF-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-windows-%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D1%8C-%D1%82%D0%B5%D1%80%D0%BC%D0%B8%D0%BD%D0%B0%D0%BB-%D0%B4%D0%BB%D1%8F-%D1%83%D0%B4%D0%BE%D0%B1%D0%BD%D0%BE%D0%B9-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)

1. [Скачай и установи](https://nodejs.org/en/) последнюю **`LTS-версию Node 12.16.2`**:
2. Выполни в консоли **`node -v`** и убедись, что установленная версия **`Node.js`** не ниже **`12.16.2`**;
3. Выполни в консоли **`npm -v`** и убедись, что установленная версия **`npm`** не ниже **`6.14.4`**;

> ❗️ Мы поддерживаем только последние **`LTS-версии Node.js`** (текущая LTS — **`Node 12.16.2`**). Мы не даём гарантий работы на других версиях Node. Если у тебя не работает, в первую очередь проверь версию Node.js!

4. [Скачай и установи Git](https://git-scm.com/downloads), если его нет на компьютере;
5. Выполни в консоли **`git --version`**, чтобы проверить версию установленного Git, должно быть не ниже **`2.26.0`**;
6. Склонируй этот проект:

```bash
git clone https://github.com/Lectrum/js-workshop-task-manager.git
```

7. Перейди в проект, выполнив команду:

```bash
cd js-workshop-task-manager
```

8. Теперь нужно установить зависимости проекта. В терминале, находясь в директории с текущим проектом, выполни команду:

```bash
npm install
```

9. Чтобы запустить проект, выполни команду:

```bash
npm start
```

10. Перейди в браузер и открой страницу по адресу [http://localhost:8181](http://localhost:8181/).
11. В браузере приложение будет выглядеть следующим образом:
![task-manager](./img/task-manager.png)

12. Открой **Chrome Dev Tools** и перейди на вкладку **console**, там не должно быть каких-либо ошибок.
<br>

### 🤔 FAQ

Ответы на часто задаваемые вопросы можно найти [здесь](https://lab.lectrum.io/faq#environment-setup). <br>

### Лицензия

MIT © [Lectrum](https://lectrum.io)

<div align="center">
  <!-- Сделано с любовь -->
    <img src="https://img.shields.io/badge/%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D0%BD%D0%BE%20%D1%81-%F0%9F%96%A4-red.svg?longCache=true&style=for-the-badge&colorA=000&colorB=fedcba"
      alt="Сделано с любовь" />
</div>