const API_URL = "https://dsvarts-api25-epdghdb8grheecd0.swedencentral-01.azurewebsites.net/api/users";

export async function getUsers() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "MyPrivateKey123"
            }
        });
        if (!response.ok) throw new Error("Could not fetch users");
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
