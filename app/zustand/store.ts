import { create } from 'zustand';

type AvailableChainState = {
    chain: string;
    setChain: (chain: string) => void;
}

type VerifiedTokenState = {
    verifiedToken: string;
    setVerifiedToken: (verifiedToken: string) => void;
}

type ProjectBasisState = {
    chain: string;
    setChain: (value: string) => void;
    isTrading: string;
    setIsTrading: (value: string) => void;
    poolBudget: number;
    setPoolBudget: (value: number) => void;
    targetStake: number;
    setTargetStake: (value: number) => void;
    targetAudience: string;
    setTargetAudience: (value: string) => void;
}

type ProjectDetailState = {
    projectName: string;
    setProjectName: (value: string) => void;
    shortDescription: string;
    setShortDescription: (value: string) => void;
    longDescription: string;
    setLongDescription: (value: string) => void;
    maxStake: number | undefined;
    setMaxStake: (value: number | undefined) => void;
    minStake: number | undefined;
    setMinStake: (value: number | undefined) => void;
    acceptedVToken: string;
    setAcceptedVToken: (value: string) => void;
    fromDate: string;
    setFromDate: (value: string) => void;
    toDate: string;
    setToDate: (value: string) => void;
    projectImage: File | null;
    setProjectImage: (value: File | null) => void;
    projectLogo: File | null;
    setProjectLogo: (value: File | null) => void;
}

type CombinedState = {
    // Project Basis State
    chain: string;
    isTrading: string;
    poolBudget: number;
    targetStake: number;
    targetAudience: string;

    // Project Detail State
    projectName: string;
    shortDescription: string;
    longDescription: string;
    maxStake?: number;
    minStake?: number;
    acceptedVToken: string;
    fromDate: string;
    toDate: string;
    projectImage: File | null;
    projectLogo: File | null;

    // Create Offer State
    role: string;
    pricePerToken: number;
    amount: number;
    collateral: number;
    selectedNetwork: string;
    selectedToken: string;
    selectedCollateralToken: string;

    //Create Offer Setters
    setRole: (value: string) => void;
    setPricePerToken: (value: number) => void;
    setAmount: (value: number) => void;
    setCollateral: (value: number) => void;
    setSelectedNetwork: (value: string) => void;
    setSelectedToken: (value: string) => void;
    setSelectedCollateralToken: (value: string) => void;
    
};

type CombinedSetters = {
    [K in keyof CombinedState as `set${Capitalize<string & K>}`]: (value: CombinedState[K]) => void;
};

type CreateOfferState = {
    role: string;
    pricePerToken: number;
    amount: number;
    collateral: number;
    selectedNetwork: string;
    selectedToken: string;
    selectedCollateralToken: string;

    setRole: (value: string) => void;
    setPricePerToken: (value: number) => void;
    setAmount: (value: number) => void;
    setCollateral: (value: number) => void;
    setSelectedNetwork: (value: string) => void;
    setSelectedToken: (value: string) => void;
    setSelectedCollateralToken: (value: string) => void;
};


const useAvailableChain = create<AvailableChainState>((set) => ({
    chain: "",
    setChain: (chain: string) => set({ chain }),
}));

const useVerifiedToken = create((set) => ({
    verifiedToken: "",
    setVerifiedToken: (verifiedToken: string) => set({ verifiedToken }),
}))

const useProjectBasisStore = create<ProjectBasisState>((set) => ({
    chain: '',
    setChain: (value: string) => set({ chain: value }),
    isTrading: '',
    setIsTrading: (value: string) => set({ isTrading: value }),
    poolBudget: 0,
    setPoolBudget: (value: number) => set({ poolBudget: value }),
    targetStake: 0,
    setTargetStake: (value: number) => set({ targetStake: value }),
    targetAudience: '',
    setTargetAudience: (value: string) => set({ targetAudience: value }),
}));


