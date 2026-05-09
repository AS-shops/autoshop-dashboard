import axiosInstance from "./axios";

export interface Contract {
  _id?: string;
  id?: number;
  fullName: string;
  phoneNumber: string;
  position: string;
  businessName: string;
  signature?: string;
  agreed: boolean;
  plan: string;
  startDate: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContractData {
  fullName: string;
  phoneNumber: string;
  position: string;
  businessName: string;
  signature?: string;
  agreed: boolean;
  plan: string;
  startDate: string;
}

export const contractService = {
  // Get all contracts (requires authentication)
  getAll: async (): Promise<Contract[]> => {
    const response = await axiosInstance.get<Contract[]>("/contracts");
    return response.data;
  },

  // Get contract by ID (requires authentication)
  getById: async (id: string): Promise<Contract> => {
    const response = await axiosInstance.get<Contract>(`/contracts/${id}`);
    return response.data;
  },

  // Create new contract (public endpoint)
  create: async (
    data: CreateContractData,
  ): Promise<{ message: string; id: string; contract: Contract }> => {
    const response = await axiosInstance.post("/contracts", data);
    return response.data;
  },
};

export default axiosInstance;
