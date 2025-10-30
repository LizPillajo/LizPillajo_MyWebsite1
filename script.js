async function loadCharacter() {
    const nameC = document.getElementById("character-input").value.trim();

    if (!nameC) {
        alert("Please enter the name of a character.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/character?name=${encodeURIComponent(nameC)}`);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            alert("The character was not found. Try another name.");
            return;
        }

        const characters = data.data[0];

        document.getElementById("character-image1").src = characters.imageUrl || "placeholder.jpg";
        document.getElementById("character-name").textContent = characters.name;
        document.getElementById("character-films").textContent = `Films: ${characters.films.join(", ") || "Not available"}`;
        document.getElementById("character-shows").textContent = `Series: ${characters.tvShows.join(", ") || "Not available"}`;

        const tbody = document.querySelector("#characters-table tbody");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${tbody.children.length + 1}</td>
            <td>${characters.name}</td>
            <td>${characters.films.slice(0, 2).join(", ") || "N/A"}</td>        
        `;

        tbody.appendChild(row);

    } catch (error) {
        console.error("Error loading character...", error);
    }
}

function cleanResults() {
    document.getElementById("character-image1").src = "placeholder.jpg";
    document.getElementById("character-name").textContent = "Character name";
    document.getElementById("character-films").textContent = "Films: ";
    document.getElementById("character-shows").textContent = "Series: ";
    document.getElementById("character-input").value = "";
}

document.getElementById("search-character").addEventListener("click", loadCharacter);
document.getElementById("clear-info").addEventListener("click", cleanResults);   