export default function formatSendDate(sendDate) {
    const date = new Date(sendDate);
    const formattedDate = date.toLocaleDateString('nl-NL');
    const formattedTime = date.toLocaleTimeString('nl-NL', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    return `${formattedDate} om ${formattedTime} uur`;
}

