import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RentalFields, rentalSchema } from "../api/rental.ts";
import { Button } from "../components/ui/button.tsx";
import { Label } from "../components/ui/label.tsx";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { cn } from "../lib/utils.ts";
import { useState, useEffect } from "react";

export default function RentalPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [users, setUsers] = useState<string[]>([]);
    const [books, setBooks] = useState<string[]>([]);

    // Mock data - replace with actual API calls
    useEffect(() => {
        // Simulate fetching users and books
        setUsers(["john_doe", "jane_smith", "bob_wilson", "sarah_jones"]);
        setBooks(["the great gatsby", "to kill a mockingbird", "1984", "pride and prejudice"]);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<RentalFields>({
        resolver: zodResolver(rentalSchema),
    });

    const watchedUser = watch("user");
    const watchedTitle = watch("title");

    const onSubmit = async (data: RentalFields) => {
        setIsSubmitting(true);
        try {
            // Here you would call your createRental API function
            // For example: await createRental(data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Rental created successfully");
            reset();
            navigate("/rentals"); // Redirect to rentals list
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Rental creation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Rental</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Fill in the details below to create a new book rental.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
                {/* Rental Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Rental Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="user" className="mb-2 block text-sm font-medium">
                                User *
                            </Label>
                            <select
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.user && "border-red-500"
                                )}
                                id="user"
                                {...register("user")}
                                disabled={isSubmitting}
                            >
                                <option value="">Select a user</option>
                                {users.map((user) => (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                ))}
                            </select>
                            {errors.user && (
                                <div className="text-red-500 text-sm mt-1">{errors.user.message}</div>
                            )}
                            {watchedUser && (
                                <div className="text-sm text-green-600 mt-1">
                                    Selected user: <strong>{watchedUser}</strong>
                                </div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="title" className="mb-2 block text-sm font-medium">
                                Book Title *
                            </Label>
                            <select
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.title && "border-red-500"
                                )}
                                id="title"
                                {...register("title")}
                                disabled={isSubmitting}
                            >
                                <option value="">Select a book</option>
                                {books.map((book) => (
                                    <option key={book} value={book}>
                                        {book}
                                    </option>
                                ))}
                            </select>
                            {errors.title && (
                                <div className="text-red-500 text-sm mt-1">{errors.title.message}</div>
                            )}
                            {watchedTitle && (
                                <div className="text-sm text-green-600 mt-1">
                                    Selected book: <strong>{watchedTitle}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Rental Period Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Rental Period
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="rentalFrom" className="mb-2 block text-sm font-medium">
                                Rental From *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.rentalFrom && "border-red-500"
                                )}
                                id="rentalFrom"
                                type="date"
                                {...register("rentalFrom")}
                                disabled={isSubmitting}
                            />
                            {errors.rentalFrom && (
                                <div className="text-red-500 text-sm mt-1">{errors.rentalFrom.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="rentalTo" className="mb-2 block text-sm font-medium">
                                Rental To *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.rentalTo && "border-red-500"
                                )}
                                id="rentalTo"
                                type="date"
                                {...register("rentalTo")}
                                disabled={isSubmitting}
                            />
                            {errors.rentalTo && (
                                <div className="text-red-500 text-sm mt-1">{errors.rentalTo.message}</div>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Select the rental period. The return date should be after the rental start date.
                    </p>
                </div>

                {/* Rental Summary */}
                {(watchedUser || watchedTitle) && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            Rental Summary
                        </h3>
                        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            {watchedUser && <p>User: <strong>{watchedUser}</strong></p>}
                            {watchedTitle && <p>Book: <strong>{watchedTitle}</strong></p>}
                            {watch("rentalFrom") && (
                                <p>Rental From: <strong>{watch("rentalFrom")}</strong></p>
                            )}
                            {watch("rentalTo") && (
                                <p>Rental To: <strong>{watch("rentalTo")}</strong></p>
                            )}
                        </div>
                    </div>
                )}

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
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? "Creating Rental..." : "Create Rental"}
                    </Button>
                </div>
            </form>
        </div>
    );
}