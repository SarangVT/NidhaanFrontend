import csv
import json
import sys

def csv_to_json(csv_file_path, json_file_path):
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        data = list(reader)

    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=2)

    print(f"Converted '{csv_file_path}' to '{json_file_path}' successfully.")

# Example usage:
# python csv_to_json.py input.csv output.json

csv_to_json("tblproducts.csv", "products.json")

# if __name__ == "__main__":
#     if len(sys.argv) != 3:
#         print("Usage: python csv_to_json.py input.csv output.json")
#     else:
#         csv_to_json(sys.argv[1], sys.argv[2])
