
-- Update the account number generation to be 10 digits and ensure uniqueness
-- First, let's update existing users with 10-digit account numbers
UPDATE public."Users" 
SET account_number = (1000000000 + (RANDOM() * 9000000000)::bigint)
WHERE account_number IS NULL OR account_number < 1000000000;

-- Make sure all existing users have 10-digit account numbers
UPDATE public."Users" 
SET account_number = (1000000000 + (account_number % 9000000000))
WHERE account_number < 1000000000;

-- Add a function to generate unique 10-digit account numbers for new users
CREATE OR REPLACE FUNCTION generate_unique_account_number()
RETURNS bigint AS $$
DECLARE
    new_account_number bigint;
    account_exists boolean;
BEGIN
    LOOP
        -- Generate a random 10-digit number (1000000000 to 9999999999)
        new_account_number := (1000000000 + (RANDOM() * 9000000000)::bigint);
        
        -- Check if this account number already exists
        SELECT EXISTS(SELECT 1 FROM public."Users" WHERE account_number = new_account_number) INTO account_exists;
        
        -- If it doesn't exist, we can use it
        IF NOT account_exists THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN new_account_number;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically assign unique account numbers to new users
CREATE OR REPLACE FUNCTION assign_account_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.account_number IS NULL THEN
        NEW.account_number := generate_unique_account_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS set_account_number ON public."Users";
CREATE TRIGGER set_account_number
    BEFORE INSERT ON public."Users"
    FOR EACH ROW
    EXECUTE FUNCTION assign_account_number();
