import sys
import json
import qrcode

# Check if the argument is passed correctly
if len(sys.argv) < 2:
    print("Error: Student details not provided.")
    sys.exit(1)

# Parse the student details from the command-line argument
try:
    student_details = json.loads(sys.argv[1])  # The details come as a JSON string
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
    sys.exit(1)

# Extract the roll number from the details to use in the filename
roll = student_details.get("roll", "Unknown")

# Generate QR code for student data (you can adjust what to include in the QR code)
qr_data = json.dumps(student_details)  # Convert student details to JSON string
img = qrcode.make(qr_data)  # Create the QR code from the student details

# Save the image with the roll number as the filename
img.save(f'./QR_codes/stud_{roll}.jpg')

print(f"QR Code generated and saved as stud_{roll}.jpg")
