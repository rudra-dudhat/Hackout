# SAGAR SAATHI Backend

## Overview

The SAGAR SAATHI backend is designed to support the coastal early warning and alerting system by providing APIs for risk assessment and notification services. This backend application is built using Node.js and Express, and it integrates with a risk assessment model and SMS notification service.

## Project Structure

```
sagar-saathi-backend/
├── src/
│   ├── app.js                  # Entry point of the application
│   ├── routes/                 # Contains route definitions
│   │   ├── risk.js             # Routes for risk assessment
│   │   └── notification.js      # Routes for sending notifications
│   ├── controllers/            # Contains request handling logic
│   │   ├── riskController.js    # Logic for risk assessment
│   │   └── notificationController.js # Logic for notifications
│   ├── models/                 # Contains data models
│   │   └── riskModel.js        # Risk assessment model
│   └── utils/                  # Utility functions
│       └── smsService.js       # SMS sending service
├── package.json                # NPM dependencies and scripts
├── .env                        # Environment variables
└── README.md                   # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sagar-saathi-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory and add your configuration settings, such as API keys for the SMS service.

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the API**
   - The backend will be running on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Risk Assessment

- **GET /api/risk**
  - Fetches the risk level based on input parameters.
  
### Notifications

- **POST /api/notification**
  - Sends an SMS notification to users without smartphones.

## Usage

- The backend is designed to work seamlessly with the SAGAR SAATHI frontend. Ensure that the frontend is configured to make requests to the correct backend endpoints.
- The risk assessment model can be integrated later to dynamically calculate risk levels based on real-time data.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.