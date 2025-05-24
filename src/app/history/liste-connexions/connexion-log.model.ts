// connexion-log.model.ts
export interface ConnexionLog {
  id: string;
  userId: string;
  loginTime: string;
  ipAddress: string;
  user: {
    nom: string;
    prenom: string;
    email: string;
    login: string;
  };
}