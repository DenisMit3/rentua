export async function sendTelegramNotification(message: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID; // ID чата с Анной

    if (!token || !chatId) {
        console.warn('Telegram token or chat ID not set. Notification skipped.');
        console.log('Message:', message);
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            console.error('Failed to send Telegram notification:', await response.text());
        }
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}
