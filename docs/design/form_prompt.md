Create a form as a hook that can be used to add Equipment or Maintenance Records.
Equipment form should have the following fields:
- Name (required, min 3 chars)
- Location (required)
- Department (dropdown from enum)
- Model (required)
- Serial Number (required, alphanumeric)
- Install Date (required, must be past date)
- Status (dropdown from enum)

Maintenance Record form should have the following fields:
- Equipment (dropdown selection, required)
- Date (required, not future date)
- Type (dropdown from enum)
- Technician (required, min 2 chars)
- Hours Spent (required, positive number, max 24)
- Description (required, min 10 chars)
- Parts Replaced (optional, dynamic array of strings)
- Priority (dropdown from enum)
- Completion Status (dropdown from enum)

The form should at least be able to be used in the equipment and maintenance record pages

Do not worry about form behavior when submitted it, just the form fields and validation. Use the interfaces from data.ts as guidance.