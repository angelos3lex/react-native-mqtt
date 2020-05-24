export type QoS = 0 | 1 | 2;

export class IMqttClient {
	constructor(options: {
		clientId: string;
		uri: string;
		host?: string;
		port?: number;
		protocol?: 'mqtt' | 'tcp' | 'wss' | 'mqtts' | 'ws';
		tls?: boolean;
		keepalive?: number;	// seconds
		protocolLevel?: number;
		clean?: boolean;
		auth?: boolean;
		user?: string;	// only used when auth is true
		pass?: string;	// only used when auth is true
		will?: boolean;
		willMsg?: string;	// only used when will is true
		willtopic?: string;	// only used when will is true
		willQos?: QoS;	// only used when will is true
		willRetainFlag: boolean;	// only used when will is true
		automaticReconnect?: boolean;	// android only
	})
	on(event: 'closed', cb: (msg: string) => void): void
	on(event: 'error', cb: (msg: string) => void): void
	on(event: 'message', cb: (msg: {
		data: string;
		qos: QoS;
		retain: boolean;
		topic: string;
	}) => void): void
	on(event: 'connect', cb: (msg: { reconnect: boolean; }) => void): void
	connect(): void;
	disconnect(): void;
	subscribe(topic: string, qos: QoS): void;
	unsubscribe(topic: string): void;
	publish(topic: string, payload: string, qos: QoS, retain: boolean): void;
	reconnect(): void;
	isConnected(): Promise<boolean>;
}

declare namespace mqtt {
	function createClient(options: { uri: string, clientId?: string }): Promise<IMqttClient>;
	function removeClient(client: IMqttClient): void;
	function disconnectAll(): void;
}

export default mqtt;
