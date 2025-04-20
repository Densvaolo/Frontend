const API_KEY = "MyPrivateKey123";
const API_URL = "https://dsvarts-api25-epdghdb8grheecd0.swedencentral-01.azurewebsites.net/api/projects";

export async function getProjects() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": API_KEY
            }
        });

        if (!response.ok) throw new Error("Something went wrong when fetching your project");
        return await response.json();
    } catch (error) {
        console.error("Wrong while fetch:", error);
        return [];
    }
}

export async function addProject(project) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_KEY
        },
        body: JSON.stringify(project)
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return { success: true };
}

export async function updateProject(id, updatedProject) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_KEY
        },
        body: JSON.stringify(updatedProject)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to update: " + errorText);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return { success: true };
}

export async function deleteProject(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_KEY
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to delete: " + errorText);
    }

    return { success: true };
}
