
-- First, let's fix the Users table structure and add missing columns
ALTER TABLE public."Users" ADD COLUMN IF NOT EXISTS "account_number" bigint;
ALTER TABLE public."Users" ADD COLUMN IF NOT EXISTS "password" text;

-- Make account_number unique
ALTER TABLE public."Users" ADD CONSTRAINT unique_account_number UNIQUE ("account_number");

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id bigint REFERENCES public."Users"(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'transfer')),
  amount numeric(10,2) NOT NULL,
  recipient_account_number bigint,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security on Users table
ALTER TABLE public."Users" ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on transactions table
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Users table
CREATE POLICY "Users can view their own data" ON public."Users"
  FOR SELECT USING (id = current_setting('app.current_user_id')::bigint);

CREATE POLICY "Users can update their own data" ON public."Users"
  FOR UPDATE USING (id = current_setting('app.current_user_id')::bigint);

-- Create RLS policies for transactions table
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (user_id = current_setting('app.current_user_id')::bigint);

CREATE POLICY "Users can insert their own transactions" ON public.transactions
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::bigint);

-- Create admin policies (admins can do everything)
CREATE POLICY "Admins can view all users" ON public."Users"
  FOR ALL USING (current_setting('app.user_role', true) = 'admin');

CREATE POLICY "Admins can view all transactions" ON public.transactions
  FOR ALL USING (current_setting('app.user_role', true) = 'admin');

-- Insert some sample data for testing
INSERT INTO public."Users" (id, "Name", balance, "account_number", "password") 
VALUES 
  (1, 'John Doe', 2500.75, 1001, 'password123'),
  (2, 'Jane Smith', 1000.00, 1002, 'password456'),
  (3, 'Admin User', 0.00, 9999, 'admin123')
ON CONFLICT (id) DO NOTHING;

-- Insert sample transactions
INSERT INTO public.transactions (user_id, type, amount, description)
VALUES
  (1, 'deposit', 1000.00, 'Direct Deposit - Salary'),
  (1, 'withdrawal', 250.00, 'ATM Withdrawal'),
  (1, 'transfer', 500.00, 'Transfer to Account 1002')
ON CONFLICT DO NOTHING;
