/* eslint-disable no-console */
import { execa } from "execa";
import fs from "node:fs";
import { join } from "path";

const ROOT_PATH = process.cwd();
const DIST_FOLDER = join(ROOT_PATH, "./dist");
const NFT_APP_PATH = "/nft/";
const COUNTER_APP_PATH = "/counter/";
const AIRDROP_APP_PATH = "/airdrop/";

function setEnvVar(key, value) {
    process.env[key] = process.env[key] || value;
}

// We need to set a path to the build and a url for each frontend
export function setEnv() {
    // Website urls
    setEnvVar("NFT_BASE_URL", NFT_APP_PATH);
    setEnvVar("COUNTER_BASE_URL", COUNTER_APP_PATH);
    setEnvVar("AIRDROP_BASE_URL", AIRDROP_APP_PATH);

    // Dist folders
    setEnvVar("NFT_DIST", join(DIST_FOLDER, NFT_APP_PATH));
    setEnvVar("COUNTER_DIST", join(DIST_FOLDER, COUNTER_APP_PATH));
    setEnvVar("AIRDROP_DIST", join(DIST_FOLDER, AIRDROP_APP_PATH));

    // Log dist folders
    console.log("Output dist folders:");
    console.log("NFT_DIST", process.env.NFT_DIST);
    console.log("COUNTER_DIST", process.env.COUNTER_DIST);
    console.log("AIRDROP_DIST", process.env.AIRDROP_DIST);

    // Log env vars
    console.log("Output urls:");
    console.log("VITE_BASE_URL", process.env.VITE_BASE_URL);
    console.log("NFT_BASE_URL", process.env.NFT_BASE_URL);
    console.log("COUNTER_BASE_URL", process.env.COUNTER_BASE_URL);
    console.log("AIRDROP_BASE_URL", process.env.AIRDROP_BASE_URL);
}

export async function runPnpmCommand(commands) {
    await execa('pnpm', commands, { stdout: 'inherit' });
}

export async function buildWebsite() {
    fs.rmSync(DIST_FOLDER, { recursive: true, force: true });
    await runPnpmCommand(["build:all", "--force", "--no-cache"]);
    //fs.cpSync(join(ROOT_PATH, "index.html"), join(DIST_FOLDER, "index.html"));
    fs.cpSync(join(ROOT_PATH, "public/"), join(DIST_FOLDER, "public/"), { recursive: true });
}
