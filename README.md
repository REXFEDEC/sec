# Secure Notes App

A modern, enterprise-level note-taking application built with Next.js 16 and Supabase. Features include secure authentication, Markdown support with live preview, dark/light mode, and cloud storage.

![Secure Notes App](placeholder-screenshot.png)

## Features

- **User Authentication**: Secure email/password authentication with Supabase Auth
- **Note Management**: Create, read, update, and delete notes with ease
- **Markdown Support**: Write notes in Markdown with live preview
- **Dark Mode**: Beautiful dark and light themes with smooth transitions
- **Cloud Storage**: Notes are securely stored in Supabase Storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Row-Level Security**: Database queries are protected with RLS policies
- **Modern UI**: Clean, card-based layout with smooth animations
- **Real-time Updates**: Changes are immediately reflected across the app

## Tech Stack

- **Frontend**: React 19 with Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Authentication**: Supabase Auth (email/password)
- **Database**: Supabase PostgreSQL with Row-Level Security
- **Storage**: Supabase Storage for note files
- **Markdown**: react-markdown with remark-gfm for GitHub-flavored markdown
- **Deployment**: Vercel (or Cloudflare Pages compatible)

## Project Structure

\`\`\`
secure-notes-app/
├── app/                          # Next.js App Router
│   ├── auth/                     # Auth-related routes
│   │   ├── callback/            # OAuth callback handler
│   │   └── auth-code-error/     # Auth error page
│   ├── dashboard/               # Main dashboard
│   │   └── page.tsx             # Dashboard with notes list
│   ├── notes/                   # Note CRUD routes
│   │   ├── new/                 # Create new note
│   │   │   └── page.tsx
│   │   └── [id]/                # Edit existing note
│   │       └── page.tsx
│   ├── login/                   # Login page
│   │   └── page.tsx
│   ├── register/                # Registration page
│   │   └── page.tsx
│   ├── register-success/        # Email confirmation page
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Landing page
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles and theme tokens
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── dashboard-nav.tsx        # Navigation bar with theme toggle
│   ├── notes-list.tsx           # Notes grid with delete functionality
│   ├── note-editor.tsx          # Markdown editor with preview
│   ├── theme-provider.tsx       # Dark mode context provider
│   ├── theme-toggle.tsx         # Theme switcher component
│   └── toaster.tsx              # Toast notifications
├── lib/                         # Utility libraries
│   └── supabase/                # Supabase clients
│       ├── client.ts            # Browser client
│       ├── server.ts            # Server client
│       └── middleware.ts        # Session management
├── hooks/                       # React hooks
│   ├── use-toast.ts            # Toast notification hook
│   └── use-mobile.tsx          # Mobile detection hook
├── scripts/                     # Database scripts
│   ├── 001_create_notes_table.sql
│   └── 002_create_storage_bucket.sql
├── middleware.ts                # Next.js middleware for auth
└── README.md                    # This file
\`\`\`

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Git for version control

## Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd secure-notes-app
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the database to be provisioned (takes ~2 minutes)

#### Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - `Project URL` (e.g., `https://xxxxx.supabase.co`)
   - `anon public` key (under "Project API keys")

#### Configure Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Under **Authentication** > **URL Configuration**:
   - Add your local development URL: `http://localhost:3000/**`
   - Add your production URL when deploying

#### Run Database Scripts

The database tables and storage configuration need to be set up. You can run the SQL scripts in the Supabase SQL Editor:

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy the contents of `scripts/001_create_notes_table.sql`
4. Click **Run** to execute
5. Repeat for `scripts/002_create_storage_bucket.sql`

Alternatively, if you're using v0, the scripts will be automatically executed when you build the project.

