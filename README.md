# Case Competition Delhi - File Upload Platform

A secure web application with authentication and file upload capabilities built with Next.js, Supabase, and Resend.

## Features

- User authentication (Sign up, Sign in, Sign out)
- Password reset via email (using Resend)
- Secure dashboard with file upload
- Support for PDF and PowerPoint files (max 20MB)
- File management (view, delete)
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **Email**: Resend
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/LeeT627/Case-comp-delhi.git
cd case-comp-delhi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the following queries:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create files table
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  size BIGINT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for files
CREATE POLICY "Users can view own files" ON files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own files" ON files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own files" ON files
  FOR DELETE USING (auth.uid() = user_id);

-- Create a trigger to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Go to Storage and create a new bucket called `uploads`:
   - Name: `uploads`
   - Public bucket: Yes (or configure RLS policies for private access)
   - File size limit: 20MB
   - Allowed MIME types: `application/pdf`, `application/vnd.ms-powerpoint`, `application/vnd.openxmlformats-officedocument.presentationml.presentation`

### 4. Set up Resend

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain (for production) or use the default `onboarding@resend.dev` for testing

### 5. Configure environment variables

Copy the `.env.local` file and update with your credentials:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Site URL (update for production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment to Vercel

1. Push your code to GitHub
2. Import the repository to Vercel
3. Add the environment variables in Vercel project settings
4. Deploy

Make sure to update `NEXT_PUBLIC_SITE_URL` to your production URL after deployment.

## Project Structure

```
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Protected dashboard
│   │   └── dashboard/
│   ├── api/                 # API routes
│   │   └── auth/
│   └── auth/                # Password reset page
├── components/
│   └── ui/                  # Reusable UI components
├── lib/
│   └── supabase/           # Supabase client configuration
└── middleware.ts           # Auth middleware
```

## Security Features

- Row Level Security (RLS) enabled on all tables
- User can only access their own data
- File size validation (20MB max)
- File type validation (PDF and PPT only)
- Secure authentication with Supabase Auth
- Protected routes with middleware

## License

MIT
