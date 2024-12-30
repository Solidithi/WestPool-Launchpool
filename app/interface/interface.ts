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

interface ProjectOwner {
  id: string;
  userAddress: string;
  User: User;
  Project: Project[];
}

interface Offer {
  id: string;
  pricePerToken: Decimal;
  amount: number;
  collateral: number;
  tokenImagePreToken: string;
  tokenImageCollateral: string;
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

interface UserOffer {
  userId: string;
  offerId: string;
  User: User;
  Offer: Offer;
}

interface InvestedProject {
  userId: string;
  projectId: string;
  User: User;
  Project: Project;
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
