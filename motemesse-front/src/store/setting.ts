import { create } from 'zustand';

interface ProfileFormData {
  name: string;
  age: string;
  hobby: string;
}

interface SettingState {
  maleFormData: ProfileFormData;
  femaleFormData: ProfileFormData;
  isSaving: boolean;
  
  setMaleFormData: (data: ProfileFormData) => void;
  setFemaleFormData: (data: ProfileFormData) => void;
  setIsSaving: (saving: boolean) => void;
  
  updateMaleField: (field: string, value: string) => void;
  updateFemaleField: (field: string, value: string) => void;
  
  resetFemaleForm: () => void;
  isUserAnalyzing: boolean;
  isFemaleAnalyzing: boolean;

  setIsUserAnalyzing: (analyzing: boolean) => void;
  setIsFemaleAnalyzing: (analyzing: boolean) => void;
}

const initialFormData: ProfileFormData = {
  name: '',
  age: '',
  hobby: '',
};

export const useSettingStore = create<SettingState>((set) => ({
  maleFormData: initialFormData,
  femaleFormData: initialFormData,
  isSaving: false,
  isUserAnalyzing: false,
  isFemaleAnalyzing: false,
  
  setMaleFormData: (data) => set({ maleFormData: data }),
  setFemaleFormData: (data) => set({ femaleFormData: data }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  
  updateMaleField: (field, value) => 
    set((state) => ({
      maleFormData: { ...state.maleFormData, [field]: value }
    })),
    
  updateFemaleField: (field, value) =>
    set((state) => ({
      femaleFormData: { ...state.femaleFormData, [field]: value }
    })),
    
  resetFemaleForm: () => set({ femaleFormData: initialFormData }),

  setIsUserAnalyzing: (analyzing) => set({ isUserAnalyzing: analyzing }),
  setIsFemaleAnalyzing: (analyzing) => set({ isFemaleAnalyzing: analyzing }),
}));