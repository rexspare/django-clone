//api/data.ts
import { callUsers } from "../../lib/db";

export async function fetchUsers() {

    try {
        const response = await callUsers("SELECT * FROM users", []);
        const data = JSON.stringify(response);
        return data;
    }

    catch (error) {
        console.log(error);
        throw new Error("Failed to fetch revenue data.");
    }

}

export async function addUser(email: string, password: string) {
    try {
        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
        const data = [email, password];
        const response = await callUsers(query, data);
        if (response.success == true) {
            return response;
        } else {
            return response;
        }

    } catch (error) {
        return error;
    }
}

// Function to login a user
export async function loginUser(email: string, password: string) {
    try {
        // Fetch the user record by email
        const query = "SELECT * FROM users WHERE email = ?";
        const response = await callUsers(query, [email]);
        if (response.success == true) {
            const users: any = response.result

            if (users?.length == 0) {
                return { success: false, message: "Email not found." };
            }

            const user = users[0];
            if (user?.password == password) {
                return { success: true, user };
            } else {
                return { success: false, message: "Invalid password." };
            }

        }
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, message: "Failed to log in user." };
    }
}