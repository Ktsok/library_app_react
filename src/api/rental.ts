import { z } from "zod";

// Zod Schema
export const rentalSchema = z.object({
    user: z.string()
        .min(1, "User is required")
        .max(50, "User must be less than 50 characters")
        .transform((val) => val.trim().toLowerCase()),

    title: z.string()
        .min(1, "Title is required")
        .max(30, "Title must be less than 30 characters")
        .transform((val) => val.trim().toLowerCase()),

    rentalTo: z.string()
        .min(1, "Rental to date is required")
        .max(20, "Rental to must be less than 20 characters"),

    rentalFrom: z.string()
        .min(1, "Rental from date is required"),
});

// Type for creating a rental
export type RentalFields = z.infer<typeof rentalSchema>;

// Type for API responses
export interface Rental {
    _id?: string;
    id?: string;
    user: string;
    title: string;
    rentalTo: string;
    rentalFrom: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RentalResponse {
    message?: string;
    data?: Rental;
}

// API Functions

export async function createRental(rentalData: RentalFields): Promise<RentalResponse> {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/rentals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(rentalData),
    });

    if (!res.ok) {
        let detail = "Create rental failed.";
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

export async function findAllRentals(): Promise<Rental[]> {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/rentals", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch rentals failed.";
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

export async function findRentalById(rentalId: string): Promise<Rental> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/rentals/${rentalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch rental failed.";
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

export async function findRentalsByUser(userId: string): Promise<Rental[]> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/rentals/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch user rentals failed.";
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

export async function findRentalsByBook(title: string): Promise<Rental[]> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/rentals/book/${encodeURIComponent(title)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch book rentals failed.";
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

export async function updateRental(rentalId: string, rentalData: Partial<RentalFields>): Promise<Rental> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/rentals/${rentalId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(rentalData),
    });

    if (!res.ok) {
        let detail = "Update rental failed.";
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

export async function deleteRental(rentalId: string): Promise<{ message: string }> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/rentals/${rentalId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Delete rental failed.";
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

// Optional: Check if a book is currently rented
export async function checkBookAvailability(title: string): Promise<{ available: boolean; rentals: Rental[] }> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/rentals/availability/${encodeURIComponent(title)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Check availability failed.";
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