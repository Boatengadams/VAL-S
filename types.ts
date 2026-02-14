
export interface PoemResponse {
  poem: string;
}

export enum AppState {
  PROPOSING = 'PROPOSING',
  SUCCESS = 'SUCCESS'
}

export enum ViewType {
  CREATOR = 'CREATOR',
  RECIPIENT = 'RECIPIENT'
}
