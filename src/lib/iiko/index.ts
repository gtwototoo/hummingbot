import axios, { AxiosError, type AxiosInstance } from "axios";

interface IikoError {
    errorCode: string;
    errorDescription: string;
}

class IikoClient {
    private address: string = "https://api-ru.iiko.services";
    private login: string;
    private token: string | null = null;
    private client: AxiosInstance | null = null;

    constructor(login: string) {
        this.login = login;
    }

    private async connect(): Promise<void> {
        try {
            const response = await axios.post(`${this.address}/api/1/access_token`, {
                apiLogin: this.login
            });

            if (!response.data?.token) {
                throw new Error("No token received from iiko API");
            }

            this.token = response.data.token;
            console.log("New token:", this.token);

            this.client = axios.create({
                baseURL: `${this.address}/api/2/`,
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*"
                }
            });
        } catch (err) {
            throw new Error(`Connection error: ${err}`);
        }
    }

    public async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        endpoint: string,
        query: string = "",
        options?: Record<string, unknown>,
        retry: boolean = true
    ): Promise<T> {
        if (!this.client || !this.token) {
            await this.connect();
            return this.request<T>(method, endpoint, query, options, false);
        }

        try {
            const url = `${endpoint}${query ? `?${query}` : ""}`;
            console.log("Request:", method, url, options);

            const response = await this.client.request<T>({
                method,
                url,
                data: method !== "GET" ? options : undefined
            });

            return response.data;
        } catch (err) {
            const error = err as AxiosError<IikoError>;

            if (error.response?.status === 401 && retry) {
                await this.connect();
                return this.request<T>(method, endpoint, query, options, false);
            }

            const msg =
                error.response?.data?.errorDescription ||
                error.response?.statusText ||
                error.message;
            throw new Error(`Request failed: ${msg}`);
        }
    }

    public async get<T>(endpoint: string, query: string = ""): Promise<T> {
        return this.request<T>("GET", endpoint, query);
    }

    public async post<T>(endpoint: string, options?: Record<string, unknown>, query: string = ""): Promise<T> {
        return this.request<T>("POST", endpoint, query, options);
    }
}

export default IikoClient;