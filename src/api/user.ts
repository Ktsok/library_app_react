import { z } from "zod";

export const addressSchema = z.object({
    area: z.string().min(1, "Area is required"),
    road: z.string().min(1, "Road is required"),
});

export const phoneSchema = z.object({
    type: z.string().min(1, "Phone is required"),
    number: z.string().min(1, "Number is required"),
})

export const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    email: z.string().min(1, "Email is required"),
    address: addressSchema,
    phone: phoneSchema,

});


export type UserFields = z.infer<typeof userSchema>;

export type UserResponse = {
    access_token: string;
    token_type: string;
};

export async function createUser(userData: UserFields): Promise<UserResponse> {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData), // Send the actual object, not converted form data
    });

    if (!res.ok) {
        let detail = "Create user failed.";
        try {
            const data = await res.json();
            if (typeof data?.detail == "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }
    return await res.json();
}

export interface User {
    _id?: string;
    id?: string;
    username: string;
    password?: string; // Optional for responses
    name: string;
    surname: string;
    email: string;
    address?: {
        area: string;
        road: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export async function findAllUsers(): Promise<User[]> {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/auth/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Add authentication token if needed
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch users failed.";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }

    return await res.json();
}


export async function findUserById(userId: string): Promise<User> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/auth/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch user failed.";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }

    return await res.json();
}

export async function deleteUser(userId: string): Promise<{ message: string }> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Delete user failed.";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }

    return await res.json();
}

export async function updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/auth/users/${userId}`, {
        method: "PUT", // or "PATCH" depending on your API
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        let detail = "Update user failed.";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }

    return await res.json();
}
