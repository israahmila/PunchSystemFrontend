// utilisateur.model.ts
export interface User {
  id: string;
  username: string;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
  role: {
    name: string;
    permissions: { module: string; action: string }[];
  };
  userPermissions: { module: string; action: string }[];
}
export interface Permission {
  module: string;
  action?: string; // Optionnel car remplacé par les booléens ci-dessous
  consulter?: boolean;
  ajouter?: boolean;
  modifier?: boolean;
  supprimer?: boolean;
}


