# Documentacion JiraClone

# Tabla de contenido

### 1. [Estructura de Carpetas y Archivos](#estructura-de-carpetas-y-archivos)

### 2. [Como Configurar el Proyecto](#como-configurar-el-proyecto)

### 3. [Descripcion de Funcionalidades Clave](#descripcion-de-funcionalidades-clave)

### 4. [Tecnologias Usadas](#tecnologias-usadas)

### Estructura de Carpetas y Archivos

### 1. `/config.ts`
Este archivo define las constantes que representan los IDs de diferentes colecciones y buckets dentro de una base de datos gestionada por Appwrite. Las constantes se inicializan mediante el acceso a variables de entorno predefinidas que almacenan los valores específicos del entorno de la aplicación.

### 2. `/app`
Contiene las rutas principales y los componentes relacionados con el diseño general y la lógica de las páginas. Está subdividido en diferentes módulos:

- **`(auth)`**: Módulos de autenticación (inicio de sesión y registro).
  - `sign-in/page.tsx` y `sign-up/page.tsx`: Páginas para el inicio de sesión y el registro de usuarios.
- **`(dashboard)`**: Módulos relacionados con el panel de usuario.
  - `workspaces/[workspaceId]`: Página que maneja los detalles y gestión de un espacio de trabajo específico.
  - `projects/[projectId]`: Página para gestionar proyectos dentro de un espacio de trabajo.
  - `tasks/[taskId]`: Gestión de tareas dentro de proyectos.
- **`(standalone)`**: Funcionalidades más autónomas, como la creación de espacios de trabajo y su configuración.
- **`api`**: Contiene las rutas de la API backend que gestionan la interacción entre la interfaz de usuario y el servidor.
- **`oauth`**: Maneja la integración con proveedores de OAuth para la autenticación externa.

### 3. `/components`
Contiene los componentes reutilizables para la interfaz de usuario ejemplos:

- `navbar.tsx`: Barra de navegación principal.
- `sidebar.tsx`: Barra lateral de navegación.
- `analytics-card.tsx`: Componente para mostrar tarjetas de estadísticas o análisis.

- **`/ui`**: Subcarpeta con componentes básicos de la interfaz de usuario:
  - `button.tsx`: Componente para botones.
  - `form.tsx`: Componente para formularios.
  - `table.tsx`: Componente para tablas.

### 4. `/features`
Contiene la lógica principal y las interacciones con la API. Se subdivide en varios módulos:

- **`auth`**: Funciones relacionadas con la autenticación de usuarios, como el inicio de sesión (`use-login.ts`) y el registro (`use-register.ts`).
- **`members`**: Funciones y componentes relacionados con la gestión de miembros de espacios de trabajo, como agregar, eliminar o actualizar miembros.
- **`projects`**: Funciones para la creación, actualización y eliminación de proyectos, así como la gestión de la información relacionada con proyectos.
- **`tasks`**: Funciones para la gestión de tareas dentro de proyectos.
- **`workspaces`**: Gestión de espacios de trabajo, incluyendo la creación, configuración y obtención de datos de espacios de trabajo.

### 5. `/hooks`
Contiene hooks personalizados de React que encapsulan la lógica reutilizable, como `use-confirm.tsx`, que probablemente gestiona las confirmaciones de acción del usuario (por ejemplo, eliminar un elemento).

### 6. `/lib`
Contiene utilidades generales y configuraciones que pueden ser compartidas entre distintas partes del proyecto:

- `appwrite.ts`: Archivo relacionado con la integración de Appwrite.
- `oauth.ts`: Contiene la lógica de autenticación mediante OAuth.
- `rpc.ts`: Este archivo se encarga de configurar e inicializar un cliente HTTP para interactuar con la API y utiliza la librería hono/client.
- `session-middleware.ts`: Maneja las sesiones del usuario, asegurando que solo los usuarios autenticados puedan acceder a ciertas rutas.
- `utils.ts`: Funciones utilitarias generales para operaciones comunes.

## Como Configurar el Proyecto

### 1. Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

``
npm install
``

### 2. Configurar la base de datos en Appwrite
Para que el proyecto funcione correctamente con Appwrite, es necesario configurar la base de datos en Appwrite y luego integrarla en el proyecto.

### Crear una Cuenta en Appwrite

