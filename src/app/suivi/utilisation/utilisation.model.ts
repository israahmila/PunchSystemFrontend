// utilisation.model.ts

export interface Utilisation {
  id: string;
  dateUtilisation: string;
  compresseuse: string;
  nombreComprimes: number;
  emplacementRetour: string;
  commentaire: string;
  lotNumbers: string[];
  poinconIds: string[];
  userIds: string[];
  codeFormats?: string[];
  etatPoincons?: string[];
}
