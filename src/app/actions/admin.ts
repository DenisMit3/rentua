'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Toggle user verification status
 */
export async function toggleUserVerification(userId: string, currentStatus: boolean) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isVerified: !currentStatus }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Error toggling user verification:', error);
        return { success: false, error: 'Failed to update user' };
    }
}

/**
 * Delete a user (Soft delete or hard delete depending on policy - here we simulate policy)
 */
export async function deleteUser(userId: string) {
    try {
        // In a real app, you might want to soft delete. 
        // For this admin panel, we'll just demonstrate the action.
        await prisma.user.delete({
            where: { id: userId }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}

/**
 * Update Listing Status (e.g. Reject or Approve)
 */
export async function updateListingStatus(listingId: string, status: any) {
    try {
        await prisma.listing.update({
            where: { id: listingId },
            data: { status }
        });

        revalidatePath('/admin/listings');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update listing' };
    }
}

/**
 * Update Booking Status
 */
export async function updateBookingStatus(bookingId: string, status: any, type: 'housing' | 'vehicle') {
    try {
        if (type === 'housing') {
            await prisma.booking.update({
                where: { id: bookingId },
                data: { status }
            });
            revalidatePath('/admin/bookings');
        } else {
            await prisma.vehicleBooking.update({
                where: { id: bookingId },
                data: { status }
            });
            revalidatePath('/admin/bookings');
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update booking' };
    }
}

/**
 * Delete a Listing
 */
export async function deleteListing(id: string) {
    try {
        await prisma.listing.delete({
            where: { id }
        });
        revalidatePath('/admin/listings');
        return { success: true };
    } catch (error) {
        console.error('Error deleting listing:', error);
        return { success: false, error: 'Failed to delete listing' };
    }
}

/**
 * Delete a Vehicle
 */
export async function deleteVehicle(id: string) {
    try {
        await prisma.vehicle.delete({
            where: { id }
        });
        revalidatePath('/admin/cars');
        return { success: true };
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        return { success: false, error: 'Failed to delete vehicle' };
    }
}
