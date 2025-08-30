import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserFields, userSchema } from "../api/user.ts";
import { Button } from "../components/ui/button.tsx";
import { Label } from "../components/ui/label.tsx";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { cn } from "../lib/utils.ts";
import { useState } from "react";

export default function UserPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFields>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: UserFields) => {
        setIsSubmitting(true);
        try {
            // Here you would call your createUser API function
            // For example: await createUser(data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("User created successfully");
            reset();
            navigate("/users"); // or wherever you want to redirect after creation
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "User creation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New User</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Fill in the details below to create a new user account.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
                {/* Personal Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="mb-2 block text-sm font-medium">
                                First Name *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.name && "border-red-500"
                                )}
                                id="name"
                                placeholder="Enter first name"
                                {...register("name")}
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="surname" className="mb-2 block text-sm font-medium">
                                Last Name *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.surname && "border-red-500"
                                )}
                                id="surname"
                                placeholder="Enter last name"
                                {...register("surname")}
                                disabled={isSubmitting}
                            />
                            {errors.surname && (
                                <div className="text-red-500 text-sm mt-1">{errors.surname.message}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Account Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Account Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="username" className="mb-2 block text-sm font-medium">
                                Username *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.username && "border-red-500"
                                )}
                                id="username"
                                placeholder="Enter username"
                                {...register("username")}
                                disabled={isSubmitting}
                            />
                            {errors.username && (
                                <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                                Email *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.email && "border-red-500"
                                )}
                                id="email"
                                type="email"
                                placeholder="Enter email address"
                                {...register("email")}
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password" className="mb-2 block text-sm font-medium">
                                Password *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.password && "border-red-500"
                                )}
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                {...register("password")}
                                disabled={isSubmitting}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Address Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Address Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="address.area" className="mb-2 block text-sm font-medium">
                                Area *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.address?.area && "border-red-500"
                                )}
                                id="address.area"
                                placeholder="Enter area"
                                {...register("address.area")}
                                disabled={isSubmitting}
                            />
                            {errors.address?.area && (
                                <div className="text-red-500 text-sm mt-1">{errors.address.area.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="address.road" className="mb-2 block text-sm font-medium">
                                Road *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.address?.road && "border-red-500"
                                )}
                                id="address.road"
                                placeholder="Enter road"
                                {...register("address.road")}
                                disabled={isSubmitting}
                            />
                            {errors.address?.road && (
                                <div className="text-red-500 text-sm mt-1">{errors.address.road.message}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Phone Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Phone Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone.type" className="mb-2 block text-sm font-medium">
                                Phone Type *
                            </Label>
                            <select
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.phone?.type && "border-red-500"
                                )}
                                id="phone.type"
                                {...register("phone.type")}
                                disabled={isSubmitting}
                            >
                                <option value="">Select phone type</option>
                                <option value="mobile">Mobile</option>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                            </select>
                            {errors.phone?.type && (
                                <div className="text-red-500 text-sm mt-1">{errors.phone.type.message}</div>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="phone.number" className="mb-2 block text-sm font-medium">
                                Phone Number *
                            </Label>
                            <input
                                className={cn(
                                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    errors.phone?.number && "border-red-500"
                                )}
                                id="phone.number"
                                placeholder="Enter phone number"
                                {...register("phone.number")}
                                disabled={isSubmitting}
                            />
                            {errors.phone?.number && (
                                <div className="text-red-500 text-sm mt-1">{errors.phone.number.message}</div>
                            )}
                        </div>
                    </div>
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
                        {isSubmitting ? "Creating User..." : "Create User"}
                    </Button>
                </div>
            </form>
        </div>
    );
}