/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URL: string;
  // weitere Umgebungsvariablen hier hinzufügen
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