1. Ve al [sitio oficial de Appwrite](https://appwrite.io/).
2. Regístrate o inicia sesión en tu cuenta de Appwrite.
3. Una vez dentro crea la base de datos con un nombre por ejemplo jira-clone.

### Crear las colecciones en la base de datos
deberas crear las colecciones necesarias estas son: `tasks`, `projects`,`members`, `workspaces`.

### Crear coleccion `tasks`
1. En el panel de la base de datos, selecciona la base de datos que acabas de crear.
2. Haz clic en **Crear Colección (Create Collection)** y agrega la siguiente información:
   - **Nombre**: `tasks`
3. En la sección de **Atributos (Attributes)**, agrega los siguientes campos:
   - `workspaceId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `name` (Tipo: **String**, Requerido: **Sí**, Size: **256**)
   - `projectId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `assigneeId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `description` (Tipo: **String**, Opcional, Size: **2048**)
   - `dueDate` (Tipo: **Datetime**, Requerido: **Sí**)
   - `status` (Tipo: **Enum**, Requerido: **Sí**) con los valores: `BACKLOG`, `TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`
   - `position` (Tipo: **Integer**, Requerido: **Sí**, Min: `1000`, Max:`1000000`)
4. En la sección de **Settings** de la colección, en **Permissions**, agrega un rol para **users** con las opciones **Create**, **Read**, **Update**, y **Delete** marcadas.

### Crear coleccion projects
1. Crea una nueva colección llamada `projects` con los siguientes atributos:
   - `workspaceId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `imageUrl` (Tipo: **String**, Opcional, Size: **1400000**)
   - `name` (Tipo: **String**, Requerido: **Sí**, Size: **256**)
2. En la sección de **Settings** de la colección, en **Permissions**, agrega un rol para **users** con las opciones **Create**, **Read**, **Update**, y **Delete** marcadas.

### Crear coleccion `members`
1. Crea la colección llamada `members` con los siguientes atributos:
   - `userId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `workspaceId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `role` (Tipo: **Enum**, Requerido: **Sí**) con valores `ADMIN`, `MEMBER`.
2. En la sección de **Settings** de la colección, en **Permissions**, agrega un rol para **users** con las opciones **Create**, **Read**, **Update**, y **Delete** marcadas.

### Crear coleccion `workspaces`
1. Crea la colección `workspaces` con los siguientes atributos:
   - `name` (Tipo: **String**, Requerido: **Sí**, Size: **256**)
   - `userId` (Tipo: **String**, Requerido: **Sí**, Size: **50**)
   - `imageUrl` (Tipo: **String**, Opcional, Size: **1400000**)
   - `inviteCode` (Tipo: **String**, Requerido: **Sí**, Size: **10**)
2. En la sección de **Settings** de la colección, en **Permissions**, agrega un rol para **users** con las opciones **Create**, **Read**, **Update**, y **Delete** marcadas.

### Crear un bucket para almacenamiento
Crear un Bucket para Almacenamiento de Archivos

1. En el panel de Appwrite, ve a **Storage**.
2. Haz clic en **Crear Bucket (Create Bucket)** y asigna el nombre `images` al bucket.
3. En **Permissions**, agrega un rol de **users** con las opciones **Create**, **Read**, **Update**, y **Delete** marcadas.
4. En **Maximum File Size**, establece el límite de tamaño a **1 MB**.
5. En **Allowed File Extensions**, agrega las extensiones permitidas: `jpg`, `png`, `svg`, `jpeg`.

### Copiar el Código de las Colecciones a `.env.local`

Una vez que las colecciones y los buckets estén creados, necesitarás configurar los IDs de las colecciones en el proyecto. Esto se realiza copiando los IDs de las colecciones de Appwrite y agregándolos a tu archivo `.env.local`.

1. Copia el ID de cada colección desde la interfaz de Appwrite:
   - `tasks`
   - `projects`
   - `members`
   - `workspaces`
   - `images` (para el bucket de imágenes)
   
2. Crea o edita el archivo `.env.local` en la raíz de tu proyecto y agrega las siguientes variables:

```env
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_TASKS_ID=your_tasks_collection_id
APPWRITE_COLLECTION_PROJECTS_ID=your_projects_collection_id
APPWRITE_COLLECTION_MEMBERS_ID=your_members_collection_id
APPWRITE_COLLECTION_WORKSPACES_ID=your_workspaces_collection_id
APPWRITE_STORAGE_BUCKET_IMAGES_ID=your_images_bucket_id
```

### Appwirte SDK
Verifica que el SDK de Appwrite esté correctamente instalado y configurado para interactuar con la base de datos y el almacenamiento. Si aún no lo has hecho, instálalo con:

```
npm install appwrite
```

## Descripcion de Funcionalidades Clave

### Autenticación
La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar sus sesiones de forma segura. La autenticación es gestionada mediante OAuth y otras integraciones externas.

### Gestión de Espacios de Trabajo
Los usuarios pueden crear, unirse y gestionar espacios de trabajo. Dentro de los espacios de trabajo, pueden administrar miembros y proyectos.

### Gestión de Proyectos y Tareas
Los usuarios pueden crear proyectos, asignar tareas y realizar un seguimiento de su progreso mediante una interfaz de kanban o calendario.

### Interacción con la API
La aplicación se comunica con un backend mediante API RESTful, utilizando hooks personalizados para realizar acciones como crear, obtener, actualizar y eliminar datos relacionados con proyectos, tareas y miembros.

## Tecnologias Usadas

- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Next.js**: Framework para React, optimizado para el renderizado en el servidor y la creación de aplicaciones web escalables.
- **Appwrite**: Plataforma BaaS utilizada para la gestión de usuarios y bases de datos.
- **Tailwind**: framework de utilidades para CSS que permite construir diseños personalizados rápidamente utilizando clases de bajo nivel.
- **Honojs**: framework minimalista para construir aplicaciones web y APIs de alto rendimiento en JavaScript/TypeScript.
