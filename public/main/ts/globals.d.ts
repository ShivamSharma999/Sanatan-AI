type ChatPart = {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
  functionCall?: {
    name: string;
    args?: Record<string, any>;
  };
  functionResponse?: any;
};

type ChatMessage = {
  role: "user" | "model" | string;
  parts: ChatPart[];
};

type ChatSession = {
  id: string;
  title: string;
  timestamp?: number;
};

type UserFileData = {
  maindata: {
    file: File;
    type: string;
    content: string;
  };
  filename: string;
  isImage: boolean;
  wholeData: string;
};

interface SanatanState {
  activeSessionId: string | null;
  typingIndex: number;
  displayOrNot: string;
  isDeepChat: boolean;
  progressInterval: string;
  userMessage: any;
  TypingInterval: ReturnType<typeof setInterval> | undefined;
  isGoogle: boolean;
  LastHeight: number;
  allowedExtensions: string | string[];
  userData: {
    message: any;
    files: UserFileData[];
  };
  canIEnd: boolean;
  userName: string | null;
  aiMemory: string[];
  chatSessions: ChatSession[];
  chatHistory: ChatMessage[];
  isSpeaking?: boolean;
}

interface Window {
  state: SanatanState;
  Create: any;
  askToDel?: () => void;
  changeEnter?: (event?: Event) => void;
  changeTheme?: (...args: any[]) => void;
  copy?: (text: string) => Promise<void>;
  createNewChat?: () => void;
  deleteMessage?: () => void;
  deleteSession?: (event: Event, id: string) => void;
  electronAPI?: any;
  generateBotResponse?: (wasError?: boolean) => Promise<void>;
  handleOutgoingMessage?: () => void;
  mermaid?: any;
  regenerateResponse?: (messageIndex: number) => Promise<void>;
  removeFile?: (filename: string) => void;
  send?: (text: string) => void;
  showMemoryManager?: () => void;
  showNotification?: (message: string, type?: "info" | "error" | "success") => void;
  speak?: (button: HTMLElement) => void;
  SpeechRecognition?: any;
  startRecognisation?: (button: HTMLElement) => void;
  stopWriting?: () => void;
  toggleEnhanceMenu?: () => void;
  webkitSpeechRecognition?: any;
  writeAnimate?: (...args: any[]) => void;
}

interface String {
  sanatantrim: string;
}

declare const google: any;
declare function speak(button: HTMLElement): void;
declare const Sanatan: any;

interface Element {
  [key: string]: any;
}

interface EventTarget {
  [key: string]: any;
}

interface Event {
  [key: string]: any;
}

declare let chatHistory: ChatMessage[];
declare let messageInput: HTMLTextAreaElement;
declare let chatBody: HTMLElement;
declare let activeSessionId: string | null;
