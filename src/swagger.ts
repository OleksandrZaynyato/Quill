import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadYamlRecursive = (dir: string) => {
    const result: Record<string, any> = {};

    if (!fs.existsSync(dir)) return result;

    for (const file of fs.readdirSync(dir)) {
        const full = join(dir, file);

        if (fs.statSync(full).isDirectory()) {
            Object.assign(result, loadYamlRecursive(full));
        } else if (full.endsWith(".yaml") || full.endsWith(".yml")) {
            const yamlFile = fs.readFileSync(full, "utf8");
            const yamlData = YAML.parse(yamlFile);
            Object.assign(result, yamlData);
        }
    }

    return result;
};

export const swaggerDocs = (app: Express) => {
    const basePath = join(__dirname, "docs", "openapi.base.yaml");
    const baseFile = fs.readFileSync(basePath, "utf8");
    const openapi = YAML.parse(baseFile);

    const featuresDir = join(__dirname, "features");

    openapi.paths = openapi.paths || {};
    openapi.components = openapi.components || {};
    openapi.components.schemas = openapi.components.schemas || {};

    for (const featureName of fs.readdirSync(featuresDir)) {
        const docsPath = join(featuresDir, featureName, "docs");

        const pathsDir = join(docsPath, "paths");
        const schemasDir = join(docsPath, "schemas");

        if (fs.existsSync(pathsDir)) {
            const featurePaths = loadYamlRecursive(pathsDir);
            Object.assign(openapi.paths, featurePaths);
        }

        if (fs.existsSync(schemasDir)) {
            const featureSchemas = loadYamlRecursive(schemasDir);
            Object.assign(openapi.components.schemas, featureSchemas);
        }
    }

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));
};
