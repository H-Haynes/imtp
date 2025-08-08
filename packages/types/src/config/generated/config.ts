// 从配置文件自动生成的类型
export interface AppConfig {
  env: 'development' | 'production' | 'test';
  debug: boolean;
  port: number;
  host: string;
  database: {
    url: string;
    name: string;
  };
  redis: {
    url: string;
    host: string;
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
}
