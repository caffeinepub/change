import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    principal: Principal;
    balance: bigint;
    joinDate: Time;
}
export interface Transaction {
    user: Principal;
    taskId: bigint;
    timestamp: Time;
    amount: bigint;
}
export interface backendInterface {
    addTask(description: string, reward: bigint): Promise<void>;
    completeTask(taskId: bigint): Promise<void>;
    getProfile(): Promise<UserProfile>;
    getTransactions(): Promise<Array<Transaction>>;
    registerUser(): Promise<void>;
}
