/**
 * Attio API Types
 */

// Base record field type
export interface AttioRecordField {
  id: string;
  value: string | number | boolean | null | Record<string, unknown>;
  display_value?: string;
  type: string;
}

// Common record fields
export interface AttioCommonFields {
  id: AttioRecordField;
  created_at: AttioRecordField;
  updated_at: AttioRecordField;
}

// Lead record fields
export interface AttioLeadFields extends AttioCommonFields {
  name?: AttioRecordField;
  email?: AttioRecordField;
  phone?: AttioRecordField;
  company?: AttioRecordField;
  position?: AttioRecordField;
  status?: AttioRecordField;
  source?: AttioRecordField;
  lead_owner?: AttioRecordField;
  linkedin_url?: AttioRecordField;
  notes?: AttioRecordField;
  // Add other fields as needed
}

// Deal record fields
export interface AttioDealFields extends AttioCommonFields {
  sales_client_id?: AttioRecordField;
  lead_id?: AttioRecordField;
  sales_representative_id?: AttioRecordField;
  lead_representative_id?: AttioRecordField;
  source?: AttioRecordField;
  // Add other fields as needed
}

// Record response
export interface AttioRecord {
  id: string;
  object: string;
  fields: AttioLeadFields | AttioDealFields;
  // Add other properties as needed
}

// Error response
export interface AttioErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}
