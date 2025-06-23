
-- First, let's update the Users table to support email-based authentication
-- Add email column and make necessary adjustments
ALTER TABLE public."Users" ADD COLUMN IF NOT EXISTS "email" text UNIQUE;

-- Update the existing demo users with email addresses
UPDATE public."Users" SET "email" = 'john.doe@example.com' WHERE id = 1;
UPDATE public."Users" SET "email" = 'jane.smith@example.com' WHERE id = 2;
UPDATE public."Users" SET "email" = 'admin@example.com' WHERE id = 3;

-- Add a Name column if it doesn't exist (for the welcome message)
ALTER TABLE public."Users" ADD COLUMN IF NOT EXISTS "Name" text;

-- Update existing users with names if they don't have them
UPDATE public."Users" SET "Name" = 'John Doe' WHERE id = 1 AND "Name" IS NULL;
UPDATE public."Users" SET "Name" = 'Jane Smith' WHERE id = 2 AND "Name" IS NULL;
UPDATE public."Users" SET "Name" = 'Admin User' WHERE id = 3 AND "Name" IS NULL;

-- Make the admin user an actual admin
ALTER TABLE public."Users" ADD COLUMN IF NOT EXISTS "is_admin" boolean DEFAULT false;
UPDATE public."Users" SET "is_admin" = true WHERE id = 3;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public."Users"("email");
CREATE INDEX IF NOT EXISTS idx_users_account_number ON public."Users"("account_number");

-- Update RLS policies to work with email-based authentication
-- First drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON public."Users";
DROP POLICY IF EXISTS "Users can update their own data" ON public."Users";
DROP POLICY IF EXISTS "Admins can view all users" ON public."Users";

-- Create new policies for email-based auth
CREATE POLICY "Public read access for authentication" ON public."Users"
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own data" ON public."Users"
  FOR UPDATE USING (email = current_setting('app.current_user_email', true));

CREATE POLICY "Admins can do everything" ON public."Users"
  FOR ALL USING (current_setting('app.user_is_admin', true)::boolean = true);

-- Update transaction policies to work with the new system
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.transactions;

CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM public."Users" 
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

CREATE POLICY "Users can insert their own transactions" ON public.transactions
  FOR INSERT WITH CHECK (
    user_id IN (
      SELECT id FROM public."Users" 
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

CREATE POLICY "Admins can do everything with transactions" ON public.transactions
  FOR ALL USING (current_setting('app.user_is_admin', true)::boolean = true);