### 4. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
\`\`\`

Replace the values with your actual Supabase credentials from step 3.

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

#### `notes`

| Column       | Type                     | Description                    |
|--------------|--------------------------|--------------------------------|
| id           | uuid                     | Primary key                    |
| user_id      | uuid                     | Foreign key to auth.users      |
| title        | text                     | Note title                     |
| file_path    | text                     | Path to note file in storage   |
| created_at   | timestamp with time zone | Creation timestamp             |
| updated_at   | timestamp with time zone | Last update timestamp          |

### Storage Buckets

#### `notes`

- **Privacy**: Private (RLS protected)
- **File Type**: Text files (.txt)
- **Structure**: `{user_id}/{timestamp}.txt`

### Row-Level Security (RLS)

All tables and storage buckets have RLS policies enabled to ensure users can only access their own data:

**Notes Table Policies:**
- Users can SELECT their own notes
- Users can INSERT their own notes
- Users can UPDATE their own notes
- Users can DELETE their own notes

**Storage Policies:**
- Users can view their own note files
- Users can upload their own note files
- Users can update their own note files
- Users can delete their own note files

## How It Works

### Authentication Flow

1. User registers with email/password
2. Supabase sends a confirmation email
3. User clicks the confirmation link
4. User can now log in
5. Middleware checks authentication on every request
6. Protected routes redirect to login if not authenticated

### Note Management Flow

1. **Create**: User creates a note with title and content
2. **Save**: Content is saved as a `.txt` file in Supabase Storage under `{user_id}/{timestamp}.txt`
3. **Database**: Metadata (title, file_path, timestamps) is stored in the `notes` table
4. **Read**: When viewing/editing, the app fetches the file from storage and metadata from the database
5. **Update**: Content is updated in storage, metadata is updated in the database
6. **Delete**: Both the file in storage and the database record are deleted

### Security

- **RLS Policies**: All database queries are scoped to the authenticated user's `user_id`
- **Middleware**: Authentication is checked on every request via Next.js middleware
- **Server Components**: Sensitive operations use server-side rendering and server actions
- **Environment Variables**: API keys are kept secure and never exposed to the client

## Deployment

### Deploying to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" and select your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Deploying to Cloudflare Pages

1. Build the project for static export (if needed):

\`\`\`bash
npm run build
\`\`\`

2. Push your code to GitHub
3. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
4. Navigate to **Workers & Pages** > **Create application** > **Pages**
5. Connect your GitHub repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
7. Add environment variables (same as Vercel)
8. Click "Save and Deploy"

### Post-Deployment Steps

1. Update Supabase Auth URLs:
   - Go to **Authentication** > **URL Configuration**
   - Add your production URL to the allowed redirect URLs
   
2. Test the authentication flow on production

3. Update `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` if needed for your production environment

## Usage Guide

### Creating a Note

1. Log in to your account
2. Click "New Note" from the dashboard
3. Enter a title for your note
4. Write your content (Markdown supported)
5. Switch to "Preview" tab to see formatted output
6. Click "Save Note"

### Editing a Note

1. From the dashboard, click "Edit" on any note card
2. Modify the title or content
3. Use the Preview tab to check formatting
4. Click "Save Note" to update

### Deleting a Note

1. From the dashboard, click the trash icon on a note card
2. Confirm the deletion in the dialog
3. The note and its file are permanently deleted

### Using Markdown

The editor supports GitHub-flavored Markdown:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Lists**: `- item` or `1. item`
- **Links**: `[text](url)`
- **Code blocks**: ` ```language code``` `
- **Tables**: Pipe-separated tables
- And more!

### Theme Toggle

Click the sun/moon icon in the navbar to switch between:
- Light mode
- Dark mode
- System preference

## Troubleshooting

### Issue: "Failed to fetch" errors

**Solution**: Check that your environment variables are correctly set and that your Supabase project is running.

### Issue: Email confirmation not working

**Solution**: 
1. Check your spam folder
2. Verify your email provider settings in Supabase
3. In development, check the Supabase Auth logs for the confirmation link

### Issue: Notes not saving

**Solution**:
1. Ensure the storage bucket was created (check `scripts/002_create_storage_bucket.sql`)
2. Verify RLS policies are enabled
3. Check browser console for error messages

### Issue: Authentication redirect loop

**Solution**:
1. Clear browser cookies and localStorage
2. Verify middleware configuration
3. Check that redirect URLs are properly configured in Supabase

## Development Tips

### Running Database Migrations

After modifying the SQL scripts, run them in the Supabase SQL Editor or use the Supabase CLI:

\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
\`\`\`

### Adding New Features

1. **New UI Components**: Use shadcn/ui components in the `components/ui` directory
2. **New Pages**: Add them to the `app` directory following the App Router structure
3. **New API Routes**: Create route handlers in the `app/api` directory if needed
4. **Database Changes**: Create new SQL scripts with incremental numbering

### Testing Locally

\`\`\`bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [Supabase documentation](https://supabase.com/docs)
3. Review the [Next.js documentation](https://nextjs.org/docs)
4. Open an issue on GitHub

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend powered by [Supabase](https://supabase.com)
- Icons from [Lucide](https://lucide.dev)

---

**Made with ❤️ using v0 by Vercel**
