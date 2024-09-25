# Shopify Personalization App

This Shopify app provides personalized product recommendations and descriptions based on user survey responses and genetic data.

## Features

- Seamless integration with Typeform for user surveys
- Secure handling of genetic data
- OpenAI-powered personalized product descriptions
- Dynamic product sorting based on personalization scores

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database
- Shopify Partner account
- OpenAI API key

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/shopify-personalization-app.git
   cd shopify-personalization-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your actual credentials and configuration.

4. Run the setup script:
   ```
   ./scripts/setup.sh
   ```

5. Start the development server:
   ```
   npm start
   ```

## Deployment

To deploy the app to DigitalOcean App Platform:

1. Ensure you have the DigitalOcean CLI (`doctl`) installed and authenticated.

2. Run the deployment script:
   ```
   ./scripts/deploy.sh
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.