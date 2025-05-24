export interface Entretien {
  id?: string;
  date: string;
  utilisateurId: string;
  referenceUtilisation: string;
  operations: {
    type: string;
    produit: string;  
    commentaire?: string;
  }[];
}
