import { readFileSync } from 'fs';
import { join } from 'path';

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../..', 'package.json'), 'utf-8')
);

export const ASCII = `
██╗███╗   ███╗██████╗  █████╗  ██████╗████████╗ ██████╗ 
██║████╗ ████║██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗
██║██╔████╔██║██████╔╝███████║██║        ██║   ██║   ██║
██║██║╚██╔╝██║██╔═══╝ ██╔══██║██║        ██║   ██║   ██║
██║██║ ╚═╝ ██║██║     ██║  ██║╚██████╗   ██║   ╚██████╔╝
╚═╝╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝                                                     
` as const;

export const META = {
  version: pkg.version,
  description: pkg.description,
};

export const SUPPORT_URL = 'https://zyphra.xyz/support' as const;

export const SPOTIFY_BASE_URL = "https://www.spotify.com"