const useProjectDetailStore = create<ProjectDetailState>((set) => ({
    projectName: "",
    setProjectName: (value) => set({ projectName: value }),
    shortDescription: "",
    setShortDescription: (value) => set({ shortDescription: value }),
    longDescription: "",
    setLongDescription: (value) => set({ longDescription: value }),
    maxStake: undefined,
    setMaxStake: (value) => set({ maxStake: value }),
    minStake: undefined,
    setMinStake: (value) => set({ minStake: value }),
    acceptedVToken: "",
    setAcceptedVToken: (value) => set({ acceptedVToken: value }),
    fromDate: "",
    setFromDate: (value) => set({ fromDate: value }),
    toDate: "",
    setToDate: (value) => set({ toDate: value }),
    projectImage: null,
    setProjectImage: (value) => set({ projectImage: value }),
    projectLogo: null,
    setProjectLogo: (value) => set({ projectLogo: value }),
}));

const useCombinedStore = create<CombinedState>((set) => ({
    // Initial State
    chain: "",
    isTrading: "",
    poolBudget: 0,
    targetStake: 0,
    targetAudience: "",
    projectName: "",
    shortDescription: "",
    longDescription: "",
    maxStake: undefined,
    minStake: undefined,
    acceptedVToken: "",
    fromDate: "",
    toDate: "",
    projectImage: null,
    projectLogo: null,
    // Create Offer State
    role: "buyer",
    pricePerToken: 0,
    amount: 0,
    collateral: 0,
    selectedNetwork: "Select Network",
    selectedToken: "Select Token",
    selectedCollateralToken: "Select Token",

    // Dynamic Setters
    setChain: (value: string) => set({ chain: value }),
    setIsTrading: (value: string) => set({ isTrading: value }),
    setPoolBudget: (value: number) => set({ poolBudget: value }),
    setTargetStake: (value: number) => set({ targetStake: value }),
    setTargetAudience: (value: string) => set({ targetAudience: value }),
    setProjectName: (value: string) => set({ projectName: value }),
    setShortDescription: (value: string) => set({ shortDescription: value }),
    setLongDescription: (value: string) => set({ longDescription: value }),
    setMaxStake: (value: number | undefined) => set({ maxStake: value }),
    setMinStake: (value: number | undefined) => set({ minStake: value }),
    setAcceptedVToken: (value: string) => set({ acceptedVToken: value }),
    setFromDate: (value: string) => set({ fromDate: value }),
    setToDate: (value: string) => set({ toDate: value }),
    setProjectImage: (value: File | null) => set({ projectImage: value }),
    setProjectLogo: (value: File | null) => set({ projectLogo: value }),
    // Create Offer Setters
    setRole: (value: string) => set({ role: value }),
    setPricePerToken: (value: number) => set({ pricePerToken: value }),
    setAmount: (value: number) => set({ amount: value }),
    setCollateral: (value: number) => set({ collateral: value }),
    setSelectedNetwork: (value: string) => set({ selectedNetwork: value }),
    setSelectedToken: (value: string) => set({ selectedToken: value }),
    setSelectedCollateralToken: (value: string) => set({ selectedCollateralToken: value }),
}));

const useCreateOfferStore = create<CreateOfferState>((set) => ({
    role: "buyer",
    pricePerToken: 0,
    amount: 0,
    collateral: 0,
    selectedNetwork: "Select Network",
    selectedToken: "Select Token",
    selectedCollateralToken: "Select Token",

    setRole: (value: string) => set({ role: value }),
    setPricePerToken: (value: number) => set({ pricePerToken: value }),
    setAmount: (value: number) => set({ amount: value }),
    setCollateral: (value: number) => set({ collateral: value }),
    setSelectedNetwork: (value: string) => set({ selectedNetwork: value }),
    setSelectedToken: (value: string) => set({ selectedToken: value }),
    setSelectedCollateralToken: (value: string) => set({ selectedCollateralToken: value }),
}));

export default useAvailableChain;
export { useVerifiedToken, useProjectBasisStore, useProjectDetailStore, useCombinedStore, useCreateOfferStore };
export type { AvailableChainState, VerifiedTokenState, ProjectBasisState, ProjectDetailState, CombinedState, CombinedSetters };