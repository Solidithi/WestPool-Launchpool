import { Decimal } from "@prisma/client/runtime/library";

export interface Project {
  id: string;
  projectName: string;
  projectOwnerAddress: string;
  verifiedTokenAddress: string;
  projectLogo: string;
  projectImage: string[];
  shortDescription: string;
  longDescription: string;
  acceptedVToken: string[];
  minStake: number;
  maxStake: number;
  fromDate: Date;
  toDate: Date;
  txHashCreated: string;
  projectStatus: string;
  chainName: string;
  poolBudget: number;
  targetStake: number;
  projectOwner: ProjectOwner;
  userId?: string;
  offers: Offer[];
  invested: InvestedProject[];
}

export interface User {
  id: string;
  userAddress: string;
  offers: UserOffer[];
  invested: InvestedProject[];
  ProjectOwner: ProjectOwner[];
  projects?: Project[];
  offerId?: string;
}

export interface ProjectOwner {
  id: string;
  userAddress: string;
  User: User;
  Project: Project[];
}

export interface Offer {
  id: string;
  pricePerToken: Decimal;
  amount: Decimal;
  collateral: Decimal;
  tokenPreTokenAddress: string;
  tokenCollateralAddress: string;
  offerType: OfferType;
  startDate: Date;
  filledTime: Date;
  creatorStatus: CreateOfferStatus;
  fillerStatus: FillerOfferStatus;
  creatorAddress: string;
  fillerAddress: string;
  projectId: string;
  project: Project;
  users: UserOffer[];
}

export interface UserOffer {
  userId: string;
  offerId: string;
  User: User;
  Offer: Offer;
}

export interface InvestedProject {
  userId: string;
  projectId: string;
  User: User;
  Project: Project;
}

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  address: string;

}


enum ProjectStatus {
  Upcoming,
  Ongoing,
  Completed,
}

enum CreateOfferStatus {
  Open,
  Pending,
  Settled,
  Canceled,
  CanceledWithdraw,
}

enum FillerOfferStatus {
  NotYet,
  Pending,
  Completed,
  Canceled,
  CanceledWithdraw,
}

enum OfferType {
  Buy,
  Sell,
}
