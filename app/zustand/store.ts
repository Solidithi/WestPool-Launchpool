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

export default useAvailableChain;
export { useVerifiedToken, useProjectBasisStore, useProjectDetailStore };
export type { AvailableChainState, VerifiedTokenState, ProjectBasisState, ProjectDetailState };