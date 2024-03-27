import { makeVar } from "@apollo/client";

const myAdressLocationMapState = {
  lat: 0,
  lng: 0,
  address: "",
};

const myAdressLocationMap = makeVar(myAdressLocationMapState);

const LocalData = {
  myAdressLocationMap,
};

export function ResetLocalDataState() {
  LocalData.myAdressLocationMap(myAdressLocationMapState);
}
export default LocalData;
