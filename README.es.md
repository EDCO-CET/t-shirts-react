# Aplicación de Camisetas en React

Una aplicación React para gestionar un catálogo de camisetas con autenticación y backend en Supabase.

**[📄 English Version](./README.md)**

## Requisitos Previos

- Node.js (v20 o superior)
- npm o yarn
- Una cuenta de Supabase (el nivel gratuito es suficiente)

## Configuración de Supabase

### 1. Crear un Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Regístrate o inicia sesión
3. Haz clic en "New Project"
4. Completa los detalles de tu proyecto:
   - **Name**: Elige un nombre para tu proyecto
   - **Database Password**: Crea una contraseña segura
   - **Region**: Selecciona la región más cercana a tus usuarios
5. Haz clic en "Create new project" y espera a que se inicialice

### 2. Crear la Tabla Tshirt

1. En tu panel de Supabase, ve a **Table Editor**
2. Haz clic en "Create a new table"
3. Configura la tabla:
   - **Name**: `Tshirt`
   - **Enable Row Level Security (RLS)**: ✅ Marca esta casilla
4. Agrega las siguientes columnas:

| Nombre Columna | Tipo        | Valor por Defecto | Primaria | Requerida |
| -------------- | ----------- | ----------------- | -------- | --------- |
| id             | uuid        | gen_random_uuid() | ✅       | ✅        |
| name           | text        | -                 | ❌       | ✅        |
| price          | numeric     | -                 | ❌       | ✅        |
| imageUrl       | text        | -                 | ❌       | ✅        |
| created_at     | timestamptz | now()             | ❌       | ✅        |

5. Haz clic en "Save"

### 3. Configurar las Políticas de Row Level Security (RLS)

**IMPORTANTE**: Debes crear LAS CUATRO políticas para que la aplicación funcione correctamente.

Ve a **Authentication** → **Policies** en tu panel de Supabase, luego crea cada política a continuación:

#### Política 1: Habilitar SELECT (Lectura) para todos los usuarios

```sql
create policy "Enable read access for all users"
on "public"."Tshirt"
as PERMISSIVE
for SELECT
to public
using ( true );
```

**O usa la interfaz:**

- Haz clic en "Create policy"
- Selecciona la plantilla "Enable read access for all users"
- Haz clic en "Review" → "Save policy"

#### Política 2: Habilitar INSERT (Creación) para usuarios autenticados

```sql
create policy "Enable insert for authenticated users only"
on "public"."Tshirt"
as PERMISSIVE
for INSERT
to authenticated
with check ( true );
```

**O usa la interfaz:**

- Haz clic en "Create policy"
- Selecciona la plantilla "Enable insert for authenticated users only"
- Haz clic en "Review" → "Save policy"

#### Política 3: Habilitar UPDATE (Actualización) para usuarios autenticados

```sql
create policy "Enable update for authenticated users only"
on "public"."Tshirt"
as PERMISSIVE
for UPDATE
to authenticated
using ( true );
```

**O usa la interfaz:**

- Haz clic en "Create policy"
- Nombre: "Enable update for authenticated users only"
- Comando: UPDATE
- Roles objetivo: authenticated
- Expresión Using: `true`
- Haz clic en "Review" → "Save policy"

#### Política 4: Habilitar DELETE (Eliminación) para usuarios autenticados

```sql
create policy "Enable delete for authenticated users only"
on "public"."Tshirt"
as PERMISSIVE
for DELETE
to authenticated
using ( true );
```

**O usa la interfaz:**

- Haz clic en "Create policy"
- Nombre: "Enable delete for authenticated users only"
- Comando: DELETE
- Roles objetivo: authenticated
- Expresión Using: `true`
- Haz clic en "Review" → "Save policy"

### 4. Obtener tus Credenciales de Supabase

1. En tu panel de Supabase, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** (bajo "Project URL")
   - **anon/public key** (bajo "Project API keys")

## Instalación

1. Clona el repositorio:

```bash
git clone <url-de-tu-repositorio>
cd t-shirts-react
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio raíz:

```bash
cp .env.example .env
```

4. Edita `.env` y agrega tus credenciales:

```env
VITE_API_BASE_URL=http://localhost:3000

