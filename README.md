# ForkCast Kitchen AI

## Project info

This is the ForkCast Kitchen AI project.

## How can I edit this code?

You can edit this project using your preferred IDE or directly in GitHub.

**Use your preferred IDE**

1. Clone the repository using the project's Git URL.
2. Navigate to the project directory.
3. Install the necessary dependencies:
   ```sh
   npm i
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

## What technologies are used for this project?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using Vercel, Netlify, or your preferred static hosting provider.

## Can I connect a custom domain?

Yes, most hosting providers allow you to connect a custom domain. Please refer to your provider's documentation for details.

## Troubleshooting: Profile Not Loading for Trial/Non-Pro Users

If users are stuck on "Loading profile..." in the dashboard or settings, check your Supabase Row Level Security (RLS) policies for the `profiles` table. You must have these policies:

```
-- Allow users to read their own profile
CREATE POLICY "Allow users to read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Allow users to insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- (Optional) Allow users to delete their own profile
CREATE POLICY "Allow users to delete their own profile"
  ON profiles
  FOR DELETE
  USING (auth.uid() = id);
```

Make sure RLS is enabled for the `profiles` table. Run these in the Supabase SQL editor if you have any issues with profile loading for new or trial users.
