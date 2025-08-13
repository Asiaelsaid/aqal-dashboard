// Environment configuration
interface Config {
  API_BASE_URL: string;
  REFRESH_TOKEN_URL: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const config: Config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://aqalmanagementsolutions.com/api",
  REFRESH_TOKEN_URL: import.meta.env.VITE_REFRESH_TOKEN_URL || "http://13.50.122.77/api/users/token/refresh/",
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

// Debug logging in development
if (config.isDevelopment) {
  console.log('🚀 App running in development mode');
  console.log('📡 API Base URL:', config.API_BASE_URL);
  console.log('🔄 Refresh Token URL:', config.REFRESH_TOKEN_URL);
}

export default config;
