# T-Shirts React App - Version 1.0

A React application for managing a t-shirt catalog with authentication and Supabase backend.

**[📄 Versión en Español](./README.es.md)**

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- A Supabase account (free tier is sufficient)

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Choose a name for your project
   - **Database Password**: Create a secure password
   - **Region**: Select the closest region to your users
5. Click "Create new project" and wait for it to initialize

### 2. Create the Tshirt Table

1. In your Supabase dashboard, go to **Table Editor**
2. Click "Create a new table"
3. Configure the table:
   - **Name**: `Tshirt`
   - **Enable Row Level Security (RLS)**: ✅ Check this box
4. Add the following columns:

| Column Name | Type        | Default Value     | Primary | Required |
| ----------- | ----------- | ----------------- | ------- | -------- |
| id          | uuid        | gen_random_uuid() | ✅      | ✅       |
| name        | text        | -                 | ❌      | ✅       |
| price       | numeric     | -                 | ❌      | ✅       |
| imageUrl    | text        | -                 | ❌      | ✅       |
| created_at  | timestamptz | now()             | ❌      | ✅       |

5. Click "Save"

### 3. Configure Row Level Security (RLS) Policies

**IMPORTANT**: You must create ALL four policies for the app to work correctly.

Go to **Authentication** → **Policies** in your Supabase dashboard, then create each policy below:

#### Policy 1: Enable SELECT (Read) for all users

```sql
create policy "Enable read access for all users"
on "public"."Tshirt"
as PERMISSIVE
for SELECT
to public
using ( true );
```

**Or use the UI:**

- Click "Create policy"
- Select "Enable read access for all users" template
- Click "Review" → "Save policy"

#### Policy 2: Enable INSERT (Create) for authenticated users

```sql
create policy "Enable insert for authenticated users only"
on "public"."Tshirt"
as PERMISSIVE
for INSERT
to authenticated
with check ( true );
```

**Or use the UI:**

- Click "Create policy"
- Select "Enable insert for authenticated users only" template
- Click "Review" → "Save policy"

#### Policy 3: Enable UPDATE for authenticated users

```sql
create policy "Enable update for authenticated users only"
on "public"."Tshirt"
as PERMISSIVE
for UPDATE
to authenticated
using ( true );
```

**Or use the UI:**

- Click "Create policy"
- Name: "Enable update for authenticated users only"
- Command: UPDATE
- Target roles: authenticated
- Using expression: `true`
- Click "Review" → "Save policy"

#### Policy 4: Enable DELETE for authenticated users

```sql
create policy "Enable delete for authenticated users only"
on "public"."Tshirt"
as PERMISSIVE
for DELETE
to authenticated
using ( true );
```

**Or use the UI:**

- Click "Create policy"
- Name: "Enable delete for authenticated users only"
- Command: DELETE
- Target roles: authenticated
- Using expression: `true`
- Click "Review" → "Save policy"

### 4. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd t-shirts-react
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Edit `.env` and add your credentials:

```env
VITE_API_BASE_URL=http://localhost:3000

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace:

- `your_supabase_project_url` with your Project URL (e.g., `https://xxxxx.supabase.co`)
- `your_supabase_anon_key` with your anon/public key

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

- View t-shirt catalog (public access)
- User authentication (login/register)
- Admin features (requires authentication):
  - Add new t-shirts
  - Edit existing t-shirts
  - Delete t-shirts
- Real-time data synchronization with Supabase
- Form validation
- Sweet alerts for user feedback
- Responsive design

## Project Structure

```
src/
├── components/
│   ├── Gallery.jsx          # T-shirt gallery display
│   └── TShirt/
│       ├── TShirtForm.jsx   # Form for creating/editing t-shirts
│       └── TShirtList.jsx   # List of t-shirts with admin actions
├── context/
│   └── AuthProvider.jsx     # Authentication context provider
├── hooks/
│   ├── useAuth.js          # Authentication hook
│   └── useForm.js          # Form handling and validation hook
├── lib/
│   └── supabase.js         # Supabase client configuration
├── pages/
│   └── TShirts.jsx         # Main t-shirts management page
└── services/
    └── tshirtService.js    # T-shirt CRUD operations service
```

## Troubleshooting

### Update/Delete Operations Not Working

**Symptom**: You can read t-shirts but can't update or delete them (operations return 200 OK but data doesn't change).

**Solution**:

1. Verify RLS is enabled on the Tshirt table
2. Check that you have created **ALL FOUR policies**:
   - ✅ SELECT (read) - for public
   - ✅ INSERT (create) - for authenticated
   - ✅ UPDATE - for authenticated ← Often missing!
   - ✅ DELETE - for authenticated ← Often missing!

### Can't See Any Data

**Solution**:

1. Check your `.env` file has the correct Supabase credentials
2. Verify the Supabase URL doesn't have trailing slashes
3. Check browser console (F12) for errors
4. Verify the SELECT policy exists and targets "public" role

### Authentication Issues

**Solution**:

1. Make sure you're logged in as an authenticated user
2. Check that your user has the 'admin' role in the app context
3. Verify INSERT, UPDATE, and DELETE policies target "authenticated" role

### Environment Variables Not Loading

**Solution**:

1. Ensure your `.env` file is in the project root
2. All Vite environment variables must start with `VITE_`
3. Restart the development server after changing `.env`

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
- **SweetAlert2** - Beautiful alerts and confirmations
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting

## Security Notes

- Row Level Security (RLS) is enabled to protect data
- Public users can only read t-shirts (SELECT)
- Only authenticated users can create, update, or delete t-shirts
- The Supabase anon key is safe to expose in client-side code
- Never commit your `.env` file to version control

## License

MIT

---

Built with React + Vite
