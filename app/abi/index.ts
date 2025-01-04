import PoolFactory from './PoolFactory.json';
import MockVDot from './MockVDot.json';
import Pool from './Pool.json';
import MockProjectToken from './MockProjectToken.json';
import BifrostEarningMock from './BifrostEarningMock.json';
import Market from './Market.json';




const PoolFactoryABI = PoolFactory.abi;
const MockVAssetABI = MockVDot.abi;
const PoolABI = Pool.abi;
const MockProjectTokenABI = MockProjectToken.abi;
const BifrostEarningMockABI = BifrostEarningMock.abi;
const MarketABI = Market.abi;


export {
  PoolFactoryABI,
  MockVAssetABI,
  PoolABI,
  MockProjectTokenABI,
  BifrostEarningMockABI,
  MarketABI
};