import csv


def replace_company_name(abbrev):
    replacements = {
        'A': 'Alfa',
        'B': 'Bravo',
        'C': 'Charlie',
        'D': 'Delta',
        'E': 'Echo',
        'F': 'Foxtrot',
        'G': 'Golf',
        'H': 'Hotel'
    }
    return replacements.get(abbrev, abbrev)


def csv_to_sql(input_file, output_file):
    with open(input_file, 'r') as csv_file:
        reader = csv.DictReader(csv_file, delimiter=',')
        with open(output_file, 'w') as sql_file:
            for row in reader:
                code = row['Code']
                full_name = f"{row['First']} {row['Last']}"
                year = row['Class Yr.']
                company_abbrev = row['Co.']
                company = replace_company_name(company_abbrev)
                sql_file.write(
                    f"INSERT INTO Cadets (CadetCode, FullName, Year, Company, Status, NotifCode)\n")
                sql_file.write(
                    f"VALUES ({code}, '{full_name}', {year}, '{company}', '', '');\n\n")


if __name__ == "__main__":
    input_file = "excelCSV.csv"
    output_file = "output.sql"
    csv_to_sql(input_file, output_file)
    print(f"SQL file {output_file} generated successfully!")
