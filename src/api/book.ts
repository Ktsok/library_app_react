import { z } from "zod";

// Zod Schema
export const bookSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(50, "Title must be less than 50 characters")
        .transform((val) => val.trim().toLowerCase()),

    author: z.string()
        .min(1, "Author is required")
        .max(30, "Author must be less than 30 characters")
        .transform((val) => val.trim().toLowerCase()),

    isbn: z.string()
        .min(1, "ISBN is required")
        .max(20, "ISBN must be less than 20 characters"),

    publishedDate: z.string()
        .min(1, "Published date is required")
        .or(z.date()) // Allow both string and Date types
        .transform((val) => new Date(val)), // Convert to Date object

    quantity: z.number()
        .min(0, "Quantity must be a positive number")
        .int("Quantity must be an integer"),

    availability: z.number()
        .min(0, "Availability must be a positive number")
        .int("Availability must be an integer"),
});

// Type for creating a book
export type BookFields = z.infer<typeof bookSchema>;

// Type for API responses
export interface Book {
    _id?: string;
    id?: string;
    title: string;
    author: string;
    isbn: string;
    publishedDate: string | Date;
    quantity: number;
    availability: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface BookResponse {
    message?: string;
    data?: Book;
}

// API Functions

export async function createBook(bookData: BookFields): Promise<BookResponse> {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookData),
    });

    if (!res.ok) {
        let detail = "Create book failed.";
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

export async function findAllBooks(): Promise<Book[]> {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch books failed.";
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

export async function findBookById(bookId: string): Promise<Book> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/books/${bookId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Fetch book failed.";
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

export async function updateBook(bookId: string, bookData: Partial<BookFields>): Promise<Book> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/books/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookData),
    });

    if (!res.ok) {
        let detail = "Update book failed.";
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

export async function deleteBook(bookId: string): Promise<{ message: string }> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!res.ok) {
        let detail = "Delete book failed.";
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