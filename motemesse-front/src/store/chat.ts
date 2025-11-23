import { create } from 'zustand';

interface Reply {
  id: number;
  text: string;
}

interface ReplyCandidate extends Reply {
  isEditing?: boolean;
  editText?: string;
}

interface Conversation {
  id: number;
  femaleMessage: string;
  maleReply: string;
  createdAt: string;
  target: {
    name: string;
  };
}

interface ChatState {
  message: string;
  replyCandidates: ReplyCandidate[];
  conversations: Conversation[];
  isLoading: boolean;
  isGeneratingInitial: boolean;
  isLoadingConversations: boolean;
  error: string | null;
  showCandidates: boolean;
  currentFemaleMessage: string;
  showIntentOptions: boolean;
  isUploadingScreenshot: boolean;
  essentialChatUpdate: boolean;
  currentSlideIndex: number;
  hasGeneratedOnce: boolean;
  isRegenerating: boolean;

  setMessage: (message: string) => void;
  setReplyCandidates: (candidates: ReplyCandidate[]) => void;
  setConversations: (conversations: Conversation[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsGeneratingInitial: (isGenerating: boolean) => void;
  setIsLoadingConversations: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setShowCandidates: (show: boolean) => void;
  setCurrentFemaleMessage: (message: string) => void;
  setShowIntentOptions: (show: boolean) => void;
  setIsUploadingScreenshot: (isUploading: boolean) => void;
  setEssentialChatUpdate: (essentialChatUpdate: boolean) => void;
  setCurrentSlideIndex: (index: number) => void;
  setHasGeneratedOnce: (hasGenerated: boolean) => void;
  setIsRegenerating: (isRegenerating: boolean) => void;

  updateReplyCandidate: (id: number, updates: Partial<ReplyCandidate>) => void;
  resetChatState: () => void;
  addConversation: (conversation: Conversation) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  message: '',
  replyCandidates: [],
  conversations: [],
  isLoading: false,
  isGeneratingInitial: false,
  isLoadingConversations: false,
  error: null,
  showCandidates: false,
  currentFemaleMessage: '',
  showIntentOptions: false,
  isUploadingScreenshot: false,
  essentialChatUpdate: true,
  currentSlideIndex: 0,
  hasGeneratedOnce: false,
  isRegenerating: false,

  setMessage: (message) => set({ message }),
  setReplyCandidates: (candidates) => set({ replyCandidates: candidates }),
  setConversations: (conversations) => set({ conversations }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsGeneratingInitial: (isGenerating) => set({ isGeneratingInitial: isGenerating }),
  setIsLoadingConversations: (isLoading) => set({ isLoadingConversations: isLoading }),
  setError: (error) => set({ error }),
  setShowCandidates: (show) => set({ showCandidates: show }),
  setCurrentFemaleMessage: (message) => set({ currentFemaleMessage: message }),
  setShowIntentOptions: (show) => set({ showIntentOptions: show }),
  setIsUploadingScreenshot: (isUploading) => set({ isUploadingScreenshot: isUploading }),
  setEssentialChatUpdate: (essentialChatUpdate) => set({ essentialChatUpdate: essentialChatUpdate }),
  setHasGeneratedOnce: (hasGenerated) => set({ hasGeneratedOnce: hasGenerated }),
  setIsRegenerating: (isRegenerating) => set({ isRegenerating: isRegenerating }),

  updateReplyCandidate: (id, updates) =>
    set((state) => ({
      replyCandidates: state.replyCandidates.map(candidate =>
        candidate.id === id ? { ...candidate, ...updates } : candidate
      )
    })),

  resetChatState: () =>
    set({
      showCandidates: false,
      replyCandidates: [],
      message: '',
      error: null,
      currentFemaleMessage: '',
      showIntentOptions: false,
      hasGeneratedOnce: false,
      isRegenerating: false
  }),

  addConversation: (conversation: Conversation) => {
    set((state) => ({
      conversations: [...state.conversations, conversation]
    }));
  },

  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),

}));