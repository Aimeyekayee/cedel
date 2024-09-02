import { StateCreator } from "zustand";



export interface LicenseType {
  id: number;
  license_type_id: number;
  license_name: string;
}

export interface LicenseData {
  id: number;
  user_uuid: string;
  license_type_id: number;
  expiry_date: Date;
  image_url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILicenseState {
  license_type: LicenseType[];
  license_data: LicenseData[];

  setLicenseType: (newDataArray: LicenseType[]) => void;
  setLicenseData: (newDataArray: LicenseData[]) => void;
}

export const LicenseSlice: StateCreator<ILicenseState> = (set) => ({
  license_data: [],
  license_type: [],
  setLicenseType(newDataArray) {
    set({ license_type: newDataArray });
  },
  setLicenseData(newDataArray) {
    set({ license_data: newDataArray });
  },
});