# Configuración de Supabase
VITE_SUPABASE_URL=tu_url_de_proyecto_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_supabase
```

Reemplaza:

- `tu_url_de_proyecto_supabase` con tu Project URL (ej: `https://xxxxx.supabase.co`)
- `tu_clave_anon_supabase` con tu anon/public key

## Ejecutar la Aplicación

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilar para Producción

```bash
npm run build
```

### Vista Previa de la Compilación de Producción

```bash
npm run preview
```

## Características

- Ver catálogo de camisetas (acceso público)
- Autenticación de usuarios (login/registro)
- Características de administrador (requiere autenticación):
  - Agregar nuevas camisetas
  - Editar camisetas existentes
  - Eliminar camisetas
- Sincronización de datos en tiempo real con Supabase
- Validación de formularios
- Alertas elegantes para retroalimentación del usuario
- Diseño responsivo

## Estructura del Proyecto

```
src/
├── components/
│   ├── Gallery.jsx          # Galería de camisetas
│   └── TShirt/
│       ├── TShirtForm.jsx   # Formulario para crear/editar camisetas
│       └── TShirtList.jsx   # Lista de camisetas con acciones de admin
├── context/
│   └── AuthProvider.jsx     # Proveedor del contexto de autenticación
├── hooks/
│   ├── useAuth.js          # Hook de autenticación
│   └── useForm.js          # Hook para manejo y validación de formularios
├── lib/
│   └── supabase.js         # Configuración del cliente de Supabase
├── pages/
│   └── TShirts.jsx         # Página principal de gestión de camisetas
└── services/
    └── tshirtService.js    # Servicio de operaciones CRUD de camisetas
```

## Solución de Problemas

### Las Operaciones de Actualización/Eliminación No Funcionan

**Síntoma**: Puedes leer camisetas pero no puedes actualizarlas o eliminarlas (las operaciones devuelven 200 OK pero los datos no cambian).

**Solución**:

1. Verifica que RLS esté habilitado en la tabla Tshirt
2. Comprueba que hayas creado **LAS CUATRO políticas**:
   - ✅ SELECT (lectura) - para público
   - ✅ INSERT (creación) - para autenticados
   - ✅ UPDATE - para autenticados ← ¡A menudo falta!
   - ✅ DELETE - para autenticados ← ¡A menudo falta!

### No Puedo Ver Ningún Dato

**Solución**:

1. Verifica que tu archivo `.env` tenga las credenciales correctas de Supabase
2. Asegúrate de que la URL de Supabase no tenga barras diagonales al final
3. Revisa la consola del navegador (F12) en busca de errores
4. Verifica que la política SELECT exista y esté dirigida al rol "public"

### Problemas de Autenticación

**Solución**:

1. Asegúrate de haber iniciado sesión como usuario autenticado
2. Verifica que tu usuario tenga el rol 'admin' en el contexto de la aplicación
3. Comprueba que las políticas INSERT, UPDATE y DELETE estén dirigidas al rol "authenticated"

### Las Variables de Entorno No Se Cargan

**Solución**:

1. Asegúrate de que tu archivo `.env` esté en la raíz del proyecto
2. Todas las variables de entorno de Vite deben comenzar con `VITE_`
3. Reinicia el servidor de desarrollo después de cambiar `.env`

## Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Herramienta de compilación y servidor de desarrollo
- **Supabase** - Backend as a Service (BaaS)
  - Base de datos PostgreSQL
  - Row Level Security (RLS)
  - Suscripciones en tiempo real
- **SweetAlert2** - Alertas y confirmaciones elegantes
- **React Router DOM** - Enrutamiento del lado del cliente
- **ESLint** - Linting de código

## Notas de Seguridad

- Row Level Security (RLS) está habilitado para proteger los datos
- Los usuarios públicos solo pueden leer camisetas (SELECT)
- Solo los usuarios autenticados pueden crear, actualizar o eliminar camisetas
- La clave anon de Supabase es segura para exponer en código del lado del cliente
- Nunca subas tu archivo `.env` al control de versiones

## Licencia

MIT

---

Construido con React + Vite
