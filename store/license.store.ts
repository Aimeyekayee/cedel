import { create } from "zustand";
import { ILicenseState, LicenseSlice } from "./slice/license.slice";

export const LicenseStore = create<ILicenseState>((...args) => ({
  ...LicenseSlice(...args),
}));
