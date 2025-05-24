// audit-entry.model.ts
export interface AuditEntry {
  id: string;
  date: string;
  utilisateur: string;
  module: string;
  operation: string;
  raison: string;
  commentaire: string;
}
