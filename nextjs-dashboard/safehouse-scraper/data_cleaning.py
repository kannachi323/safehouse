import os
import pandas as pd

# Function to clean the address
def clean_address(address):
    # Split the address based on common delimiters
    # Handle cases where there's a '|' symbol in the address
    if '|' in address:
        name_and_address = address.split('|')
        address = name_and_address[1].strip()
    # Split the address into components (assumes the format: Street, City, State)
    parts = address.split(',')
    
    if len(parts) == 3:
        street = parts[0].strip()
        city = parts[1].strip()
        state_zip = parts[2].strip()
        state = state_zip.split()[0]
        zipcode = state_zip.split()[1] if len(state_zip.split()) > 1 else None
    else:
        # If not in the expected format, fill with None
        street, city, state, zipcode = [None] * 4

    return pd.Series([street, city, state, zipcode])

# Function to process all CSV files in the 'data' directory
def clean_files_in_directory(directory):
    # Check if the directory exists
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return
    
    # Loop over all files in the directory
    for filename in os.listdir(directory):
        # Only process .csv files
        if filename.endswith('.csv'):
            file_path = os.path.join(directory, filename)
            
            # Read the CSV file into a pandas DataFrame
            df = pd.read_csv(file_path)
            
            # Apply the cleaning function to the address column
            df[['address', 'city', 'state', 'zipcode']] = df['address'].apply(clean_address)
            
            # Create the new filename with '_cleaned' suffix
            new_filename = filename.replace('.csv', '_cleaned.csv')
            new_file_path = os.path.join(directory, new_filename)
            
            # Save the cleaned DataFrame to a new CSV file
            df.to_csv(new_file_path, index=False)
            print(f"Cleaned file saved as: {new_file_path}")

# Example usage: clean all files in the 'data' directory
directory = 'data'  # You can change this to your actual directory path
clean_files_in_directory(directory)
