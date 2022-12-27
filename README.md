# LC-Project-Backend

this is the backend of the LC project

## 🏁Getting Started <a name = "start"></a>

1. **_Clone the repository_**

```bash
git clone https://github.com/Match-Reservation-System/Backend.git
```

2. **_Go to the directory of the repository_**

```bash
cd Backend
```

3. **install dependencies**

```bash
npm install

```

4. **add `.env` file**

add .env file similar to this

```py
ENV = 'dev'
#ENV = 'test'
LC_POSTGRES_USER= ahmed
LC_POSTGRES_PASSWORD=ahmed
LC_DB_HOST=localhost
LC_DEV_DB="LC_dev"
LC_TEST_DB="LC_test"
LC_DEV_PORT=5001
LC_TEST_PORT=5002

LC_PORT = 5000

PEPPER=your-secret-password
SALT=10

JWT_PRIVATE_KEY=password
```

5. **create the database**

    you need to have docker installed.
```
 npm run docker:startDev
```

6. **run the migrations**

```
npm run migrate:run
```

7. **run the app**

```
npm run start:dev
```

## 🏁Testing <a name = "Testing"></a>

1. **chane the env to test**

```py
ENV = 'test'
```
2. **create the database**

```
 npm run docker:startTest
```

3. **run the migrations**

```
npm run migrate:reset --env test
npm run migrate:run --env test
```
4. **build the app**

```
npm run build
```
5. **run the tests**

```
npm run jasmine
```


## 🏁Scripts <a name = "Scripts"></a>

- `npm i` install all the packages
- `npm start` to run the app after build
- `npm run build` to compile the ts files
- `npm run jasmine` run the tests
- `npm run start:dev` run app using nodemon
- `npm run migrate:run` up all migrations
- `npm run migrate:reset` reset all migrations
- `npm run docker:startDev` start the dev db
- `npm run docker:startTest` start the test db
- `npm run lint` run eslint
- `npm run format` run prettier
- `npm run fix` fix eslint issues

##
