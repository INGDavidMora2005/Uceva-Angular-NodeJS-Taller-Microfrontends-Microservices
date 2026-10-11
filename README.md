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

En cada proyecto usa **`npm ci`** (no `npm i`) para respetar el `package-lock.json` y evitar modificar el árbol de dependencias. Ejecuta estos comandos en PowerShell desde la raíz del repo:

```powershell
# Microservicios (5)
cd Microservice-Users-NodeJS;     npm ci
cd Microservice-Products-NodeJS;  npm ci
cd Microservice-Orders-NodeJS;    npm ci
cd Microservice-Courses-NodeJS;   npm ci
cd Microservice-Events-NodeJS;    npm ci

# Microfrontends (5)
cd Microfrontend-Users-Angular;       npm ci
cd Microfrontend-Products-Angular;    npm ci
cd Microfrontend-Orders-Angular;      npm ci
cd Microfrontend-Courses-Angular;     npm ci
cd Microfrontend-Events-Angular;      npm ci

# Host
cd Client-Host-Angular; npm ci
```

### 2️⃣ Ejecutar los Proyectos

**Orden recomendado:** primero los **5 microservicios**, luego los **5 microfrontends** y, al final, el **Host**. Abre una terminal por proyecto (5 terminales para los MS + 5 para los MF + 1 para el Host).

**Microservicios (5):**
```powershell
cd Microservice-Users-NodeJS;     npm start   # 3001
cd Microservice-Products-NodeJS;  npm start   # 3002
cd Microservice-Orders-NodeJS;    npm start   # 3003
cd Microservice-Courses-NodeJS;   npm start   # 3004
cd Microservice-Events-NodeJS;    npm start   # 3005
```

**Microfrontends (5):**
```powershell
cd Microfrontend-Users-Angular;       npm start   # 4201
cd Microfrontend-Products-Angular;    npm start   # 4202
cd Microfrontend-Orders-Angular;      npm start   # 4203
cd Microfrontend-Courses-Angular;     npm start   # 4204
cd Microfrontend-Events-Angular;      npm start   # 4205
```

**Host:**
```powershell
cd Client-Host-Angular; npm start   # 4200
```

Abre `http://localhost:4200` y navega por las rutas: `/users`, `/products`, `/orders`, `/courses`, `/events`. Cada MF consume **solo** su microservicio asociado.


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

## 🧪 Pruebas y documentación

### Microfrontends (5 MF)

En cada carpeta de microfrontend (Users, Products, Orders, Courses, Events):

```powershell
# Tests unitarios con cobertura (meta: >90% en statements, branches, functions, lines)
npm run test:coverage

# Documentación con Compodoc (genera la carpeta documentation/)
npm run compodoc
```

Comando de verificación de Compodoc (ejemplo para Courses):

```powershell
npx compodoc -p tsconfig.doc.json --coverageTest 90
```

### Microservicios (5 MS)

Cada microservicio documenta sus endpoints con **Swagger/OpenAPI**. Abre la URL de cada uno:

| Microservicio | Swagger |
|---|---|
| Users | `http://localhost:3001/api/docs` |
| Products | `http://localhost:3002/api/docs` |
| Orders | `http://localhost:3003/api/docs` |
| Courses | `http://localhost:3004/api/docs` |
| Events | `http://localhost:3005/api/docs` |

Verifica que en cada Swagger aparezca solo el schema y endpoint de esa vertical (por ejemplo, en Courses: schema `Course` y endpoint `/api/courses/{countCourses}`, tag `Courses`).

## ⚠️ Mensajes conocidos en consola

Estos errores provienen del Host original y **no** de nuestra vertical; la página funciona correctamente. Documentarlos evita confundirlos con errores de nuestro código.

1. **`Cannot use 'import.meta' outside a module`** en `styles.js`: viene del `publicPath` automático de webpack en el Host original; la página funciona.
2. **Aviso «depends on '@angular-architects/module-federation'. CommonJS or AMD dependencies…»**: de la base, es solo un warning.
3. **`ERR_CONNECTION_REFUSED … :4201/remoteEntry.js`**: el Host redirige `/` a `/users`; si el MF de Users no está levantado, falla. Para una prueba limpia, levanta todos los servicios o entra directo a la ruta de tu vertical (`/courses`, `/events`, etc.).

## 👥 Equipo

| Integrante | Vertical / Responsabilidad |
|---|---|
| **David Mora Duque** | Líder — Vertical Orders (MS 3003 + MF 4203), Host (shell + navbar + rutas), revisión de PRs, integración y prueba en clon limpio. |
| **Juan Diego Rodríguez** | Vertical Courses (MS 3004 + MF 4204), documentación (README raíz y READMEs de proyecto), verificación de Compodoc de los 5 MF. |
| **Juan Pablo Devia** | Vertical Events (MS 3005 + MF 4205), script/tabla de verificación de cobertura de los 5 MF, PDF de entrega. |