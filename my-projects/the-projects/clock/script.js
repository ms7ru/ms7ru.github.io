let lastTime = null;

async function updateTime() {
    try {
        // Fetch time for Asia/Kolkata timezone
        const response = await fetch('https://api.api-ninjas.com/v1/worldtime?timezone=Asia/Kolkata', {
            headers: { 'X-Api-Key': '2eEzI79cHATEpMoUB9xKwKW76R7DSPowWDAHC34l' }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch time data: ${errorText}`);
        }

        const data = await response.json();

        console.log('API Response:', data); // Debugging: Check API response structure

        // Parse the datetime from the API response
        const [datePart, timePart] = data.datetime.split(" ");
        lastTime = new Date(`${datePart}T${timePart}+05:30`);

        // Update the date and clock immediately
        updateDate(data);
        displayTime();

        // Start a local clock that updates every second
        setInterval(() => {
            lastTime.setSeconds(lastTime.getSeconds() + 1);
            displayTime();
        }, 1000);
    } catch (error) {
        console.error('Error fetching time:', error);
    }
}

function updateDate(data) {
    const { year, month, day, day_of_week } = data;

    // Format the date
    const dateString = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    const dayName = day_of_week;

    document.getElementById('date').textContent = `${dateString} (${dayName})`;
}

function displayTime() {
    if (lastTime) {
        document.getElementById('clock').textContent = lastTime.toLocaleTimeString('en-US', { hour12: true });
    }
}

// Initialize on page load
window.onload = updateTime;