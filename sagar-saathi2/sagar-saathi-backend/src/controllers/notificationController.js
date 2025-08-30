class NotificationController {
    constructor(smsService) {
        this.smsService = smsService;
    }

    async sendNotification(req, res) {
        const { phoneNumber, message } = req.body;

        if (!phoneNumber || !message) {
            return res.status(400).json({ error: 'Phone number and message are required' });
        }

        try {
            const response = await this.smsService.sendSMS(phoneNumber, message);
            return res.status(200).json({ success: true, response });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send notification', details: error.message });
        }
    }
}

export default NotificationController;