const API_URL = "https://localhost:7183/api/status";

export async function getStatuses() {
    try {
        const res = await fetch(API_URL, {
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "MyPrivateKey123"
            }
        });
        if (!res.ok) throw new Error("Failed to fetch statuses");
        return await res.json();
    } catch (err) {
        console.error("Status fetch error:", err);
        return [];
    }
}
