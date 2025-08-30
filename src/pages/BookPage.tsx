import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type BookFields, bookSchema } from "../api/book.ts";
import { Button } from "../components/ui/button.tsx";
import { Label } from "../components/ui/label.tsx";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { cn } from "../lib/utils.ts";
import { useState } from "react";

export default function BookPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookFields>({
        resolver: zodResolver(bookSchema),
    });

    const onSubmit = async (data: BookFields) => {
        setIsSubmitting(true);
        try {
            // Here you would call your createBook API function
            // For example: await createBook(data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Book created successfully");
            reset();
            navigate("/books"); // Redirect to books list
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Book creation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Book</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Fill in the details below to add a new book to the library.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
                {/* Basic Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Basic Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title" className="mb-2 block text-sm font-medium">
                                Title *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.title && "border-red-500"
                                )}
                                id="title"
                                placeholder="Enter book title"
                                {...register("title")}
                                disabled={isSubmitting}
                            />
                            {errors.title && (
                                <div className="text-red-500 text-sm mt-1">{errors.title.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="author" className="mb-2 block text-sm font-medium">
                                Author *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.author && "border-red-500"
                                )}
                                id="author"
                                placeholder="Enter author name"
                                {...register("author")}
                                disabled={isSubmitting}
                            />
                            {errors.author && (
                                <div className="text-red-500 text-sm mt-1">{errors.author.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="isbn" className="mb-2 block text-sm font-medium">
                                ISBN *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.isbn && "border-red-500"
                                )}
                                id="isbn"
                                placeholder="Enter ISBN number"
                                {...register("isbn")}
                                disabled={isSubmitting}
                            />
                            {errors.isbn && (
                                <div className="text-red-500 text-sm mt-1">{errors.isbn.message}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Publication Details Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Publication Details
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="publishedDate" className="mb-2 block text-sm font-medium">
                                Published Date *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.publishedDate && "border-red-500"
                                )}
                                id="publishedDate"
                                type="date"
                                {...register("publishedDate")}
                                disabled={isSubmitting}
                            />
                            {errors.publishedDate && (
                                <div className="text-red-500 text-sm mt-1">{errors.publishedDate.message}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Inventory Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Inventory Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                                Total Quantity *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.quantity && "border-red-500"
                                )}
                                id="quantity"
                                type="number"
                                min="0"
                                placeholder="0"
                                {...register("quantity", { valueAsNumber: true })}
                                disabled={isSubmitting}
                            />
                            {errors.quantity && (
                                <div className="text-red-500 text-sm mt-1">{errors.quantity.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="availability" className="mb-2 block text-sm font-medium">
                                Available Copies *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.availability && "border-red-500"
                                )}
                                id="availability"
                                type="number"
                                min="0"
                                placeholder="0"
                                {...register("availability", { valueAsNumber: true })}
                                disabled={isSubmitting}
                            />
                            {errors.availability && (
                                <div className="text-red-500 text-sm mt-1">{errors.availability.message}</div>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Note: Available copies cannot exceed total quantity.
                    </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Adding Book..." : "Add Book"}
                    </Button>
                </div>
            </form>
        </div>
    );
}