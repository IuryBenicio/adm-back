import "dotenv";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGO_URL: string;
      SESSION_SECRET: string;
    }
  }
}

type adminType = {
  userName: string;
  senha: string;
};

type apiLiturgy = {
  id?: number;
  tema: string;
  subtema?: string;
  versiculo: string;
  louvoresIniciais: [
    {
      nome: string;
      cantor: string;
    }
  ];
  pregador: string;
  louvorPosPalavra: [
    {
      nome: string;
      cantor: string;
    }
  ];
  santaCeia?: string;
  louvorCeia?: [
    {
      nome: string;
      cantor: string;
    }
  ];
  avisos: [
    {
      titulo: string;
      descrição: string;
    }
  ];
};
