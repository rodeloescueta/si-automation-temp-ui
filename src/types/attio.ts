/**
 * Attio API Types
 */

// Field value types
export interface AttioFieldValue {
  active_from: string;
  active_until: string | null;
  created_by_actor: {
    type: string;
    id: string;
  };
  value: string | number | boolean | null;
  attribute_type?: string;
  referenced_actor_type?: string;
  referenced_actor_id?: string;
  target_object?: string;
  target_record_id?: string;
}

// Record ID structure
export interface AttioRecordId {
  workspace_id: string;
  object_id: string;
  record_id: string;
}

// Complete Attio Record structure based on actual API response
export interface AttioRecord {
  id: AttioRecordId;
  created_at: string;
  values: {
    [key: string]: AttioFieldValue[];
  };
}

// Error response
export interface AttioErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}
