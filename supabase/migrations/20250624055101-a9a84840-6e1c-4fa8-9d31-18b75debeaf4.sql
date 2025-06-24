
-- Drop existing policies that might be incompatible
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can update their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can delete their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can do everything with transactions" ON public.transactions;

-- Create new policies that work with our custom authentication system
-- Since we're not using Supabase auth but our own Users table, we need different policies

-- Allow all authenticated operations for now (we'll control access in the application layer)
CREATE POLICY "Allow all operations on transactions" 
  ON public.transactions 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
