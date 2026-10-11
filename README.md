# 🧪 Taller: Microfrontends y Microservices en Angular y NodeJS

- Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) 20.3.14.

- El objetivo del taller es practicar la creación de 2 proyectos para representar la arquitectura
 cliente servidor, con las Tecnologias de Angular y NodeJS.

## 🏗️ Descripción del sistema

Sistema distribuido compuesto por **5 microfrontends** en Angular y **5 microservicios** en NodeJS, más un **Host** (shell) que los integra mediante **Module Federation**. Cada microfrontend consume **solo** su microservicio asociado (relación 1 a 1 MF→MS). Los datos se generan con **Faker.js**, las APIs se documentan con **Swagger/OpenAPI** y los microfrontends con **Compodoc**.

```
Client-Host-Angular  :4200  (Shell + Navbar + rutas)
        |
        | Module Federation (remoteEntry.js) carga cada MF
        |
   +-----+-----+-----+-----+-----+
   | MF  | MF  | MF  | MF  | MF  |
   |Users|Prod.|Orde.|Cour.|Eve.|
   |4201 |4202 |4203 |4204 |4205 |
   +--+--+--+--+--+--+--+--+--+--+
      | REST
   +--+--+--+--+--+--+--+--+--+--+
   | MS  | MS  | MS  | MS  | MS  |
   |Users|Prod.|Orde.|Cour.|Eve.|
   |3001 |3002 |3003 |3004 |3005 |
   +-----+-----+-----+-----+-----+
```

| Vertical | Dueño | Carpeta MF | Puerto MF | Remote | Carpeta MS | Puerto MS | Endpoint |
|---|---|---|---|---|---|---|---|
| Users (base) | — | Microfrontend-Users-Angular | 4201 | mf-users | Microservice-Users-NodeJS | 3001 | `/api/users/{n}` |
| Products (base) | — | Microfrontend-Products-Angular | 4202 | mf-products | Microservice-Products-NodeJS | 3002 | `/api/products/{n}` |
| Orders | David | Microfrontend-Orders-Angular | 4203 | mf-orders | Microservice-Orders-NodeJS | 3003 | `/api/orders/{n}` |
| Courses | Juan Diego | Microfrontend-Courses-Angular | 4204 | mf-courses | Microservice-Courses-NodeJS | 3004 | `/api/courses/{n}` |
| Events | Juan Pablo | Microfrontend-Events-Angular | 4205 | mf-events | Microservice-Events-NodeJS | 3005 | `/api/events/{n}` |

## 📋 Requisitos Previos

Antes de iniciar, asegúrate de tener instaladas las siguientes herramientas:

- Node.js
- npm
- Angular CLI
- Git
- Visual Studio Code

Puedes verificar Angular CLI en consola con: ```ng version```

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz del proyecto de Client-Host-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Users-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Products-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Users-NodeJS y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Products-NodeJS y ejecuta el comando: ```npm i```


### 2️⃣ Ejecutar los Proyectos

- Ubícate en la raíz del proyecto de Microservice-Users-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microservice-Products-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Users-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Products-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Client-Host-Angular y ejecuta el comando: ```npm run start```


## 🔌 Puertos y verificación

| Vertical | MF (puerto / remote / módulo) | MS (puerto / endpoint / Swagger) |
|---|---|---|
| Users | 4201 · mf-users · `./UsersPage` | 3001 · `/api/users/{n}` · `/api/docs` |
| Products | 4202 · mf-products · `./ProductsPage` | 3002 · `/api/products/{n}` · `/api/docs` |
| Orders | 4203 · mf-orders · `./OrdersPage` | 3003 · `/api/orders/{n}` · `/api/docs` |
| Courses | 4204 · mf-courses · `./CoursesPage` | 3004 · `/api/courses/{n}` · `/api/docs` |
| Events | 4205 · mf-events · `./EventsPage` | 3005 · `/api/events/{n}` · `/api/docs` |

**Línea de verificación por servicio (PowerShell):**

```powershell
# Microservicios (200 OK, 400 si el parámetro es inválido)
foreach ($v in 'users','products','orders','courses','events') {
  $port = switch ($v) { 'users' {3001} 'products' {3002} 'orders' {3003} 'courses' {3004} 'events' {3005} }
  $code = curl.exe -s -o NUL -w "%{http_code}" "http://localhost:$port/api/$v/5"
  "/api/$v/5 -> $code"
}

# Microfrontends (el remoteEntry.js debe contener el remote name y el módulo expuesto)
curl.exe -s http://localhost:4204/remoteEntry.js | Select-String -Pattern 'mf-courses|CoursesPage'
```

### 3️⃣ Verificar Funcionamiento de Proyectos

#### Microservice-Users-NodeJS
- Corriendo en: ```http://localhost:3001```
- Swagger API Docs: ```http://localhost:3001/api/docs```
- API Users: ```http://localhost:3001/api/users/{countUsers}```

#### Microservice-Products-NodeJS
- Corriendo en: ```http://localhost:3002```
- Swagger API Docs: ```http://localhost:3002/api/docs```
- API Products: ```http://localhost:3002/api/products/{countProducts}```

#### Microfrontend-Users-Angular
- Corriendo en: ```http://localhost:4201```
- RemoteEntry: ```http://localhost:4201/remoteEntry.js```

#### Microfrontend-Products-Angular
- Corriendo en: ```http://localhost:4202```
- RemoteEntry: ```http://localhost:4202/remoteEntry.js```

#### Client-Host-Angular
- Corriendo en: ```http://localhost:4200```