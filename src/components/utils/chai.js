import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiJestSnapshot from "chai-jest-snapshot";

chai.use(chaiJestSnapshot);
chai.use(chaiEnzyme());
chaiJestSnapshot.resetSnapshotRegistry();

export const expect = chai.expect;
