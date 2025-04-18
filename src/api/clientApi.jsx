export async function getClients() {
    try {
        const response = await fetch("https://localhost:7183/api/clients", {
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "MyPrivateKey123"
            }
        });
        if (!response.ok) throw new Error("Failed to fetch clients");
        return await response.json();
    } catch (error) {
        console.error("Error fetching clients:", error);
        return [];
    }
}
