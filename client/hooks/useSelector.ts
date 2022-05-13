import { TypedUseSelectorHook, useSelector } from "react-redux";
import StoreInterface from "@redux/ts/IStore";

export default <TypedUseSelectorHook<StoreInterface>>useSelector;
