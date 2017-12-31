export default interface ICategory {
    id: number;
    name: string;
    description: string;
    repos: number[];
    createdAt: string;
    createdTime: string;
    updatedAt: string;
    updatedTime: number;
};

export interface ICategoryCreateResult {
    category?: ICategory;
    success: boolean;
    error?: Error;
}
