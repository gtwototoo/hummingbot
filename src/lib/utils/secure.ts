import { SESSION_EXPIRATION_TIME } from '../../constants';

interface Session {
	id: string;
	secretHash: Uint8Array;
	createdAt: Date;
}

interface SessionWithToken extends Session {
	token: string;
}

const generateSecureRandomString = (): string => {
	const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789';
	const bytes = new Uint8Array(24);
	let id = '';

	crypto.getRandomValues(bytes);

	for (let i = 0; i < bytes.length; i++) {
		id += alphabet[bytes[i] >> 3];
	}

	return id;
};

const hashSecret = async (secret: string): Promise<Uint8Array> => {
	const secretBytes = new TextEncoder().encode(secret);
	const secretHashBuffer = await crypto.subtle.digest('SHA-256', secretBytes);
	return new Uint8Array(secretHashBuffer);
};

const constantTimeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i] ^ b[i];
	}
	return c === 0;
};

const deleteSession = async (sessionId: string): Promise<void> => {
	// db
};

const getSession = async (sessionId: string): Promise<Session | null> => {
	const now = new Date();
	const session: Session | null = {
		id: sessionId,
		secretHash: new Uint8Array(24),
		createdAt: new Date()
	};

	//db

	if (!session) {
		return null;
	}

	if (now.getTime() - session.createdAt.getTime() >= SESSION_EXPIRATION_TIME * 1000) {
		await deleteSession(sessionId);
		return null;
	}

	return session;
};

export const validateSessionToken = async (token: string): Promise<Session | null> => {
	const tokenParts = token.split('.');
	if (tokenParts.length !== 2) {
		return null;
	}
	const sessionId = tokenParts[0];
	const sessionSecret = tokenParts[1];

	const session = await getSession(sessionId);

	if (!session) {
		return null;
	}

	const tokenSecretHash = await hashSecret(sessionSecret);
	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);

	if (!validSecret) {
		return null;
	}

	return session;
};

export const createSession = async (): Promise<SessionWithToken> => {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secretHash = await hashSecret(secret);

	const token = id + '.' + secret;

	const session: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		token
	};

	// db

	return session;
};
