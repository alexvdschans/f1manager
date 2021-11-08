import TeamSetup from "./TeamSetup";
export default interface Team {
  id: number;
  name: string;
  setups?: TeamSetup[];
}
